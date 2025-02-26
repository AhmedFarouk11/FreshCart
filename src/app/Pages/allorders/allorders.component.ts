import { AuthService } from './../../Core/Services/Authentication/auth.service';
import { jwtDecode } from 'jwt-decode';
import { OrderInterface } from '../../Shared/Interfaces/OrderInterface/order-interface';
import { IAllorder, IUsertoken } from '../../Shared/Interfaces/usertoken/usertoken';
import { OrdersService } from './../../Core/Services/Orders/orders.service';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { CartInterface } from '../../Shared/Interfaces/CartInterface/cart-interface';
import { Allorders, CartItem } from '../../Shared/Interfaces/allOrders/allorders';


@Component({
  selector: 'app-allorders',
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {
  private ordersService = inject(OrdersService);
  private authService = inject(AuthService);

MyOrders:Allorders[]=[]

  ngOnInit(): void {
   

    this.getAllOrder();

  }




  getAllOrder() {
    this.ordersService.UserOrders().subscribe({
      next: (res: Allorders[]) => {    
        console.log('All Orders:', res);
        
        // Extract cart items from all orders
        this.MyOrders = res;
        console.log(this.MyOrders);
      },
      error: (err) => {
        console.log(err);
      }
    });

}
  
  
  
  
 
  
}
