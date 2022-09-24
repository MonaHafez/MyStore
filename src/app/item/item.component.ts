import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Item } from 'src/models/item.detail';
import { AlertService } from '../services/alert.service';
import { CartServiceService } from '../services/cart.service.service';
import { ItemService } from '../services/item.service';
import { Product } from 'src/models/product.detail';
import { Status } from 'src/models/Status.details';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {  
  @Input() product?: Product;
  @Input() productId?: number;

  @Output() removeFromCart : EventEmitter<Status>;
  @Output() addToCart : EventEmitter<Status>;

  selectedAmount: number = 0;
  isFulLView: boolean = false;
  addToCartOptions: number[];

  items: Item[] = [];

  constructor( 
    private itemService :ItemService ,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private cartService: CartServiceService,
    ) {  
      this.removeFromCart = new EventEmitter<Status>();
      this.addToCart = new EventEmitter<Status>();
      this.addToCartOptions= [...Array(11).keys()].slice(1);
   
  }

  ngOnInit(): void { 
   // this.items = this.itemService.items; 
   if(!this.productId){
    this.productId = Number(this.route.snapshot.paramMap.get('productId'))
   }

   this.isFulLView = !! this.productId && ! this.product;
   if(this.isFulLView) {
    this.itemService.getProduct(this.productId).subscribe(
      products => products.length !== 0 ? this.product = products[0] : undefined);
    
   }
   this.cartService.getaddToCartStatusMsg()
   .subscribe(status => this.addToCart.emit({state: status, message: 'Item is added to cart successfully!'}));

 this.cartService.getremoveFromCartStatusMsg()
   .subscribe(status => this.removeFromCart.emit({
     state: status,
     message: status ? 'Item is removed from cart successfully!' : 'Item is not found to be removed from cart.'
   }));

 if (this.isFulLView) {
   this.addToCart.subscribe(status => this.alertService.openSnackBar(status.message, 'OK'));
   this.removeFromCart.subscribe(status => this.alertService.openSnackBar(status.message, 'OK'));
 }
  } 

  addToCartAction(amount: number, product: Product) {
    if (amount === 0) {
      this.addToCart.emit({state: false, message: 'Amount to be added to cart is not selected.'});
      return;
    }

    this.cartService.updateCart({
      id: product.id,
      name: product.name,
      url: product.url,
      price: product.price,
      amount: amount,
    });
  }

  removeFromCartAction(product: Product) {
    this.cartService.removeCart({
      id: product.id,
      name: product.name,
      price: product.price,
      url: product.url,
      amount: 0,
    });
  }
 
 /* showDiscount(id:number){
    this.itemService.setItemShowDiscount(id,true);
  } 

 hideDiscount(id:number){
    this.itemService.setItemShowDiscount(id,false);
  }  
  */
}
