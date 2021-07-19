import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {UserService} from "../../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class GuardRoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  /**
   * Para validar acceso a componente
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.getUserAdmin().pipe(
      map(res => {
        return res.result;
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }
}
