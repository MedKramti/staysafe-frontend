import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Shelter, ShelterProp } from '../../models/shelter';
@Injectable({
  providedIn: 'root',
})
export class ShelterService {
  private shelterServer: string = environment.SHELTER_SERVER;
  constructor(private http: HttpClient) {}

  public get() {
    return this.http.get<Array<ShelterProp>>(
      this.shelterServer + '/api/shelters'
    );
  }

  public add(shelter: Shelter) {
    return this.http.post(this.shelterServer + '/api/shelters', shelter);
  }

  public getPending() {
    return this.http.get<Array<ShelterProp>>(
      this.shelterServer + '/api/shelters/pending-approval'
    );
  }

  public approveShelter(shelter: Shelter) {
    return this.http.put(this.shelterServer + '/api/shelters/approve', shelter);
  }
}
