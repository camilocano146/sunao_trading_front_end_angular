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

  register(port: Port): Observable<any> {
    return this.httpClient.post('port/', port);
  }

  edit(id: number, body: Port): Observable<any> {
    return this.httpClient.put(`port/${id}/edit/`, body);
  }


}
