import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) { }

  getListCurrencies(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`currency/?offset=${offset}&limit=${limit}`);
  }
}
