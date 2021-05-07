import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../util/product.model';
import { ProductService } from '../util/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[];
  private productsSub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.productsSub = this.productService.getProductsListener().subscribe(products => {
      this.products = products;
    })
  }

}
