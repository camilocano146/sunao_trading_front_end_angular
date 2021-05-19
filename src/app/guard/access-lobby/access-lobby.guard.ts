import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {ManageLocalStorage} from '../../utils/ManageLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class AccessLobbyGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !!(ManageLocalStorage.getToken());
  }
}
