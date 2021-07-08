
// export enum Badge {
//   EUR, USD, GBR, COP
// }
export type BadgeType = 'EUR' | 'USD' | 'GBP' | 'COP';

// export enum Incoterm {
//   CFR, CIF, DDP
// }
export type IncotermType = 'CFR' | 'CIF' | 'DDP';

export interface Liquidation {
  port_origin_id: number;
  port_destination_id: number;
  product_id: number;
  badge: BadgeType;
  container_type_id: number;
  incoterm: IncotermType;
  fob_cost: number;
  city_destination_id: number;
}
