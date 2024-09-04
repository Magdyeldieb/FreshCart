import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { }



  checkOut(idCart:string|null,shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}`,{

      "shippingAddress":shippingDetails
    },
  )
  }

  createCashOrder(id:string|null,shippingDetails:object):Observable<any>{

   return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/cash-order/${id}`,{
    "shippingAddress":shippingDetails
    }
  )}

  getAllOrders():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders`)
  }
  getUserOrders(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user-orders/${id}`)
    
        }
      }

