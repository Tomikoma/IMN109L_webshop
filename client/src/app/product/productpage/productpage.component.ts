import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/util/product.model';
import { ProductService } from 'src/app/util/product.service';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit, OnDestroy {

  product:Product;
  name: string;
  private productSub: Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.name = params.name;
    })
  }

  ngOnInit(): void {
    this.productService.getProduct(this.name);
    this.productSub = this.productService.getProductListener().subscribe(product => {
      this.product =  product;
    })
  }
  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}
