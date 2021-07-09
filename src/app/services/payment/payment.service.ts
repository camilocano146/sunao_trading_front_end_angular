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
        return this.http.get<any>('payments/pretoken', {observe: 'response'});
    }

    tokenCard(card: any): Observable<any> {
        return this.http.post<any>('payments/card/token', Utilities.encrypt(card), {observe: 'response'});
    }

    valueTotal(value: any): Observable<any> {
        return this.http.post<any>('payments/value_total', Utilities.encrypt(value), {observe: 'response'});
    }

    transactionCard(transaction: any): Observable<any> {
        return this.http.post<any>('payments/card/transaction', Utilities.encrypt(transaction), {observe: 'response'});
    }

    transactionNequi(transaction: any): Observable<any> {
        return this.http.post<any>('payments/nequi/transaction', Utilities.encrypt(transaction), {observe: 'response'});
    }

    transactionBancolombia(transaction: any): Observable<any> {
        return this.http.post<any>('payments/bancolombia/transaction', Utilities.encrypt(transaction), {observe: 'response'});
    }

    transactionPse(transaction: any): Observable<any> {
        return this.http.post<any>('payments/pse/transaction', Utilities.encrypt(transaction), {observe: 'response'});
    }

    getInstitutions(): Observable<any> {
        return this.http.get<any>('payments/pse/institutions', {observe: 'response'});
    }
}
