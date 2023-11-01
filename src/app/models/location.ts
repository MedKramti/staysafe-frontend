export interface LocationProp {
  lng: number;
  lat: number;
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}
export class Location {
  private lng: number;
  private lat: number;
  private street: string;
  private city: string;
  private state: string;
  private postcode: string;
  private country: string;

  constructor(location: LocationProp) {
    Object.assign(this, location);
  }

  public getStreet(): string {
    return this.street;
  }
  public getCity(): string {
    return this.city;
  }
  public getState(): string {
    return this.state;
  }
  public getPostCode(): string {
    return this.postcode;
  }

  public getLng(): number {
    return this.lng;
  }
  public getLat(): number {
    return this.lat;
  }
  public getCountry(): string {
    return this.country;
  }
  public setLng(lng: number) {
    this.lng = lng;
  }
  public setLat(lat: number) {
    this.lat = lat;
  }
  public setCountry(country: string) {
    this.country = country;
  }

  public setStreet(street: string) {
    this.street = street;
  }

  public setCity(city: string) {
    this.city = city;
  }

  public setState(state: string) {
    this.state = state;
  }

  public setPostCode(postcode: string) {
    this.postcode = postcode;
  }
}
