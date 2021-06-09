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
    return this.httpClient.post('locations/', location);
  }

  getAll(offset: number, limit: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('page', offset.toString()).set('limit', limit.toString());
    return this.httpClient.get('locations', {headers});
  }
}
