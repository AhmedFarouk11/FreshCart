import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from './../../Core/Services/Cart/cart-service.service';
import { ProductsService } from './../../Core/Services/Products/products.service';
import { Component, inject, Input } from '@angular/core';
import { CardProductsComponent } from "../../Shared/Components/Business/card-products/card-products.component";
import { IProducts } from '../../Shared/Interfaces/ProductInterface/products';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-details',
  imports: [CardProductsComponent,CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  pspec !: IProducts
  private cartServiceService =inject(CartServiceService)
  private toastrService = inject(ToastrService)
  private productsService = inject(ProductsService)
  private activatedRoute = inject(ActivatedRoute)
  Pid:string|null = ""
  ngOnInit():void{
   this.activatedRoute.paramMap.subscribe((p)=>
    {
     this.Pid= p.get("Pid")
    this.productsService.getSpecificProduct(this.Pid).subscribe(
      {
        next:(res)=>{
          this.pspec=res.data
      },
        error:(err)=>{
        console.log(err);
      }
    })
  }
    )
  }
  Addtocart(Pid: string) {
    this.cartServiceService.addToCart(Pid).subscribe({
      next: (res) => {

        this.toastrService.success(res.message);

        this.cartServiceService.cartnumber.next(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }

    }


    )
  }
}
