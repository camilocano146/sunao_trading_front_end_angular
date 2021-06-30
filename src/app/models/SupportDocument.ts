import { Product } from "./Product"

export interface SupportDocument {
    id?: number;
    document: string;
    entity: string;
    procedurer: string;
    requirement: string;
    electronic:string;
    product: Product;
    is_last:boolean;
    date:Date;

    product_id: number;
}
  