import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iproduct } from '../interfaces/iproduct';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) { }

 
  wishListNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToWishList(prodId: string | undefined): Observable<any> {
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/wishlist`, {
      productId: prodId 
    }
    )
  }
  getWishList(): Observable<any> {
    return this._HttpClient.get( `${environment.baseUrl}/api/v1/wishlist`)
  }
  
  removeWishList(prodId: string | undefined): Observable<any> {
    return this._HttpClient.delete( `${environment.baseUrl}/api/v1/wishlist/${prodId}`);
  }
}
