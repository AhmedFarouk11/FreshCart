import { AuthService } from './../../Core/Services/Authentication/auth.service';
import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'path';
Router


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService= inject(AuthService)
  private router=inject(Router)
  errorMsg:string='';
  isLoading:boolean=false
  registerform :FormGroup = new FormGroup(
    {
      name : new FormControl(null,[Validators.required,Validators.maxLength(20),Validators.minLength(3),Validators.pattern(/[a-zA-Z ]*/)] ),
      email :new FormControl(null,[Validators.required,Validators.email]),
      password :new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
      rePassword : new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/)]),
      phone :new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])

    },this.CheckPassword)
    CheckPassword(x:AbstractControl){
     if( x.get('password')?.value === x.get('rePassword')?.value){
      return null;
     }
     else{
      return {'mismatched':true}
     }
    }
    registerSubmit(){ 
      if(this.registerform.valid){
        this.isLoading=true
       this.authService.sendRegisterData(this.registerform.value).subscribe({
         
       
        next:(res)=>{
         if(res.message=='success'){
          localStorage.setItem('Usertoken',res.token)
         this.router.navigate(['/login'])
         }
          this.isLoading=false
          
        },
        error:(err)=>{
          this.errorMsg=err.error.message
          this.isLoading=false
        }
       })
      }
    }
  

}
