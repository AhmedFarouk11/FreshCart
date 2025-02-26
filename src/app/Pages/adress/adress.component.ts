import { OrdersService } from './../../Core/Services/Orders/orders.service';
import { CartServiceService } from './../../Core/Services/Cart/cart-service.service';
import { Component, inject } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-adress',
  imports: [ReactiveFormsModule],
  templateUrl: './adress.component.html',
  styleUrl: './adress.component.scss'
})
export class AdressComponent {
  private activatedRoute = inject(ActivatedRoute)
  private ordersService = inject(OrdersService)
  cartId: string = ""
  isLoading: boolean = false
  adressForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    phone: new FormControl(null),
    city: new FormControl(null),
  })
  adressSubmit() {

    this.activatedRoute.paramMap.subscribe((p) => {
      this.cartId = p.get('PcartId')!
      this.ordersService.Checkout(this.cartId, this.adressForm.value).subscribe(
        {
          next: (res) => { 
            window.location.href = res.session.url
            this.isLoading = true 
            localStorage.setItem('cartId', this.cartId)
          },
          error: (err) => { console.log(err); }

        }
      )
    }

    )
  }
}