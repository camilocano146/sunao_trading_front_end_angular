import {Location} from './Location';
import {Port} from './Port';
import {Product} from './Product';
import {Container} from './Container';
import {Currency} from "./Currency";
import {Incoterm} from "./Incoterm";

export interface ImportCost {
  cityOrigin: Location;
  cityDestination: Location;
  portOrigin: Port;
  portDestination: Port;
  product: Product;
  currency: Currency;
  container: Container;
  fobValue: number;
  incoterm: Incoterm;
  cityIcoterm?: Location;
}
