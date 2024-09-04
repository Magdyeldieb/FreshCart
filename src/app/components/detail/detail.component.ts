import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/Services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/Services/cart.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../core/Services/wishlist.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CarouselModule,CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _ProductsService =inject(ProductsService)
  private readonly _CartService = inject(CartService)
private readonly _ToastrService= inject(ToastrService)
private readonly _WishlistService = inject(WishlistService)

  detailsProduct:Iproduct | null = null ;
  productsList:Iproduct  ={} as Iproduct;
  product:Iproduct []= []
  wishListData: string[] = [];
  customOptionsPro: OwlOptions = {
    loop: true,
    rtl:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    navSpeed: 700,
    items:1,
    nav: false,
  }

  ngOnInit(): void {

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id)
        this.wishListData = newData;
        console.log(response, 'd');
      }
    });


      this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          let idProduct  = p.get('id');

          this._ProductsService.getSpecificProducts(idProduct).subscribe({

            next:(res)=>{

              console.log(res.data);
              this.detailsProduct =res.data ;
            },
            error:(err)=>{
              console.log(err);

            }
          })

        }
      })
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

  }
