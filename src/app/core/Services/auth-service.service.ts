import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService  {

  private readonly _HttpClient =inject(HttpClient)
  private readonly _Router =inject(Router)



userData:any =null
currentLang: any;


  setRegisterForm(data:object):Observable<any>
  {
  return  this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }

  setloginForm(data:object):Observable<any>
  {
  return  this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }

saveUserData():void {
  if (localStorage.getItem('userToken') !== null) {
  this.userData =  jwtDecode(localStorage.getItem('userToken')!)
  }
}

logOut(): void {
  // Add your logout logic here
  this.userData = null;
  localStorage.removeItem('userToken');
   // Redirect to login page or some other logic
  this._Router.navigate(['/login'])

}

setEmailApi(data:object):Observable<any> {

  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
}

setCodeApi(data:object):Observable<any> {

  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
}

setResetPassApi(data:object):Observable<any> {

  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data)
}


}
