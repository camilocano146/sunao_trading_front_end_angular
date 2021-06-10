import {Location} from '../models/Location';

export class ManageSessionStorage {

  static setCountrySelected(user: Location): void {
    sessionStorage.setItem('lastCountry', JSON.stringify(user));
  }

  static getCountrySelected(): Location {
    return JSON.parse(sessionStorage.getItem('lastCountry'));
  }

  static deleteCountrySelected(): void {
    sessionStorage.removeItem('lastCountry');
  }
}
