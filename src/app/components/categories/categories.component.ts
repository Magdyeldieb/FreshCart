import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Icategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/Services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  private readonly _CategoriesService = inject(CategoriesService)
  
  categoryData:Icategory[]=[];
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(response)=>{
        console.log(response);
        
        this.categoryData=response.data;


      }
    })
   }

}
