import { Component, inject, Input } from '@angular/core';
import { SubgcategoryInterface } from '../../Shared/Interfaces/SubCategoryInterface/subgcategory-interface';
import { SubcategoryService } from '../../Core/Services/SubCategory/subcategory.service';
import { CategoriesService } from '../../Core/Services/Categories/categories.service';
import { CategoryInterface } from '../../Shared/Interfaces/CartegoryInterface/category-interface';

@Component({
  selector: 'app-subcategories',
  imports: [],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent {
  @Input({ required: true }) MycategoryID!:string
  private categoriesService = inject(CategoriesService)
  private subcategoryService = inject(SubcategoryService)
  SubCategoryList:SubgcategoryInterface[]=[]
  Mycategory:CategoryInterface[]=[]

}
