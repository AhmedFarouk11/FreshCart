import { CartServiceService } from './../../Core/Services/Cart/cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'node:console';
import { Category, WhishlistInterface } from '../../Shared/Interfaces/Whishlist/whishlist-interface';
import { WishlistService } from './../../Core/Services/Whishlist/wishlist.service';
import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-whishlist',
  imports: [],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.scss'
})
export class WhishlistComponent implements OnInit{ 
private WishlistService = inject(WishlistService)
private cartServiceService = inject(CartServiceService)
private toastrService = inject(ToastrService)
private ngxSpinnerService = inject(NgxSpinnerService)
 UserWhishlist : WhishlistInterface [] = []
 wishlisID :string  = ''
 whislistfree:number = 0
 existinwishlist :boolean = false
  router: any;
  ngOnInit(): void {
    this.Getwishlist()
  }
  Getwishlist(){
    this.ngxSpinnerService.show('Loading1')
    this.WishlistService.getWishlist().subscribe(
      { next :(res)=>
        {
          localStorage.getItem('Usertoken')
          this.UserWhishlist = res.data
          this.ngxSpinnerService.hide('Loading1')
        },
        
        error:(err)=> {
          console.log(err);
        }

      })

  }
  RemoveProduct(wishlistID:string)
  {
    this.WishlistService.removeWishlist(wishlistID).subscribe({
      next:(res)=>{
     
        this.toastrService.warning("Successfully deleted from wishlist");
        localStorage.removeItem('wishlist');
        this.Getwishlist()
        
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }
  Addtocart(WishID:string){
    this.cartServiceService.addToCart(WishID).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message);
        this.Getwishlist()
        this.RemoveProduct(WishID)
      },
      error:(err)=>{
        console.log(err);
      }
    })
    

  }


}
