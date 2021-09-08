import { Container } from "./Container";
import { Location } from "./Location";
import { Provider } from "./Provider";

export interface Port_tarif {
    id?: number;
    location_origin: Location;
    location_destination: Location;
    provider: Provider;
    container_type: Container;
    transist_days: number;
    validity: Date;
    cost:number;
    return_cost?:boolean; 
    free_days?: number;
    user?: any;
  }