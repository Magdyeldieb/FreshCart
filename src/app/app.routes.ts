import { Routes } from '@angular/router';
import { authGuard } from './core/guardes/auth.guard';
import { logedGuard } from './core/guardes/loged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';



export const routes: Routes = [
  {path:'',component:AuthLayoutComponent,canActivate:[logedGuard] ,children:[
    {path:'',redirectTo:'login', pathMatch:'full'},
    {path:'login',loadComponent:()=> import ('./components/login/login.component').then((c)=> c.LoginComponent)},
    {path:'register',loadComponent:()=> import ('./components/register/register.component').then((c)=> c.RegisterComponent)},
    {path:'forget',loadComponent:()=> import ('./components/forgetpassword/forgetpassword.component').then((c)=> c.ForgetpasswordComponent)},
  ]},
  {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
    {path:'',redirectTo:'home', pathMatch:'full'},
    {path:'home',loadComponent:()=> import ('./components/home/home.component').then((c)=> c.HomeComponent)},
    {path:'products',loadComponent:()=> import ('./components/products/products.component').then((c)=> c.ProductsComponent)},
    {path:'productdetails/:id',loadComponent:()=> import ('./components/detail/detail.component').then((c)=> c.DetailComponent)},
    {path:'cart',loadComponent:()=> import ('./components/cart/cart.component').then((c)=> c.CartComponent)},
    {path:'brands',loadComponent:()=> import ('./components/brands/brands.component').then((c)=> c.BrandsComponent)},
    {path:'branddetails/:id',loadComponent:()=> import ('./components/branddetails/branddetails.component').then((c)=> c.BranddetailsComponent)},
    {path:'categories',loadComponent:()=> import ('./components/categories/categories.component').then((c)=> c.CategoriesComponent)},
    {path:'categorydetails/:id',loadComponent:()=> import ('./components/categorydetails/categorydetails.component').then((c)=> c.CategorydetailsComponent)},
    {path:'detail/:id',loadComponent:()=> import ('./components/detail/detail.component').then((c)=> c.DetailComponent)},
    {path:'allorders',loadComponent:()=> import ('./components/allorders/allorders.component').then((c)=> c.AllordersComponent)},
    {path:'orders/:id',loadComponent:()=> import ('./components/orders/orders.component').then((c)=> c.OrdersComponent)},
    {path:'wishlist',loadComponent:()=> import ('./components/wishlist/wishlist.component').then((c)=> c.WishlistComponent)},

  ]},
  {path:'**',loadComponent:()=> import ('./components/notfound/notfound.component').then((c)=> c.NotfoundComponent)},
];
