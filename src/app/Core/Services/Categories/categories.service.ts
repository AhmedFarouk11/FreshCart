import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../Enviroment/Enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient)

  constructor() { }

  GetAllCategories(): Observable<any> {
    return this.http.get(`${env.baseUrl}/api/v1/categories`)
  }
  GetSpecificCategory(CategoryID: string): Observable<any> {
    return this.http.get(`${env.baseUrl}/api/v1/categories/${CategoryID}`)
}}
