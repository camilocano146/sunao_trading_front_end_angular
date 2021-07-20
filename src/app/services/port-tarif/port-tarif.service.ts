import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortTarifService {

  constructor(private httpClient: HttpClient) { }

  getPortTarifsInternational(offset: number, limit: number, regex: string): Observable<any> {
    return this.httpClient.get(`port_tarif_international/?offset=${offset}&limit=${limit}&regex=${regex}`);
  }

  getPortTarifsNational(offset: number, limit: number, regex: string): Observable<any> {
    return this.httpClient.get(`port_tarif_national/?offset=${offset}&limit=${limit}&regex=${regex}`);
  }

  importFilePortTarifsInternational(file: any): Observable<any>{

    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>('port_tarif/import_ports_tarif_international/', formData);
  }

  importFilePortTarifsNational(file: any): Observable<any>{

    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<any>('port_tarif/import_ports_tarif_national/', formData);
  }

  downloadNationalReport(body: any): Observable<any> {
    return this.httpClient.post(`port_tarif_national/export_data/`, body, { responseType: 'blob' });
  }

  downloadInternationalReport(body: any): Observable<any> {
    return this.httpClient.post(`port_tarif_international/export_data/`, body, { responseType: 'blob' });
  }
}
