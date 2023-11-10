import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Shelter, ShelterProp } from 'src/app/models/shelter';
import { ShelterService } from 'src/app/services/shelter-services/shelter.service';
import { ShelterUtils } from 'src/app/utils/shelter-utils';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  shelters: Array<Shelter> = [];
  sheltersFetched = false;
  map!: Leaflet.Map;
  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 5,
    center: new Leaflet.LatLng(43.530147, 16.488932),
  };

  @Output()
  clickedShelter: EventEmitter<Shelter> = new EventEmitter();

  constructor(private shelterService: ShelterService) {}

  ngOnInit(): void {
    this.getShelters();
  }

  onMapReady(event: Leaflet.Map) {
    this.map = event;
  }

  getShelters() {
    this.shelterService.get().subscribe({
      next: (data: ShelterProp[]) => {
        this.shelters = data.map(
          (shelter: ShelterProp) => new Shelter(shelter)
        );
        this.sheltersFetched = true;
        this.addMarkersToMap(this.shelters);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  /**
   * This method takes shelter array and adds marks to map
   * @param shelters
   */
  addMarkersToMap(shelters: Array<Shelter>) {
    shelters.forEach((shelter: Shelter) => {
      let mark = this.createMarker(
        shelter.getLocation().getLat(),
        shelter.getLocation().getLng(),
        shelter.getName()
      );
      mark.addTo(this.map);
    });
  }

  private createMarker(lat: number, lng: number, name: string): Leaflet.Marker {
    return new Leaflet.Marker(new Leaflet.LatLng(lat, lng), {
      icon: new Leaflet.Icon({
        iconSize: [50, 41],
        iconAnchor: [13, 41],
        iconUrl: '../../../assets/img/map-marker.svg',
      }),
      title: name,
    } as Leaflet.MarkerOptions).on('click', (event) => {
      let shelter = ShelterUtils.findShelter(
        this.shelters,
        event.latlng.lat,
        event.latlng.lng
      );
      this.clickedShelter.emit(shelter);
    });
  }
}

export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
      } as Leaflet.TileLayerOptions
    ),
  ] as Leaflet.Layer[];
};
