import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient)

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/brands`)
  }

  getSpecificBrands(barndId: string | null): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/brands/${barndId}`)
  }
}