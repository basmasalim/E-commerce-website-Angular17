import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory',
  standalone: true
})
export class FilterCategoryPipe implements PipeTransform {

  transform(products: any[], searchInput: string, selectedCategoryName: string): any[] {

    // First, filter by search input
    let filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    // If selectedCategoryName is empty, return all products
    if (!selectedCategoryName || selectedCategoryName.trim() === '') {
      return filteredProducts; // Do not apply category filtering
    }

    // Filter by category if selectedCategoryName is not empty
    filteredProducts = filteredProducts.filter(product =>
      product.category.name.toLowerCase() === selectedCategoryName.toLowerCase()
    );

    return filteredProducts;
  }
}
