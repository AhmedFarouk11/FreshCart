import { CartServiceService } from './../../Core/Services/Cart/cart-service.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Core/Services/Authentication/auth.service';
import { CartInterface } from '../../Shared/Interfaces/CartInterface/cart-interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private cartServiceService = inject(CartServiceService);
  private router = inject(Router);

  isLogin: boolean = false;
  CartProducts: CartInterface[] = [];
  TotalCount!: number ;

  ngOnInit() {
    this.cartServiceService.cartnumber.subscribe({
      next: (value) => {
        this.TotalCount = value;
      }
    
    })

    // Subscribe to authentication status changes
    this.authService.User_token.subscribe(() => {
      this.isLogin = this.authService.User_token.getValue() !== null;
      

      // Fetch cart only if user is logged in
      if (this.isLogin) {
        this.GetMycart();
      } else {
        this.TotalCount = 0; // Reset cart count on logout
      }
    });
  }

  LogOut() {
    localStorage.removeItem('Usertoken');
    this.router.navigate(['/login']);
    this.authService.User_token.next(null);
  }

  GetMycart() {
    this.cartServiceService.GetMycart().subscribe({
      next: (res) => {
        if (res?.data?.products) {
          this.CartProducts = res.data.products;
          this.TotalCount = this.CartProducts.length; // Update total count
        }
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      }
    });
  }
}
