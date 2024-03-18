import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private fb:FormBuilder, private api:ApiService, private toaster:ToastrService, private router:Router){}

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      const user = {email,password}
      this.api.loginAPI(user).subscribe({
        next:(res:any)=>{
          this.toaster.success(`${res.existingUser.username}  has Login successfully!!!`)
          sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))
          sessionStorage.setItem("token",res.token)
          this.api.getWishlistCount()
          this.api.getCartCount()
          this.loginForm.reset()
          this.router.navigateByUrl('')
        },
        error:(reason:any)=>{
          this.toaster.warning(reason.error)
        }
      })
    }else{
      this.toaster.info('Invalid Form')
    }
  }
}
