import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../Enviroment/Enviroment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private http = inject(HttpClient)

  constructor() { }
  GetAllBrands():Observable<any>
  {
    return this.http.get(`${env.baseUrl}/api/v1/brands`)
  }
  GetSpecificBrand(BrandId:string):Observable<any>
  {
    return this.http.get(`${env.baseUrl}/api/v1/brands/${BrandId}`)
  }
}
