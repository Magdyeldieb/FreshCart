import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/Services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/Services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CutTextPipe } from '../../core/pipes/cut-text.pipe';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/Services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,CutTextPipe,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService= inject(ToastrService)
  private readonly _CartService = inject(CartService)

  productData : Iproduct [] = [] ;
  wishListData: string[] = [];




  ngOnInit(): void {

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id)
        this.wishListData = newData;
        console.log(response, 'd');
      }
    });

    this._ProductsService.getAllProduct().subscribe({
      next:(response)=>{
        console.log(response);
        this.productData=response.data; 
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

  addProduct(id:string):void {
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
