import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/Services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
private readonly _CartService=inject(CartService)
private readonly _ToastrService=inject(ToastrService)


cartDetails:Icart ={} as Icart

ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
next:(res)=>{
  console.log(res.data);
  this.cartDetails = res.data

},
error:(err)=>{
  console.log(err);
}
    })
}

removeItem(id:string):void {
  this._CartService.deleteSpecificCartItem(id).subscribe({
next:(res)=>{

  console.log(res);
  this.cartDetails= res.data;
  this._CartService.cartNumber.next(res.numOfCartItems)
},

error:(err)=>{
  console.log(err);

}



  })
}

updateCount(id:string , count:number):void{
 if (count > 0) {
  this._CartService.updateProductQuantity(id , count).subscribe({

    next:(res)=>{
      this._ToastrService.success(res.message,'FreshCartProduct')
console.log(res);
      this.cartDetails= res.data
    },
    error:(err)=> {
        console.log(err);

    },


  })
 }
 else{
  this.removeItem(id)
 }
}

clearItems(): void {
  this._CartService.clearCart().subscribe({
    next:(res)=>{console.log(res);
    if(res.message == "success"){

this.cartDetails = {} as Icart;
this._CartService.cartNumber.next(0)
    }
    },
    error:(err)=>{
      console.log(err);

    }
  })
}

}
