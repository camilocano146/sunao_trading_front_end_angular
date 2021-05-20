import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ChangePassword, User, UserLogin} from '../../models/User';
import {Observable} from 'rxjs';
import {Credential} from '../../models/Credential';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(body: Credential): Observable<any> {
    return this.httpClient.post('user/', body);
  }

  login(body: Credential): Observable<any> {
    return this.httpClient.post('login/', body);
  }

  recover(email: any): Observable<any> {
    return this.httpClient.post('user/restore_password/', email);
  }

  changePassword(body: ChangePassword): Observable<any> {
    return this.httpClient.post('user/new_password/', body);
  }

  saveLocalStorageToken(token): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  activateAccount(body: { code: any }): Observable<any> {
    return this.httpClient.post('user/verify_email/', body);
  }

  requestCode(body: { email: any }): Observable<any> {
    return this.httpClient.post('users/restore_password/', body);
  }

  saveLocalStorageUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getAll(offset: number, limit: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('page', offset.toString()).set('limit', limit.toString());
    return this.httpClient.get('users/list', {headers});
  }

  registerToOrganization(body: User): Observable<any> {
    return this.httpClient.post('users/create/', body);
  }

  verifyValidToken(): Observable<any> {
    return this.httpClient.get('check_token/');
  }

  updateUser(idUser: string, body: any): Observable<any> {
    return this.httpClient.patch(`users/${idUser}`, body);
  }

  getUser(): Observable<any> {
    return this.httpClient.get(`users/my`);
  }
}
