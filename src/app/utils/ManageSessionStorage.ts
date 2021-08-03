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

  static deleteLiquidationReuse(user: Liquidation): void {
    sessionStorage.removeItem('liquidationReuse');
  }

  static deleteCountrySelected(): void {
    sessionStorage.removeItem('lastCountry');
  }

  static setLastSavedLiquidationId(liquidationId: number): void {
    sessionStorage.setItem('lastLiquidationSaved', liquidationId + '');
  }

  static getAndRemoveLastSavedLiquidationId(): number {
    const value = sessionStorage.getItem('lastLiquidationSaved');
    if (value) {
      sessionStorage.removeItem('lastLiquidationSaved');
      return +value;
    }
    return undefined;
  }

  static setListCompareLiquidations(numbers: number[]): void {
    sessionStorage.setItem('compareLiquidations', numbers + '');
  }

  static getListCompareLiquidations(): number[] {
    const result = sessionStorage.getItem('compareLiquidations');
    if (result) {
      return result.split(',').map(v => +v);
    }
  }
}
