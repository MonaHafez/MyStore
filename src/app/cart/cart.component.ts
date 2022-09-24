import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import { CartServiceService } from '../services/cart.service.service'; 
import {Router} from "@angular/router";
import { CartDetail } from 'src/models/cart.detail';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit { 
  fullNameFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  addressFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  creditCardNumberFormControl = new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]); 

  totalAmount: number = 0;
  fullName: string = '';
  address: string = '';
  creditCardNumber: string = '';

  constructor(
    private router: Router,
    public cartService: CartServiceService,
  ) { }

  ngOnInit(): void { 
    this.recalculateTotalAmount();
    this.cartService.getUpdateCartMessage().subscribe(_ => this.recalculateTotalAmount());
  }
  getErrorMessage(entity: string) {
    return `Invalid ${entity}.`;
  }

  recalculateTotalAmount(): void {
    this.totalAmount = 0;
    this.cartService.getCart().forEach(cartItem => this.totalAmount += (cartItem.price * cartItem.amount));
  }

  changeItemAmount(cartItem: CartDetail, amount: number) {
    cartItem.amount = amount;
    this.cartService.updateCart(cartItem);
  }

  isValidForm(): boolean {
    return this.totalAmount !== 0 && this.fullNameFormControl.valid && this.addressFormControl.valid && this.creditCardNumberFormControl.valid;
  }

  async submitCart(): Promise<void> {
    if (this.isValidForm()) {
      this.cartService.cleanCart();
      await this.router.navigate(['/cart/submit', {fullName: this.fullName, totalAmount: this.totalAmount}]);
    }
  }
}
