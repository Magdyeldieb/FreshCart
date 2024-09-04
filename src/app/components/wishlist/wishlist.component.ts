import { Component, inject, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/Services/cart.service';
import { WishlistService } from '../../core/Services/wishlist.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CutTextPipe } from '../../core/pipes/cut-text.pipe';
import { ProductsService } from '../../core/Services/products.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe,NgClass],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null,null)
private readonly _WishlistService = inject(WishlistService)
private readonly _ProductsService =inject(ProductsService)

  products: Iproduct[] = [];
  wishListData: string = "";

  addProduct(id: any, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true')
    this._CartService.addProductToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled')
      }
    });
  }

  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this.products = response.data;
        const newData = response.data.map((item: any) => item._id)
        this.wishListData = newData;
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
        this._WishlistService.wishListNumber.next(response.data.length);

        const newProdData = this.products.filter((item: any) => this.wishListData.includes(item._id));

        this.products = newProdData;
      }
    })
  }

}
