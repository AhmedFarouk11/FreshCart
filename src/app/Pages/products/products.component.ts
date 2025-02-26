import { CartServiceService } from './../../Core/Services/Cart/cart-service.service';
import { WishlistService } from './../../Core/Services/Whishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { ProductsService } from './../../Core/Services/Products/products.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IProducts } from '../../Shared/Interfaces/ProductInterface/products';
import { TruncatePipe } from '../../Shared/Pipes/truncatePipe/truncate.pipe';
import { CardProductsComponent } from "../../Shared/Components/Business/card-products/card-products.component";
import { NgxSpinnerService } from 'ngx-spinner';
import { SerchPipePipe } from '../../Shared/Pipes/Search/serch-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [RouterLink, TruncatePipe,SerchPipePipe,FormsModule,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService)
  private WishlistService = inject(WishlistService)
  private toastrService   = inject(ToastrService)
  private cartServiceService = inject(CartServiceService)
  private ngxSpinnerService = inject(NgxSpinnerService)
  @Input({ required: true }) product!: IProducts
  existinwishlist :boolean = false
  Products :IProducts [] = []
  wishlist: string[] = [];
 search:string = ''
  ngOnInit(): void {
    this.GetallProducts();
    this.loadWishlist();
  }
  GetallProducts() {
    this.ngxSpinnerService.show('Loading1');
        this.productsService.getallProducts().subscribe({
      next: (res) => {
        this.Products = res.data;
        this.ngxSpinnerService.hide('Loading1');
      },
      error: (err) => {
        console.log(err);
      }
    });
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
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }
  AddToWishList(ProductId: string) {
    let storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (storedWishlist.includes(ProductId)) {
      // Remove from wishlist
      storedWishlist = storedWishlist.filter((id: string) => id !== ProductId);
      this.toastrService.warning('Removed from Wishlist');
    } else {
      // Add to wishlist
      this.WishlistService.addtowhishlist(ProductId).subscribe();
      storedWishlist.push(ProductId);
      this.toastrService.success('Added to Wishlist');
    }

    // Save updated wishlist to local storage
    localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
    this.wishlist = storedWishlist;
  }
  removeWishlist(ProductId: string) {
    this.WishlistService.removeWishlist(ProductId).subscribe()
    localStorage.removeItem('wishlist');
    this.GetallProducts();
    
  }
  isInWishlist(ProductId: string): boolean {
    return this.wishlist.includes(ProductId);
  }
}
