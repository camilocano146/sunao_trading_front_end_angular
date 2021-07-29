import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utilities} from '../../utils/Utilities';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(private http: HttpClient) { }

    getPretoken(): Observable<any> {
        return this.http.get<any>('wompi/get_pretoken/', {observe: 'response'});
    }

    tokenCard(card: any): Observable<any> {
        return this.http.post<any>('wompi/get_card_token/', Utilities.encrypt(card), {observe: 'response'});
    }

    valueTotal(value: any): Observable<any> {
        return this.http.post<any>('payments/value_total', Utilities.encrypt(value), {observe: 'response'});
    }

    transactionCard(transaction: any): Observable<any> {
        return this.http.post<any>('wompi/payment_card/', Utilities.encrypt(transaction), {observe: 'response'});
    }

    transactionNequi(transaction: any): Observable<any> {
        // return this.http.post<any>('wompi/payment_nequi/', Utilities.encrypt(transaction), {observe: 'response'});
      return this.http.post<any>('wompi/payment_nequi/', Utilities.encrypt(transaction), {observe: 'response'});
    }

    transactionBancolombia(transaction: any): Observable<any> {
        // return this.http.post<any>('wompi/payment_bancolombia/', Utilities.encrypt(transaction), {observe: 'response'});
      return this.http.post<any>('wompi/payment_bancolombia/', Utilities.encrypt(transaction), {observe: 'response'});
    }

    transactionPse(transaction: any): Observable<any> {
        return this.http.post<any>('wompi/payment_pse/', Utilities.encrypt(transaction), {observe: 'response'});
      // return this.http.post<any>('wompi/payment_pse/', Utilities.encrypt(transaction), {observe: 'response'});
    }

    getInstitutions(): Observable<any> {
        return this.http.get<any>('wompi/get_pse_istructions/', {observe: 'response'});
    }

    paymentFreeCoupon(transaction:any): Observable<any> {
        return this.http.post<any>('wompi/payment_free/', Utilities.encrypt(transaction), {observe: 'response'});

    }
}
