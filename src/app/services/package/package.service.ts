import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Package } from 'src/app/models/Package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private httpClient: HttpClient) { }

  getListPackages(offset: number, limit: number, regex = ''): Observable<any> {
    return this.httpClient.get(`package/?offset=${offset}&limit=${limit}&regex=${regex}`);
  }
  getListActivesPackages(offset: number, limit: number, regex = ''): Observable<any> {
    return this.httpClient.get(`package/list_actives_packages/?offset=${offset}&limit=${limit}&regex=${regex}`);
  }

  register(body: FormData): Observable<any> {
    return this.httpClient.post('package/', body);
  }

  edit(id: number, body: FormData): Observable<any> {
    return this.httpClient.post(`package/${id}/edit/`, body);
  }

  getLastPackage(): Observable<any> {
    return this.httpClient.get(`users/get_info_package/`);
  }

  activateDeactivatePackage(package_id: number): Observable<any> {
    return this.httpClient.post(`package/${package_id}/activate_deactivate_package/`,{});
  }
}
