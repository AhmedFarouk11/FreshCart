import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Core/Services/Authentication/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService)
  private router = inject(Router)
  isLoading:boolean=false
  errorMsg:string=''
  loginform: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  })
  LoginSubmit() {
    if (this.loginform.valid) {
      this.isLoading = true;
      this.authService.LoginApi(this.loginform.value).subscribe({
        next: (res) => {
          if (res.token) {  // ✅ Ensure token exists
            localStorage.setItem('Usertoken', res.token);
            setTimeout(() => this.authService.SaveData(), 50); // ✅ Ensure localStorage updates
            this.router.navigate(['/Home']);
          } else {
            this.errorMsg = 'Invalid login response. Please try again.';
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = err.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }
}
