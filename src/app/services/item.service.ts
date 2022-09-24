import { Injectable } from '@angular/core';
import { Item } from 'src/models/item.detail';
import{HttpClient} from "@angular/common/http";
import { Observable ,map} from 'rxjs';
import {Product} from 'src/models/product.detail';

@Injectable({
  providedIn: 'root'
})
export class ItemService {   
  private jsonUrl = "assets/data.json";
  /* 
  
  items:Item[] = [ 
    {
      id:1,
      name:"Book",
      category:"stationary",
      price:9.99,
      discount:75,
      showDiscount:false

    } ,
    {
      id:2,
      name:"Headphones",
      category:"electronics",
      price:249.99,
      discount:25,
      showDiscount:true
    } ,
    {
      id:3,
      name:"Backbag",
      category:"stationary",
      price:79.99,
      discount:70

    } ,
    {
      id:4,
      name:"Glasses",
      category:"pharmacy",
      price:129.99,
      discount:50

    },
    {
      id:4,
      name:"cup",
      category:"kitchen",
      price:79.99,
      discount:70

    }
    ]

  constructor() { } 
  private getItem(id:number):Item {
    return this.items.filter(item => item.id ===id)[0];
  }
  public getItemName(id:number):String{
    return this.getItem(id).name;
  } 

  public getItemCategory(id:number):String{
    return this.getItem(id).category;
  }

  public getItemPrice(id:number):number{
    return this.getItem(id).price;
  } 

  public getItemDiscount(id:number):number{
    return this.getItem(id).discount;
  }

  public setItemShowDiscount(id:number , val:boolean):void {
    this.getItem(id).showDiscount = val;
  } 
  */ 
 constructor(private httpClient: HttpClient){
 } 

 public getProducts(): Observable<Product[]> {
   return this.httpClient.get<Product[]>(this.jsonUrl);
 } 
 public getProduct(id:number){
  return this.httpClient.get<Product[]>(this.jsonUrl).pipe (
      map(products => products.filter(products => products.id === id))
  );

 }
}
