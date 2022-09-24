import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/models/product.detail';
import { AlertService } from '../services/alert.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
 public products: Product[] = [];
  constructor( 
    public alertService: AlertService,
    public productService: ItemService
  ) { }

  ngOnInit(): void { 
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
