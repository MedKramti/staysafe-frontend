import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NominatimService {
  constructor(private http: HttpClient) {}

  getLatLng(street: string, city: string, state: string, country: string) {
    return this.http.get(
      `https://nominatim.openstreetmap.org/search?country=${country}&state=${state}&city=${city}&street=${street}&format=json`
    );
  }
}
