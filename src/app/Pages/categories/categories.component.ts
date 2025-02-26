  import { SubcategoryService } from './../../Core/Services/SubCategory/subcategory.service';
  import { NgxSpinnerService } from 'ngx-spinner';
  import { CategoryInterface } from '../../Shared/Interfaces/CartegoryInterface/category-interface';
  import { CategoriesService } from './../../Core/Services/Categories/categories.service';
  import { Component, inject, OnInit } from '@angular/core';
  import { SubgcategoryInterface } from '../../Shared/Interfaces/SubCategoryInterface/subgcategory-interface';

  @Component({
    selector: 'app-categories',
    imports: [],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
  })
  export class CategoriesComponent implements OnInit {
  ShowProducts(arg0: string) {
  throw new Error('Method not implemented.');
  }
    private categoriesService = inject(CategoriesService)
    private ngxSpinnerService = inject(NgxSpinnerService)
    private subcategoryService = inject(SubcategoryService)
    CategorisList:CategoryInterface [] = []
    Mycategory:SubgcategoryInterface[]=[]
    SubcategoryName :string = ''
    ngOnInit(): void {
      this.ngxSpinnerService.show('Loading1')
        this.categoriesService.GetAllCategories().subscribe({
          next:(res)=>{
            this.CategorisList = res.data
            this.SubcategoryName = res.data.name
            this.ngxSpinnerService.hide('Loading1')
          }
        })
    }
    ShowSubCategory(CatID:string,categoryname:string)
    {
      this.SubcategoryName = categoryname;
      this.subcategoryService.GetallSubacategoryOnCategory(CatID).subscribe({
        next:(res)=>{
          this.Mycategory = res.data
          
          console.log(this.Mycategory)
          
        }
      })
    }

  }
