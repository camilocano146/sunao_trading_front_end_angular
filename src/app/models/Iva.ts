import { Product } from "./Product"

export interface Iva {
    id?: number;
    tarif: number;
    product: Product;
    is_last: boolean;
    date:Date;
}