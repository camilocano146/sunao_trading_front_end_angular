import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortTarifService {

  constructor(private httpClient: HttpClient) { }


  getPortTarifs(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`port_tarif/?offset=${offset}&limit=${limit}`);
  }

  getPortTarifsNational(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`port_tarif/list_port_tarif_national/?offset=${offset}&limit=${limit}`);
  }

  importFilePortTarifsInternational(file: any):Observable<any>{

    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>('port_tarif/import_ports_tarif_international/', formData);
  }

  importFilePortTarifsNational(file: any):Observable<any>{

    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<any>('port_tarif/import_ports_tarif_national/', formData);
  }


}
