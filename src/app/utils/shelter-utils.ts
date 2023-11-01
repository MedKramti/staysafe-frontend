import { Shelter } from '../models/shelter';

export class ShelterUtils {
  public static findShelter(
    shelters: Array<Shelter>,
    lat: number,
    lng: number
  ): Shelter | undefined {
    return shelters.find(
      (element) =>
        element.getLocation().getLat() === lat &&
        element.getLocation().getLng() === lng
    );
  }
}
