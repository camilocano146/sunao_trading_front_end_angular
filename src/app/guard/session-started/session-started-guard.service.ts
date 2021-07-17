import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ManageLocalStorage} from '../../utils/ManageLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class SessionStartedGuard implements CanLoad {

  constructor(
    private router: Router
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (ManageLocalStorage.getUser() && ManageLocalStorage.getToken()) {
      this.router.navigate(['lobby/operations-list']);
      return true;
    }
    return true;
  }

  // canLoad(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return !!(ManageLocalStorage.getUser() && ManageLocalStorage.getToken());
  // }
}
