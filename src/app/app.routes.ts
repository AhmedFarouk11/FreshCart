import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ProductsComponent } from './Pages/products/products.component';
import { CartComponent } from './Pages/cart/cart.component';
import { BrandsComponent } from './Pages/brands/brands.component';
import { DetailsComponent } from './Pages/details/details.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { CategoriesComponent } from './Pages/categories/categories.component';
import { authGuard } from './Core/Guards/Authenticate/auth.guard';
import { AllordersComponent } from './Pages/allorders/allorders.component';
import { AdressComponent } from './Pages/adress/adress.component';
import { WhishlistComponent } from './Pages/whishlist/whishlist.component';
import { ForgetPaswwordComponent } from './Pages/forget-paswword/forget-paswword.component';


export const routes: Routes = [
    {path:'',redirectTo:'Home',pathMatch:'full'},
    {path: 'Home',component:HomeComponent,canActivate:[authGuard],title:'Home'},
    {path:'Products',component:ProductsComponent,canActivate:[authGuard],title:'Products'},
    {path:'Cart',component:CartComponent,canActivate:[authGuard],title:'Cart'},
    {path:'Whishlist',component:WhishlistComponent,canActivate:[authGuard],title:'User Whishlist'},
    {path:'details/:Pid',component:DetailsComponent,canActivate:[authGuard],title:'Details'},
    {path:'allorders' ,component:AllordersComponent,canActivate:[authGuard],title:'Allorders'},
    {path:'Adress/:PcartId' ,component:AdressComponent,canActivate:[authGuard],title:'Adress'},
    {path:'Categories',component:CategoriesComponent,canActivate:[authGuard],title:'Categories'},
    {path:'Brands',component:BrandsComponent,canActivate:[authGuard],title:'Brands'},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'Register',component:RegisterComponent,title:'Register'},
    {path:'Forget',component:ForgetPaswwordComponent,title:'ForgetPassword'},
    {path:'**',component:NotFoundComponent,title:'Not Found'}
];
