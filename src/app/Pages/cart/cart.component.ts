import { CartInterface } from './../../Shared/Interfaces/CartInterface/cart-interface';
import { Component, inject, OnInit } from '@angular/core';
import { CartServiceService } from '../../Core/Services/Cart/cart-service.service';
import { error } from 'console';
import { IProducts } from '../../Shared/Interfaces/ProductInterface/products';
import { Toast, ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { OrderInterface } from '../../Shared/Interfaces/OrderInterface/order-interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private cartServiceService = inject(CartServiceService)
  private toastrService = inject(ToastrService)
  private ngxSpinnerService = inject(NgxSpinnerService)
  numberofcartItems!: number
  cartId: string = ''
  CartProducts: CartInterface[] = [];
  TotalCartPrice: number = 0
  TotalCount: number = 0

  ngOnInit(): void {
    this.GetMycart()
  }
  GetMycart() {
    this.ngxSpinnerService.show('Loading1')
    this.cartServiceService.GetMycart().subscribe(
      {
        next: (res) => {
          this.CartProducts = res.data.products
          this.TotalCartPrice = res.data.totalCartPrice
          this.cartId = res.cartId
          this.TotalCount = this.CartProducts.length
          this.ngxSpinnerService.hide('Loading1')
          localStorage.setItem('cartowner', res.data.cartOwner)
          console.log(res.data.cartOwner)
        },
        error: (err) => { console.log(err); }

      },
    

    )
  }
  RemoveProduct(Pid: string) {
    this.cartServiceService.RemoveCardProduct(Pid).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.toastrService.warning("Successfully deleted from cart");
          this.cartServiceService.cartnumber.next(res.numOfCartItems)
          this.GetMycart()
        }

      }
    }
    )
  }
  ChangeCount(PId: string, Pcount: number) {
    if (Pcount <= 0) {
      this.RemoveProduct(PId)
      return
    }
    this.cartServiceService.UpdateCart(PId, Pcount).subscribe({
      next: (res) => {

        this.toastrService.success("Items Updated Succefully");

        this.GetMycart()


      },
      error: (err) => {
        console.log(err);
      }

    })
  }
  ClearCart() {
    this.cartServiceService.ClearCart().subscribe({
      next: (res) => {
        this.GetMycart()
        this.toastrService.show("Cart Cleared Succefully");
        this.cartServiceService.cartnumber.next(0)
      }
    })
  }

}
