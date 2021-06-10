import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Provider} from '../../models/Provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private httpClient: HttpClient) { }

  register(body: Provider): Observable<any> {
    return this.httpClient.post('provider/', body);
  }

  edit(id: number, body: Provider): Observable<any> {
    return this.httpClient.put(`provider/${id}/edit/`, body);
  }

  getAll(offset: number, limit: number): Observable<any> {
    return this.httpClient.get(`provider/?offset=${offset}&limit=${limit}`);
  }
}
