import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '../../Enviroment/Enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private http = inject(HttpClient)

  constructor() { }
  GetallSubacategoryOnCategory(categoryID: string): Observable<any> {
   return this.http.get(`${env.baseUrl}/api/v1/categories/${categoryID}/subcategories`)
  }
  
}
