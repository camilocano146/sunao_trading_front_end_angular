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

  getAllCountries(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`location/list_country/?offset=${offset}&limit=${limit}`);
  }

  getAllCitiesOfCountry(idCountry: number, offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`location/${idCountry}/list_municipality_country/?offset=${offset}&limit=${limit}`);
  }
}
