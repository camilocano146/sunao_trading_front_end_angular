import { Container } from "./Container";
import { Location } from "./Location";
import { Provider } from "./Provider";

export interface Package {
    id?: number;
    liquidation_quantity: number;
    time: number;
    cost: number;
    name: string;
    status?:string;
    image?: any;
}