import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  product:any = {}
  constructor(private route:ActivatedRoute, private api:ApiService, private toaster:ToastrService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const { id } = res  
      this.getProduct(id)    
    })
  }

  getProduct(pid:any){
    this.api.viewProductAPI(pid).subscribe((res:any)=>{
      this.product = res
      console.log(this.product);    
    })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      // proceed to wishlist
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.success(`Product '${res.title}' added  to your Wishlist`);
          this.api.getWishlistCount()
        },
        error:(reason:any)=>{
          console.log(reason);
          this.toaster.warning(reason.error)
        }
      })
    }else{
      this.toaster.info("Please Login...")
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      // proceed to cart
      product.quantity = 1
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.success(res)
          this.api.getCartCount()
        },
        error:(reason:any)=>{
          this.toaster.warning(reason.error)
        }
      })
    }else{
      this.toaster.info("Please Login...")
    }
  }

}