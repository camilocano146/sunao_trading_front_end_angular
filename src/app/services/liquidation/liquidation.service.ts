import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IncotermType, Liquidation} from '../../models/Liquidation';

@Injectable({
  providedIn: 'root'
})
export class LiquidationService {

  constructor(
    public httpClient: HttpClient
  ) { }

  getAll(offset: number, limit: number, regex: string): Observable<any> {
    return this.httpClient.get(`liquidation/?offset=${offset}&limit=${limit}${regex}`);
  }

  liquidate(liquidation: Liquidation): Observable<any> {
    return this.httpClient.post('liquidation/', liquidation);
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(`liquidation/${id}/get_liquidation_info/`);
  }

  getManyById(ids: { list_liquidations: number[] }): Observable<any> {
    return this.httpClient.post(`liquidation/comparator_liquidations/`, ids);
  }

  validateInfoPortTarifNational(body: {port_origin_id: number, port_destination_id: number, city_destination_id: number, container_type_id: number, incoterm: IncotermType}): Observable<any> {
    return this.httpClient.post(`liquidation_no_auth/validate_info_port_tarif_national/`, body);
  }

  downloadReport(body: any): Observable<any> {
    return this.httpClient.post(`liquidation/export_data/`, body, { responseType: 'blob' });
  }

  validatePortTarifInternational(body){
    return this.httpClient.post(`liquidation_no_auth/validate_info_port_tarif_international/`, body);
  }
}
