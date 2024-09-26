import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  myHeaders: any = {
    token: localStorage.getItem('userToken')
  }

  addProductsToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}api/v1/cart`, {
      "productId": id
    }, {
      headers: this.myHeaders
    })
  }
}
