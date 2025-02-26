import { PlatformService } from './../Platform/platform.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { env } from '../../Enviroment/Enviroment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  User_token: BehaviorSubject<any> = new BehaviorSubject(null)
  private http: HttpClient = inject(HttpClient)
  private platformService = inject(PlatformService)

  constructor() {
    if (this.platformService.checkPlatForm()) {
      this.SaveData(); // Ensure token is loaded at startup
    }
  
    // Listen for changes in User_token and log them for debugging
    this.User_token.subscribe((token) => {
      console.log("Updated User Token:", token);
    });
  }
  
  sendRegisterData(data: object): Observable<any> {
    return this.http.post(`${env.baseUrl}/api/v1/auth/signup`, data)
  }
  LoginApi(data: object): Observable<any> {
    return this.http.post(`${env.baseUrl}/api/v1/auth/signin`, data)
  }
  SaveData() {
    const token = localStorage.getItem('Usertoken');
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        this.User_token.next(decoded); 
        console.log("Token decoded successfully:", decoded);
      } catch (error) {
        console.error('Invalid Token:', error);
        localStorage.removeItem('Usertoken'); // Remove invalid token
        this.User_token.next(null);
      }
    } else {
      console.warn('No token found in localStorage');
      this.User_token.next(null);
    }
  }
  
setEmailVerify(data:object):Observable<any>
{
  return this.http.post(`${env.baseUrl}/api/v1/auth/forgotPasswords`,data)
}
setCodeVerify(data:object):Observable<any>
{
  return this.http.post(`${env.baseUrl}/api/v1/auth/verifyResetCode`,data)
}
setNewPassword(data:object):Observable<any>
{
  return this.http.put(`${env.baseUrl}/api/v1/auth/resetPassword`,data)
}
}

