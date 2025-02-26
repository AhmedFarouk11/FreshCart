import { OrderInterface } from './../../../Shared/Interfaces/OrderInterface/order-interface';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { env } from '../../Enviroment/Enviroment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient)
  private userHeader: any = { token: localStorage.getItem('Usertoken') }
  private UserId = localStorage.getItem('cartowner')
  constructor() { }
  Checkout(cartId: string, addressFormvalue: object): Observable<any> {
    return this.http.post(`${env.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${env.localurl}`, { shippingAddress: addressFormvalue },
      {
        headers: this.userHeader
      })

  }
  
  UserOrders(): Observable<any> {

    return this.http.get(`${env.baseUrl}/api/v1/orders/user/${this.UserId}`);
  }

  getallOrders(): Observable<any> {
    return this.http.get(`${env.baseUrl}/api/v1/orders/`)
  }
}
