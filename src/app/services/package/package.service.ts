import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Package } from 'src/app/models/Package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private httpClient: HttpClient) { }

  getListPackages(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`package/?offset=${offset}&limit=${limit}`);
  } 

  register(body: Package): Observable<any> {
    return this.httpClient.post('package/', body);
  }

  edit(id: number, body: Package): Observable<any> {
    return this.httpClient.put(`package/${id}/edit/`, body);
  }
}
