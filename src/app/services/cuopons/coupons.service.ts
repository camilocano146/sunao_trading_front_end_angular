import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/models/Coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private httpClient: HttpClient) { }

  getListCoupon(offset: number, limit: number, regex: string): Observable<any> {
    return this.httpClient.get(`coupon/?offset=${offset}&limit=${limit}&regex=${regex}`);
  }

  register(coupon: Coupon): Observable<any> {
    return this.httpClient.post('coupon/', coupon);
  }

  edit(id: number, body: Coupon): Observable<any> {
    return this.httpClient.put(`coupon/${id}/edit/`, body);
  }

  getCouponByCode(code:string){
    return this.httpClient.get(`coupon/get_coupon_by_code/?coupon_code=${code}`);
  }
}
