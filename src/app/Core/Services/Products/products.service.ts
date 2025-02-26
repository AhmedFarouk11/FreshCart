import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../Enviroment/Enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getallProducts(): Observable<any> {
    return this.http.get(`${env.baseUrl}/api/v1/products`)
  }
  getSpecificProduct(pId:string|null):Observable<any>
  {
    return this.http.get(`${env.baseUrl}/api/v1/products/${pId}`)
  }
}
