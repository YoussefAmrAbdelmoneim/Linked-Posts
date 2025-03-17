import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../shared/environment/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
   private readonly router=inject(Router); 
  signUp(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.url}/users/signup`,data)
  }
  signIn(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.url}/users/signin`,data)
  } 
  changePassword(data:object):Observable<any>
  {
    return this.httpClient.patch(`${environment.url}/users/change-password`,data)
  } 
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
