import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { Product } from '../../core/interfaces/product';
import { FilterCategoryPipe } from '../../core/pipes/filter-category.pipe';
import { FormsModule } from '@angular/forms';
import { MainProductsComponent } from '../../component/main-products/main-products.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MainProductsComponent, FilterCategoryPipe, FormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

  @ViewChild('imgShowcase') imgShowcase!: ElementRef;

  getSpecificProductsSub!: Subscription;
  getAllProductSub!: Subscription;

  StockStatusList: string[] = [];
  productImages: string[] = [];
  discountRate: string | null = null;
  images: string[] = [];


  productList: Product[] = [];
  detailsProduct: Product | null = null;

  imgId: number = 1;
  searchInput: string = '';
  selectedCategoryName: any = '';


  ngOnInit(): void {
    this.displaySpecificProducts();
    this.displayAllProducts();
  }

  displaySpecificProducts(): void {
    this.getSpecificProductsSub = this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        const idProduct = p.get('id');
        if (idProduct) {
          this._ProductsService.getSpecificProducts(idProduct).subscribe({
            next: (res) => {
              this.detailsProduct = res.data;
              if (this.detailsProduct) {
                this.images = [...this.detailsProduct.images];
                if (this.detailsProduct.imageCover) {
                  this.images.push(this.detailsProduct.imageCover);
                }
              }
            },
            error: (err) => {
              console.error(err);
            }
          });
        }
      }
    });
  }

  displayAllProducts(): void {
    this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res.data
        this.setStockStatusBasedOnQuantity();
      },
      error: (err) => {
        console.log(err);
        console.error('DetailsComponent:', this.detailsProduct);

      }
    });
  }

  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
    this.getSpecificProductsSub?.unsubscribe();
  }

  setStockStatusBasedOnQuantity(): void {
    this.StockStatusList = this.productList.map(product =>
      (product.quantity ?? 0) > 0 ? 'In Stock' : 'Out Of Stock'
    );
  }

  // Called when an image thumbnail is clicked
  onImageClick(index: number): void {
    this.imgId = index + 1;
    this.slideImage();
  }

  // Handles the sliding of images
  slideImage(): void {
    if (this.imgShowcase && this.imgShowcase.nativeElement) {
      const displayWidth = this.imgShowcase.nativeElement
        .querySelector('img')
        .clientWidth;
      this.imgShowcase.nativeElement.style.transform = `translateX(${-(this.imgId - 1) * displayWidth}px)`;
    }
  }

  @HostListener('window:resize') onWindowResize(): void {
    this.slideImage();
  }

  calculateDiscountPercentage(): string | null {
    if (this.detailsProduct) {
      const oldPrice = this.detailsProduct.price;
      const newPrice = this.detailsProduct.priceAfterDiscount;

      if (oldPrice !== undefined && newPrice !== undefined && oldPrice > 0) {
        const discount = ((oldPrice - newPrice) / oldPrice) * 100;
        return discount.toFixed(2);
      }
    }
    return null;
  }

}
