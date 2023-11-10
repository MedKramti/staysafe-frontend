import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Shelter, ShelterProp } from 'src/app/models/shelter';
import { NominatimService } from 'src/app/services/shelter-services/nominatim-service.service';
import { ShelterService } from 'src/app/services/shelter-services/shelter.service';

@Component({
  selector: 'app-add-shelter',
  templateUrl: './add-shelter.component.html',
  styleUrls: ['./add-shelter.component.css'],
})
export class AddShelterComponent implements OnInit {
  fetchingLngLat: boolean | null;
  displayLoadingAfterSubmit: boolean;
  errorMessage: string;
  successMessage: string;
  stage: number;
  shelterBasicInfoForm = this.fb.group({
    name: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-z ]{3,64}'),
      ]),
    ],
    description: [
      '',
      Validators.compose([Validators.maxLength(256), Validators.required]),
    ],
    capacity: [
      0,
      Validators.compose([Validators.max(9999), Validators.required]),
    ],
  });
  shelterAddressForm = this.fb.group({
    street: [
      '',
      Validators.compose([Validators.maxLength(128), Validators.required]),
    ],
    city: [
      '',
      Validators.compose([Validators.maxLength(64), Validators.required]),
    ],
    state: [
      '',
      Validators.compose([Validators.maxLength(64), Validators.required]),
    ],
    zip: [
      '',
      Validators.compose([Validators.maxLength(8), Validators.required]),
    ],
    country: [
      '',
      Validators.compose([Validators.maxLength(56), Validators.required]),
    ],
  });

  shelterLatLngForm = this.fb.group({
    lat: [
      '',
      Validators.compose([Validators.maxLength(32), Validators.required]),
    ],
    lng: [
      '',
      Validators.compose([Validators.maxLength(32), Validators.required]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private shelterService: ShelterService,
    private nominatimService: NominatimService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchingLngLat = null;
    this.displayLoadingAfterSubmit = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.stage = 1;
  }

  /**
   * This method is used to add a shelter to the database
   * @returns void
   */
  add(): void {
    this.displayLoadingAfterSubmit = true;
    this.errorMessage = '';
    if (!this.shelterBasicInfoForm.valid) {
      this.errorMessage =
        'Please fill the form correctly, all fields are required!';
      return;
    }
    let shelterProp: ShelterProp = {
      id: null,
      name: this.getControl('name', this.shelterBasicInfoForm).value,
      description: this.getControl('description', this.shelterBasicInfoForm)
        .value,
      capacity: this.getControl('capacity', this.shelterBasicInfoForm).value,
      location: {
        street: this.getControl('street', this.shelterAddressForm).value,
        city: this.getControl('city', this.shelterAddressForm).value,
        state: this.getControl('state', this.shelterAddressForm).value,
        postcode: this.getControl('zip', this.shelterAddressForm).value,
        country: this.getControl('country', this.shelterAddressForm).value,

        lng: this.getControl('lat', this.shelterLatLngForm).value,
        lat: this.getControl('lng', this.shelterLatLngForm).value,
      },
      addedBy: null,
      addedDate: null,
      approved: null,
    };
    let shelter: Shelter = new Shelter(shelterProp);

    this.shelterService.add(shelter).subscribe({
      next: (data) => {
        this.successMessage = 'Shelter is added, an admin will review it soon!';
        this.shelterBasicInfoForm.reset();
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/unauthorized');
        }
        this.errorMessage =
          'Unable to add shelter please contact the administrator';
        this.displayLoadingAfterSubmit = false;
      },
    });
  }
  getControl(name: string, form: FormGroup) {
    return form.get(name) as FormControl;
  }
  /**
   * This method uses nominatim to determin the latitude and longitude from an address
   */
  getLatLng() {
    this.fetchingLngLat = null;
    // call nominatim service to get Lat & Lng from address
    this.nominatimService
      .getLatLng(
        this.getControl('street', this.shelterAddressForm).value,
        this.getControl('city', this.shelterAddressForm).value,
        this.getControl('state', this.shelterAddressForm).value,
        this.getControl('country', this.shelterAddressForm).value
      )
      .subscribe({
        next: (data: any) => {
          if (data[0]?.lat && data[0]?.lon) {
            this.getControl('lat', this.shelterLatLngForm).setValue(
              data[0].lat
            );
            this.getControl('lng', this.shelterLatLngForm).setValue(
              data[0].lon
            );
            this.fetchingLngLat = true;
          } else {
            this.fetchingLngLat = false;
          }
        },
        error: (error) => {
          this.fetchingLngLat = false;
        },
      });
  }
  next() {
    this.errorMessage = '';
    if (this.stage >= 1 && this.stage <= 3) {
      // checking if form is valid & filled
      if (this.stage == 1 && !this.shelterBasicInfoForm.valid) {
        this.errorMessage =
          'Please fill the form correctly, all fields are required';
        return;
      }
      if (this.stage == 2 && !this.shelterAddressForm.valid) {
        this.errorMessage =
          'Please fill the form correctly, all fields are required';
        return;
      }
      this.stage++;
    }
    if (this.stage == 3) {
      this.getLatLng();
    }
    if (this.stage == 4) {
      this.add();
    }
  }

  back() {
    if (this.stage > 1) {
      this.stage--;
    }
  }

  reset() {
    this.shelterLatLngForm.reset();
    this.shelterAddressForm.reset();
    this.shelterBasicInfoForm.reset();
    this.ngOnInit();
  }
}
