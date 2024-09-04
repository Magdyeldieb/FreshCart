import { resolve } from 'node:path';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/Services/orders.service';
import { IallOrders } from '../../core/interfaces/iall-orders';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

private readonly _OrdersService = inject(OrdersService)

allorder:IallOrders = {} as IallOrders

  ngOnInit(): void {
     
    this._OrdersService.getAllOrders().subscribe({
      next:(res)=>{
        this.allorder = res.data
        console.log(res.data);
        
      }
    })
  }

}
