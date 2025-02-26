import { NgxSpinnerService } from 'ngx-spinner';
import { dirname } from 'node:path';
import { BrandsService } from './../../Core/Services/Brands/brands.service';
import { Component, inject, OnInit } from '@angular/core';
import { BrandsInterface } from '../../Shared/Interfaces/BrandsInterface/brands-interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private brandsService = inject(BrandsService)
  private ngxSpinnerService = inject(NgxSpinnerService)
  MyBrands:BrandsInterface[]=[]
 // Replace with actual interface if available
  showModal: boolean = false;
  selectedBrand: any = null;
  
ngOnInit(): void {
  this.ngxSpinnerService.show('Loading1')
      this.brandsService.GetAllBrands().subscribe({
      next:(res)=>{
        this.MyBrands = res.data
        this.ngxSpinnerService.hide('Loading1')
      }
    })
}
getSpecificBrand(BrandId:string){
  this.brandsService.GetSpecificBrand(BrandId).subscribe({
    next:(res)=>{
      console.log(res.data)
   
    }
  })
}
openModal(brand: any) {
  this.selectedBrand = brand;
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.selectedBrand = null;
}
}
