import { WishlistService } from './../../../../Core/Services/Whishlist/wishlist.service';
import { CartServiceService } from './../../../../Core/Services/Cart/cart-service.service';
import { Component, inject, Input, OnInit, SimpleChange } from '@angular/core';
import { IProducts } from '../../../Interfaces/ProductInterface/products';
import { Router } from 'express';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TruncatePipe } from '../../../Pipes/truncatePipe/truncate.pipe';
import { CurrencyPipe } from '@angular/common';



@Component({
  selector: 'app-card-products',
  imports: [RouterLink, TruncatePipe ,CurrencyPipe],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.scss'
})
export class CardProductsComponent implements OnInit {
  private cartServiceService = inject(CartServiceService)
  private WishlistService = inject(WishlistService)
  private toastrService = inject(ToastrService)
  existinwishlist :boolean = false
  @Input({ required: true }) product!: IProducts

  ngOnInit(): void {
    this.loadWishlist();
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
  loadWishlist() {
   if (localStorage.getItem('wishlist')) {
      let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      this.existinwishlist = wishlist.includes(this.product._id);
    }
    else {
      this.existinwishlist = false
    }
  }
  AddToWishList(Pid: string) {
    let storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (this.existinwishlist) {
      // Remove from wishlist
      storedWishlist = storedWishlist.filter((id: string) => id !== Pid);
      this.toastrService.warning('Removed from Wishlist');
    } else {
      // Add to wishlist
      this.WishlistService.addtowhishlist(Pid).subscribe()
      storedWishlist.push(Pid);
      this.toastrService.success('Added to Wishlist');
    }

    // Save updated wishlist to local storage
    localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
    this.existinwishlist = !this.existinwishlist;
  }
  removeWishlist(Pid: string) {
    this.WishlistService.removeWishlist(Pid).subscribe()
    localStorage.removeItem('wishlist');
    this.loadWishlist();
    
  }
}

