import { Product } from "./Product"

export interface Gravamen {
    id?: number;
    tarif: number;
    product: Product;
    is_last: boolean;
    date:Date;
}