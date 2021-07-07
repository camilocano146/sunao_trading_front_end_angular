import { Location } from './Location';

export interface Port {
    id?: number;
    name: string;
    address: string;
    latitud: string;
    longitud: string;
    location?: Location;
    location_id?: number;
}
