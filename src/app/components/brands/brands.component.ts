import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'
import { RouterLink } from '@angular/router';
import { CutTextPipe } from '../../core/pipes/cut-text.pipe';
import { BrandsService } from '../../core/Services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CutTextPipe,NgxPaginationModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  private readonly _BrandsService = inject(BrandsService)
  constructor() { }
  brands: Ibrands[] = []


  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
        console.log('brands', res);

      },
    });
  }
 
}
