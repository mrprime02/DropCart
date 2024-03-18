import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  copounClickStatus:boolean = false
  cartTotalPrice:number = 0
  copounStatus:boolean = false
  allProducts:any = []
  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getCart()
    }
  }

  getCart(){
    this.api.getCartAPI().subscribe({
      next:(res:any)=>{
        this.allProducts = res
        console.log(this.allProducts); 
        this.getCartTotal() 
      },
      error:(reason:any)=>{
        console.log(reason);     
      }
    })
  }

  removeCartItem(id:any){
    this.api.removeCartItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason.error);        
      }
    })
  }

  incrementQuantity(id:any){
    this.api.incrementCartItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason.error);        
      }
    })
  }

  decrementQuantity(id:any){
    this.api.decrementCartItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason.error);        
      }
    })
  }

  emptyCart(){
    this.api.emptyCartAPI().subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason.error);        
      }
    })
  }

  getCartTotal(){
    this.cartTotalPrice = Math.ceil(this.allProducts.map((product:any)=>product.totalPrice).reduce((p1:any,p2:any)=>p1+p2))
  }

  getCopoun(){
    this.copounStatus =true
  }

  dicount50(){
    this.copounClickStatus = true
    let dicount = Math.ceil(this.cartTotalPrice * 0.5)
    this.cartTotalPrice -= dicount
  }

  discount30(){
    this.copounClickStatus = true
    let dicount = Math.ceil(this.cartTotalPrice * 0.3)
    this.cartTotalPrice -= dicount
  }

  discount10(){
    this.copounClickStatus = true
    let dicount = Math.ceil(this.cartTotalPrice * 0.1)
    this.cartTotalPrice -= dicount
  }

  checkout(){
    sessionStorage.setItem("cartTotalPrice",JSON.stringify(this.cartTotalPrice))
    this.router.navigateByUrl('/checkout')
  }
  
}
