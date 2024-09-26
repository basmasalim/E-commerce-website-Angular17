import { Component, Input } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { DetailsComponent } from '../../pages/details/details.component';


@Component({
  selector: 'app-main-products',
  standalone: true,
  imports: [DetailsComponent, RouterLink],
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss']

})


export class MainProductsComponent {
  @Input() productList: Product[] = [];
  @Input() stockStatuses: string[] = [];

}
