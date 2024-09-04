import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/Services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/Services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/Services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,TermtextPipe,SearchPipe,FormsModule ,RouterLink,UpperCasePipe,SalePipe,TitleCasePipe,CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{

private readonly _ProductsService = inject(ProductsService)
private readonly _CategoriesService = inject(CategoriesService)
private readonly _CartService = inject(CartService)
private readonly _ToastrService= inject(ToastrService)
private readonly _NgxSpinnerService= inject(NgxSpinnerService)
private readonly _WishlistService = inject(WishlistService)


text:string='';
getAllProductSub ! :Subscription


customOptionsMain: OwlOptions = {
  loop: true,
  rtl:true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-forward "></i>', '<i class="fa-solid fa-backward "></i>'],
  items:1,
  nav: true
}

customOptionsCat: OwlOptions = {
  loop: true,
  rtl:true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-forward "></i>', '<i class="fa-solid fa-backward "></i>'],
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
      items: 6
    }
  },
  nav: true
}



productsList:Iproduct []=[];
categoriesList:Icategory []=[];
wishListData: string[] = [];

ngOnInit(): void {

  this._WishlistService.getWishList().subscribe({
    next: (response) => {
      const newData = response.data.map((item: any) => item._id)//returns array but diff format
      this.wishListData = newData;
      console.log(response, 'd');
    }
  });
  

  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{console.log(res.data);
      this.categoriesList=res.data;

    },
    error:(err)=>{console.log(err);
    }
  })

 this.getAllProductSub =  this._ProductsService.getAllProduct().subscribe({
      next:(res)=>{console.log(res.data);
        this.productsList=res.data;
      },
      error:(err)=>{console.log(err);
      }

    })
}


addFav(prodId: string | undefined): void {
  this._WishlistService.addToWishList(prodId).subscribe({
    next: (response) => {
   
      this._ToastrService.success(response.message);
      this.wishListData = response.data;
      this._WishlistService.wishListNumber.next(response.data.length)
    }
  })
}
removeFav(prodId: string | undefined): void {
  this._WishlistService.removeWishList(prodId).subscribe({
    next: (response) => {
      this._ToastrService.success(response.message);
      this.wishListData = response.data;
      this._WishlistService.wishListNumber.next(response.data.length)
    }
  })
}





ngOnDestroy(): void {

  this.getAllProductSub?.unsubscribe()
}
addCart(id:string):void {
  this._CartService.addProductToCart(id).subscribe({

    next:(res)=>{
      this._ToastrService.success(res.message,'Fresh Cart')
      this._CartService.cartNumber.next(res.numOfCartItems
      )
console.log(this._CartService.cartNumber);

    },
    error:(err)=>{
      console.log(err);

    }




  })
}
}
