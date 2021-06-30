import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getListProducts(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`product/?offset=${offset}&limit=${limit}`);
  } 

  register(location: Product): Observable<any> {
    return this.httpClient.post('product/', location);
  }

  edit(id: number, body: Product): Observable<any> {
    return this.httpClient.put(`product/${id}/edit/`, body);
  }

  getIvas(id: number,offset: number, limit: number): Observable<any>{
    return this.httpClient.get(`product/${id}/get_ivas/?offset=${offset}&limit=${limit}`);
  }

  getGravaments(id: number,offset: number, limit: number): Observable<any>{
    return this.httpClient.get(`product/${id}/get_gravaments/?offset=${offset}&limit=${limit}`);
  }

  getSupportDocument(id: number,offset: number, limit: number): Observable<any>{
    return this.httpClient.get(`product/${id}/get_support_document/?offset=${offset}&limit=${limit}`);
  }

  getInternationalAgreement(id: number,offset: number, limit: number): Observable<any>{
    return this.httpClient.get(`product/${id}/get_international_agreement/?offset=${offset}&limit=${limit}`);
  }

  getTradeRegimen(id: number,offset: number, limit: number): Observable<any>{
    return this.httpClient.get(`product/${id}/get_trade_regimen/?offset=${offset}&limit=${limit}`);
  }
}
