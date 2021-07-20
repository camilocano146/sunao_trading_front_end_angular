import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Package } from 'src/app/models/Package';

@Injectable({
  providedIn: 'root'
})
export class PortChargeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getListCharges(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`port_charge/list_all/?offset=${offset}&limit=${limit}`);
  }

  downloadReport(body: any): Observable<any> {
    return this.httpClient.post(`port_charge/export_data/`, body, { responseType: 'blob' });
  }
}
