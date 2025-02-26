import { CartServiceService } from './../../Core/Services/Cart/cart-service.service';
import { WishlistService } from './../../Core/Services/Whishlist/wishlist.service';
import { CategoriesService } from './../../Core/Services/Categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/Products/products.service';
import { IProducts } from '../../Shared/Interfaces/ProductInterface/products';
import { RouterLink } from '@angular/router';
import { CardProductsComponent } from "../../Shared/Components/Business/card-products/card-products.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryInterface } from '../../Shared/Interfaces/CartegoryInterface/category-interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { SerchPipePipe } from '../../Shared/Pipes/Search/serch-pipe.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CardProductsComponent,CarouselModule,SerchPipePipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private WishlistService = inject(WishlistService)
  private ngxSpinnerService = inject(NgxSpinnerService)

  search:string = ''
  custommain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
   items: 1,
    nav: false
  }

  customOptions: OwlOptions = {
    autoWidth: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 5,
    navText: ['', ''],
    
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  private categoriesService = inject(CategoriesService)
  
  private productsService = inject(ProductsService)
  allproducts : IProducts[] = []
  categoriesList: CategoryInterface[] = []
  ngOnInit(): void {
    this.GetAllProductsHome()
    this.categoriesService.GetAllCategories().subscribe({
      next:(res)=>{
        this.WishlistService.getWishlist().subscribe()
        this.categoriesList = res.data
      }
    })
   
  }
  GetAllProductsHome(){
    this.ngxSpinnerService.show('Loading1')
    this.productsService.getallProducts().subscribe({
      next :(res)=>{
        this.allproducts = res.data
        
        this.ngxSpinnerService.hide('Loading1')
      }
    })
  }
}
