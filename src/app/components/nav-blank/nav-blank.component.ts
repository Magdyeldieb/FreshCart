import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../core/Services/auth-service.service';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/Services/mytranslate.service';
import { CartService } from '../../core/Services/cart.service';
import { WishlistService } from '../../core/Services/wishlist.service';


@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

 readonly _AuthServiceService = inject (AuthServiceService)
 private readonly _MytranslateService = inject (MytranslateService)
 readonly _TranslateService = inject(TranslateService)
 private readonly _CartService = inject(CartService)
 private readonly _WishlistService = inject(WishlistService)


 countNumber:number = 0;
 wishListNum:number=0;

 

 ngOnInit(): void {

  
  

  this._WishlistService.wishListNumber.subscribe({
    next:(num)=>{
     console.log(num);
     this.wishListNum=num;
          
    }
  });
  this._WishlistService.getWishList().subscribe({
    next:(response)=>{
      this.wishListNum=response.count;
      console.log(response);

    }
  });

  this._CartService.cartNumber.subscribe({
    next:(num)=>{
      this.countNumber = num},
    
  })

this._CartService.getProductsCart().subscribe({

  next:(res)=>{
this.countNumber=res.numOfCartItems


  }
})



 }


 change(lang:string):void {

  this._MytranslateService.changeLang(lang)


 }

}




