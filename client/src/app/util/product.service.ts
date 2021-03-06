import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsListener = new Subject<Product[]>();
  private productListener = new Subject<Product>();

  constructor(private http:HttpClient) { }

  getProducts(){
    this.http.get<Product[]>(environment.url + '/product').subscribe(products => {
      this.productsListener.next(products);
    })
  }

  getProduct(name: string){
    this.http.get<Product>(environment.url + '/product/' + name).subscribe(product => {
      this.productListener.next(product);
    })
  }

  buy(name: string, id: string, price: number){
    console.log(environment.springUrl)
    this.http.post(environment.springUrl + '/product/buy',{name,id,price}).subscribe(msg => {
      console.log(msg);
    })
  }



  getProductListener(){
    return this.productListener.asObservable();
  }

  getProductsListener(){
    return this.productsListener.asObservable()
  }
}
