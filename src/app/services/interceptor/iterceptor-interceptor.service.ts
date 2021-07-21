import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, timeout} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Global} from '../../models/Global';
import {ManageLocalStorage} from '../../utils/ManageLocalStorage';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(public router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: any = ManageLocalStorage.getToken();
    if (token) {
      request = this.addToken(request, token);
    }

    if (request.url !== './assets/i18n/en.json' && request.url !== './assets/i18n/es.json') {
      // const endpoint = savedIp ? savedIp : Global.URL.endpoint;
      request = request.clone({
        url: Global.URL.endPoint + request.url
      });
    }

    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     headers: request.headers.set('Content-Type', 'application/json'),
    //   });
    // }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (!error.url.toUpperCase().endsWith('CHECK_TOKEN/')) {
          this.router.navigate(['']);
          localStorage.clear();
        }
        // return [];
        // return this.handle401Error(request, next);
      }
      if (error instanceof HttpErrorResponse && error.status === 403) {
        this.router.navigate(['']);
      } else {
        return throwError(error);
      }
    }),
      timeout(60000));
  }

  /**
   * Agrega token
   */
  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('authorization', `Bearer ${token}`)
    });
  }
}
