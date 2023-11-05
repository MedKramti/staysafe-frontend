import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shelter, ShelterProp } from '../models/shelter';
import { default as configuration } from './../../configuration.json';
@Injectable({
  providedIn: 'root',
})
export class ShelterService {
  private shelterServer: string = configuration['shelter-server'];
  constructor(private http: HttpClient) {}

  public get() {
    return this.http.get<Array<ShelterProp>>(
      this.shelterServer + '/api/shelters'
    );
  }

  public add(shelter: Shelter) {
    return this.http.post(this.shelterServer + '/api/shelters', shelter);
  }
}
