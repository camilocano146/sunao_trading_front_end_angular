import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Provider} from '../../models/Provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Intencacionales
   */ 
  registerIntenational(body: Provider): Observable<any> {
    return this.httpClient.post('provider/', body);
  }

  editIntenational(id: number, body: Provider): Observable<any> {
    return this.httpClient.put(`provider/${id}/edit/`, body);
  }

  getListInternational(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`provider/?offset=${offset}&limit=${limit}`);
  }

  /**
   * Nationals 
   */ 
  registerNational(body: Provider): Observable<any> {
    return this.httpClient.post('provider/create_national/', body);
  }

  editNational(id: number, body: Provider): Observable<any> {
    return this.httpClient.put(`provider/${id}/edit_national/`, body);
  }

  getListNational(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`provider/list_nationals/?offset=${offset}&limit=${limit}`);
  }

  /**
   * Eliminar
   */

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`provider/${id}/delete/`);
  }
}
