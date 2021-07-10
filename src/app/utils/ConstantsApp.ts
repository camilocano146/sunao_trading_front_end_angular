
export class ConstantsApp {
  public static readonly TYPE_LOCATION_COUNTRY = '1';
  public static readonly TYPE_LOCATION_CITY = '2';
  // static readonly minRechargeTransaction = 12000;
  static patternEmail = '^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\\.[a-zA-Z]{2,4}$';
  static maxFixedCoordinates = 10;
  static readonly defaultZoom = 10;
  static readonly minZoom = 1;
}
