import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Liquidation} from "../../models/Liquidation";

@Injectable({
  providedIn: 'root'
})
export class LiquidationService {

  constructor(
    public httpClient: HttpClient
  ) { }

  getAll(offset: number, limit: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('page', offset.toString()).set('limit', limit.toString());
    return this.httpClient.get('locations', {headers});
  }

  liquidate(liquidation: Liquidation): Observable<any> {
    return this.httpClient.post('liquidation', liquidation);
  }
}
