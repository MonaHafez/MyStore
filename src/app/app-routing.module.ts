import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ItemComponent } from './item/item.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductListComponent, data: {title: 'Products List'}},
  {path: 'product/:id', component: ItemComponent, data: {title: 'Product'}},
  {path: 'cart', component: CartComponent, data: {title: 'Cart'}},
  {path: 'cart/submit', component: ConfirmationComponent, data: {title: 'Order Confirmation'}},
  {path: '**', redirectTo: 'products'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
