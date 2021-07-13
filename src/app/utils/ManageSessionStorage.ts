import {Location} from '../models/Location';
import {Liquidation} from "../models/Liquidation";

export class ManageSessionStorage {

  static setCountrySelected(user: Location): void {
    sessionStorage.setItem('lastCountry', JSON.stringify(user));
  }

  static getCountrySelected(): Location {
    return JSON.parse(sessionStorage.getItem('lastCountry'));
  }

  static setLiquidationReuse(user: Liquidation): void {
    sessionStorage.setItem('liquidationReuse', JSON.stringify(user));
  }

  static getLiquidationReuse(): Liquidation {
    return JSON.parse(sessionStorage.getItem('liquidationReuse'));
  }

  static deleteCountrySelected(): void {
    sessionStorage.removeItem('lastCountry');
  }
}
