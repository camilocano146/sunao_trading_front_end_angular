import { Location } from './Location';

export interface Port {
    id?: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    location?: Location;
    location_id?: number;
}
