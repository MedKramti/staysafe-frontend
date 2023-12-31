import { Location, LocationProp } from './location';
export interface ShelterProp {
  id: number | null;
  name: string;
  description: string;
  capacity: number;
  location: LocationProp;
  addedBy: string | null;
  addedDate: string | null;
  approved: boolean | null;
}
export class Shelter {
  private id: number;
  private name: string;
  private description: string;
  private capacity: number;
  private location: Location;
  private addedBy: string;
  private addedDate: string;
  private approved: boolean;

  constructor(shelter: ShelterProp) {
    Object.assign(this, shelter);
    this.location = new Location(shelter.location);
  }
  public setName(name: string) {
    this.name = name;
  }
  public setDescription(description: string) {
    this.description = description;
  }
  public setCapacity(capacity: number) {
    this.capacity = capacity;
  }

  public setLocation(location: Location) {
    this.location = location;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }
  public getCapacity(): number {
    return this.capacity;
  }
  public getLocation(): Location {
    return this.location;
  }
  public getAddedBy(): string {
    return this.addedBy;
  }
  public getAddedDate(): string {
    return this.addedDate;
  }

  public getApproved(): boolean {
    return this.approved;
  }
}
