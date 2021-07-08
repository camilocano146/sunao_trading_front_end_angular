
export interface Location {
  id?: number;
  name: string;
  father_location_id?: number;
  type: string;
  father_location?: Location;
  latitude?: number;
  longitude?: number;
}
