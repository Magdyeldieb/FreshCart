import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { OrdersService } from '../../core/Services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly _FormBuilder =inject(FormBuilder)
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _OrdersService =inject(OrdersService)

  cartId:string |null ="";
orders :FormGroup= this._FormBuilder.group({

  details:[null ,[Validators.required ]],
  phone:[null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city:[null ,[Validators.required ]],
})

orderSubmit():void
{
  this._OrdersService.checkOut(this.cartId,this.orders.value).subscribe({

next:(res)=>{
console.log(res);
if (res.status === 'success') {
window.open(res.session.url,'_self')   ;
}

},

error:(err)=>{
console.log(err);

}

  })
}

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({

    next:(params)=>{
  this.cartId = params.get('id')


    },
    error:(err)=>{
      console.log(err);
      
    }
  })  
}
}
