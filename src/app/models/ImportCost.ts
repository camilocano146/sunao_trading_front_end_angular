import {Location} from './Location';
import {Port} from './Port';
import {Product} from './Product';
import {Container} from './Container';

export interface ImportCost {
  cityOrigin: Location;
  cityDestination: Location;
  portOrigin: Port;
  portDestination: Port;
  product: Product;
  currency: string;
  container: Container;
  fobValue: number;
  imcoterm: string;
}
