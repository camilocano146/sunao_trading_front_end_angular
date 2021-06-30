import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '../../models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  register(location: Location): Observable<any> {
    return this.httpClient.post('location/', location);
  }

  edit(id: number, body: Location): Observable<any> {
    return this.httpClient.put(`location/${id}/edit/`, body);
  }
  registerMunicipality(location: Location): Observable<any> {
    return this.httpClient.post('location/create_municipality/', location);
  }

  editMunicipality(id: number, body: Location): Observable<any> {
    return this.httpClient.put(`location/${id}/edit_municipality/`, body);
  }
  

  getAllCountries(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`location/list_country/?offset=${offset}&limit=${limit}`);
  }

  getAllCitiesOfCountry(idCountry: number, offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`location/${idCountry}/list_municipality_country/?offset=${offset}&limit=${limit}`);
  }

  getAllCities(offset: number, limit: number, regex?:string): Observable<any>{
    let url = regex? `location/list_all_municipality/?offset=${offset}&limit=${limit}&regex=${regex}`:
    `location/list_all_municipality/?offset=${offset}&limit=${limit}`
    
    return this.httpClient.get(url);
  }
}
