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

  getAll(offset: number, limit: number, regex: string): Observable<any> {
    return this.httpClient.get(`users/?offset=${offset}&limit=${limit}&regex=${regex}`);
  }

  registerToOrganization(body: User): Observable<any> {
    return this.httpClient.post('users/create/', body);
  }

  verifyValidToken(): Observable<any> {
    return this.httpClient.get('check_token/');
  }

  updateUserEmail(body: any): Observable<any> {
    return this.httpClient.patch(`users/change_email/`, body);
  }

  updateUser(body: any): Observable<any> {
    return this.httpClient.patch(`users/edit/`, body);
  }

  updateUserPassword(body: any): Observable<any> {
    return this.httpClient.post(`users/change_password/`, body);
  }

  getUser(): Observable<any> {
    return this.httpClient.get(`users/get_info_user/`);
  }

  getUserAdmin(): Observable<any> {
    return this.httpClient.get(`users/user_is_admin/`);
  }

  activateDeactivateUser(user: User): Observable<any> {
    return this.httpClient.post(`users/${user.id}/acivate_desactivate_user/`, user);
  }
  
  userHasActivePackage():Observable<any>{
    return this.httpClient.get(`users/user_has_active_package/`);
  }
  getRoles(idUser: number) {
    return this.httpClient.get<any>("users/" + idUser + "/list_roles/", { observe: 'response' });
  }

  getAllRoles(){
    return this.httpClient.get<any>(`rol/?offset=${0}&limit=${10}`, { observe: 'response' });
  }

  setRoles(vect_id:number [], userId:number) : Observable<any>{
    let data ={
      list:vect_id
    }
    return this.httpClient.post(`users/${userId}/set_roles/`, data);

  }
}
