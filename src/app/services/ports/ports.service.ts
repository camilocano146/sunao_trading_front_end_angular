import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Port } from 'src/app/models/Port';

@Injectable({
  providedIn: 'root'
})
export class PortsService {

  constructor(private httpClient: HttpClient) { }

  getListPorts(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`port/?offset=${offset}&limit=${limit}`);
  }

  getPublicListPorts(idCity: number, offset: number, limit: number, regex?: string): Observable<any> {
    const url = regex ? `location_no_auth/${idCity}/list_ports/?offset=${offset}&limit=${limit}&regex=${regex}` :
      `location_no_auth/${idCity}/list_ports/?offset=${offset}&limit=${limit}`;
    return this.httpClient.get(url);
  }

  register(port: Port): Observable<any> {
    return this.httpClient.post('port/', port);
  }

  edit(id: number, body: Port): Observable<any> {
    return this.httpClient.put(`port/${id}/edit/`, body);
  }
}
