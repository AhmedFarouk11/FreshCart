import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsService } from './../Products/products.service';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { env } from '../../Enviroment/Enviroment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private productsService = inject(ProductsService);
  private http: HttpClient = inject(HttpClient);
  private userHeader: any = { token: null };
  private isBrowser: boolean;
  cartnumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Only access localStorage if running in a browser
    if (this.isBrowser) {
      this.userHeader.token = localStorage.getItem('Usertoken');
    }
  }

  addToCart(PId: string | null): Observable<any> {
    return this.http.post(`${env.baseUrl}/api/v1/cart`, { productId: PId },
      { headers: this.userHeader });
  }

  UpdateCart(PId: string | null, Pcount: number): Observable<any> {
    return this.http.put(`${env.baseUrl}/api/v1/cart/${PId}`, { count: Pcount },
      { headers: this.userHeader });
  }

  GetMycart(): Observable<any> {
    return this.http.get(`${env.baseUrl}/api/v1/cart`, { headers: this.userHeader });
  }

  RemoveCardProduct(PId: string | null): Observable<any> {
    return this.http.delete(`${env.baseUrl}/api/v1/cart/${PId}`, { headers: this.userHeader });
  }

  ClearCart(): Observable<any> {
    return this.http.delete(`${env.baseUrl}/api/v1/cart`, { headers: this.userHeader });
  }
}
