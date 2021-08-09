import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    public httpClient: HttpClient
  ) { }

  getAll(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`transaction_wompi/?offset=${offset}&limit=${limit}`);
  }

  downloadReport(body: any): Observable<any> {
    return this.httpClient.post(`transaction_wompi/export_data/`, body, { responseType: 'blob' });
  }
}
