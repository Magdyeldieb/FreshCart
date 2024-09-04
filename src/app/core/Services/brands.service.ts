import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _HttpClient = inject(HttpClient)
  constructor() { }

  getAllBrands(pageNum:number=1):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands?page=${pageNum}`);
  }
  getSpecificbrand(id:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`);
  }
}
