import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartDetail } from 'src/models/cart.detail';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService { 
  private readonly readCart!: Map<number ,CartDetail>;
  private addCartMsg: Subject<CartDetail>;
  private removeCartMsg: Subject<CartDetail>;
  private updateCartMsg: Subject<boolean>;
  private addToCartStatusMsg: Subject<boolean>;
  private removeFromCartStatusMsg: Subject<boolean>;

  constructor() {  
    this.readCart = new Map<number , CartDetail>();
    this.addCartMsg = new Subject<CartDetail>();
    this.removeCartMsg = new Subject<CartDetail>();
    this.updateCartMsg = new Subject<boolean>();
    this.addToCartStatusMsg = new Subject<boolean>();
    this.removeFromCartStatusMsg = new Subject<boolean>();
    this.addCartMsg.subscribe(cartItem => {
      const exists = this.readCart.has(cartItem.id);
      this.readCart.set(cartItem.id, cartItem);
      this.updateCartMsg.next(!exists);
      this.addToCartStatusMsg.next(!exists);
    });
    this.removeCartMsg.subscribe(cartItem => {
      const exists = this.readCart.has(cartItem.id);
      this.readCart.delete(cartItem.id);
      this.updateCartMsg.next(exists);
      this.removeFromCartStatusMsg.next(exists);
    });


  }

  public getCart(): Map<number,CartDetail> {
    return this.readCart;
  } 
  public getAddToCartMsg(): Observable<CartDetail> {
    return this.addCartMsg.asObservable();

  }
  public getRemoveCart(): Observable<CartDetail> {
    return this.removeCartMsg.asObservable();
  } 
  public getUpdateCartMessage(): Observable<boolean> {
    return this.updateCartMsg.asObservable();
  }
  public getaddToCartStatusMsg(): Observable<boolean> {
    return this.addToCartStatusMsg.asObservable();
  }
  public getremoveFromCartStatusMsg() : Observable<boolean> {
    return this.removeFromCartStatusMsg.asObservable();
  } 
  public updateCart(CartDetail: CartDetail):void{
    console.log("XXXXXXXXXX 1");
    this.addCartMsg.next(CartDetail);

  } 
  public removeCart(CartDetail: CartDetail):void{
    this.removeCartMsg.next(CartDetail);
  }
  public cleanCart():void {
    this.readCart.clear();
  }
}
