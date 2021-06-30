import { Product } from "./Product"

export interface TradeRegimen {
    id?: number;
    concept: string;
    product: Product;
    is_last: boolean;
    date:Date;
}
