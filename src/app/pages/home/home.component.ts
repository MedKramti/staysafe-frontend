import { ChangeDetectorRef, Component } from '@angular/core';
import { Shelter } from 'src/app/models/shelter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedShelter: Shelter | null = null;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  onShelterClick(shelter: Shelter) {
    this.selectedShelter = shelter;
    this.changeDetectorRef.detectChanges();
  }
}
