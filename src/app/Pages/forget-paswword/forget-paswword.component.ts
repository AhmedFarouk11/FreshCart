import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../Core/Services/Authentication/auth.service';
import { Component, inject } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import e from 'express';

@Component({
  selector: 'app-forget-paswword',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-paswword.component.html',
  styleUrl: './forget-paswword.component.scss'
})
export class ForgetPaswwordComponent {
  private authService = inject(AuthService)
  private ToastrService = inject(ToastrService)
  private router = inject(Router)
  step:number = 1;
  vrifyEmail:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })
  verifyCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  })
  resetPassword:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  })
  verifyEmailSubmit(){
    let EmailValue = this.vrifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(EmailValue)
    this.authService.setEmailVerify(this.vrifyEmail.value).subscribe(
      {
        next:(res)=>{
          if(res.statusMsg === 'success'){
            this.step=2;
            console.log(res);
          }
        }
      }
    )
  }
  verifyCodeSubmit(){
    this.authService.setCodeVerify(this.verifyCode.value).subscribe(
      {
        next:(res)=>{
          if(res.status === 'Success'){
            this.step=3;
            console.log(res);
          }
        }
      }
    )
  }
  verifynewPassword(){
    this.authService.setNewPassword(this.resetPassword.value).subscribe(
      {
        next:(res)=>{
          localStorage.setItem('Usertoken',res.token);
          this.authService.SaveData()
        this.router.navigate(['/Home']);
        }
      }
    )
  }
}
