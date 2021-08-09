import {Package} from "./Package";

export interface UserActivePackage {
  user?: number;
  id?: number;
  created_at: string;
  finish_at: string;
  liquidation_balance: number;
  liquidation_quantity?:number;
  package: Package;
}
