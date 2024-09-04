import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Icategory } from '../../core/interfaces/icategory';
import { ProductsService } from '../../core/Services/products.service';
import { CategoriesService } from '../../core/Services/categories.service';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit {


  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CategoriesService= inject(CategoriesService)


  categoryId: string | null='';
  categoryDetails:Icategory ={} as Icategory
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let categoryId = params.get('id')

        this._CategoriesService.getSpecificCategory(categoryId).subscribe({
          next:(response)=>{
            console.log(response);

            this.categoryDetails=response.data;}
        })

      }
    })
    }
  }




