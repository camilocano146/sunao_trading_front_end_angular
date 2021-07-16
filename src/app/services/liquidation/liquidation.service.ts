import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Liquidation} from '../../models/Liquidation';

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
}
