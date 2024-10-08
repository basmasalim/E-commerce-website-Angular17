import { Component, inject, OnInit } from '@angular/core';
import { MainProductsComponent } from '../main-products/main-products.component';
import { FilterCategoryPipe } from '../../core/pipes/filter-category.pipe';
import { Product } from '../../core/interfaces/product';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [MainProductsComponent, FilterCategoryPipe, NgFor],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  productList: Product[] = [];
  StockStatusList: string[] = [];

  searchInput: string = '';
  selectedCategoryName: any = '';
  categoryName: null | string = '';

  specificCategory: any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('name'));

        let categoryId = p.get('id')
        this.categoryName = p.get('name');

      },
    });
  }




  setStockStatusBasedOnQuantity(): void {
    this.StockStatusList = this.productList.map(product =>
      (product.quantity ?? 0) > 0 ? 'In Stock' : 'Out Of Stock'
    );
  }


}
