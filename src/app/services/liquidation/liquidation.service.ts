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

  export_liquidation_pdf(id:number): Observable<any> {
    return this.httpClient.get(`liquidation/${id}/export_liquidation_pdf/`,  { responseType: 'blob' });
  }
  export_liquidation_excel(id:number): Observable<any> {
    return this.httpClient.get(`liquidation/${id}/export_liquidation_excel/`,  { responseType: 'blob' });
  }

  send_liquidation_pdf(id:number, email:string): Observable<any> {
    let body = {
      email:email
    }
    return this.httpClient.post(`liquidation/${id}/send_liquidation_pdf/`, body, { responseType: 'blob' });
  }
  send_liquidation_excel(id:number, email:string): Observable<any> {
    let body = {
      email:email
    }
    return this.httpClient.post(`liquidation/${id}/send_liquidation_excel/`, body, { responseType: 'blob' });
  }

  getInternationalAgreementByLocation(id: number, idLocation: number, offset: number, limit: number): Observable<any>{
    return this.httpClient.get(`liquidation/${id}/get_international_agreement/?offset=${offset}&limit=${limit}&location=${idLocation}`);
  }

  getTradeRegimen(id: number, offset: number, limit: number): Observable<any>{
    return this.httpClient.get(`liquidation/${id}/get_trade_regimen/?offset=${offset}&limit=${limit}`);
  }

  getSupportDocument(id: number, offset: number, limit: number): Observable<any>{
    return this.httpClient.get(`liquidation/${id}/get_support_document/?offset=${offset}&limit=${limit}`);
  }
  
  getGravaments(id: number, offset: number, limit: number): Observable<any>{
    return this.httpClient.get(`liquidation/${id}/get_gravaments/?offset=${offset}&limit=${limit}`);
  }

}
