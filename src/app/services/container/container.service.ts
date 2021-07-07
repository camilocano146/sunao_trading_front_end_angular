import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '../../models/Location';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private httpClient: HttpClient) { }

  getAll(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`continer_type_no_auth/?offset=${offset}&limit=${limit}`);
  }
}
