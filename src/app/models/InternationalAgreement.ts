import { Product } from "./Product"

export interface InternationalAgreement {
    id?: number;
    location?: any;
    title: string;
    gravamen:number;
    product: Product;
    is_last: boolean;
    date:Date;
}