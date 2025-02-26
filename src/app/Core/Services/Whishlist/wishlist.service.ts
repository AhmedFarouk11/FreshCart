import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../Enviroment/Enviroment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  pId :string = ''
  private http = inject(HttpClient)
  private headers: any = { token: localStorage.getItem('Usertoken') }

  constructor() { }
  addtowhishlist(pId:string):Observable<any>{ 
    return this.http.post(`${env.baseUrl}/api/v1/wishlist`,{productId : pId},{headers : this.headers})
  }
  getWishlist():Observable<any>{ 
    return this.http.get(`${env.baseUrl}/api/v1/wishlist`,{headers : this.headers})
  }
  removeWishlist(pId:string):Observable<any>{ 
    return this.http.delete(`${env.baseUrl}/api/v1/wishlist/${pId}`,{headers : this.headers})
  }
}
