import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../model/products.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) {}

  public getAllProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`${environment.backendHost}/products`);
  }
}
