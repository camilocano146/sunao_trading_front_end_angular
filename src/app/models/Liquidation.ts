
// export enum Badge {
//   EUR, USD, GBR, COP
// }
import {Product} from './Product';
import {Container} from './Container';
import {Port} from './Port';
import {Location} from './Location';

export type BadgeType = 'EUR' | 'USD' | 'GBP' | 'COP';

// export enum Incoterm {
//   CFR, CIF, DDP
// }
export type IncotermType = 'CFR' | 'CIF' | 'DDP';

export interface Liquidation {
  id?: number;
  status?: string;
  create_at?: string;
  data?: any;
  port_origin_id: number;
  port_origin?: Port;
  port_destination_id: number;
  port_destination?: Port;
  product_id: number;
  product?: Product;
  currency?: BadgeType | any;
  currency_id?: number;
  container_type_id: number;
  incoterm: IncotermType;
  fob_cost: number;
  city_destination_id: number;
  container_type?: Container;
  city_destination?: Location;
}
