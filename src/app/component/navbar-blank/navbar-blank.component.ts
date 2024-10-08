import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss'
})
export class NavbarBlankComponent implements OnInit {
  private readonly _CartService = inject(CartService)
  readonly _AuthService = inject(AuthService)

  cartNum: number = 0;

  ngOnInit(): void {
    this.getAllCartNumber();
    this.getProductsCart();

  }

  getAllCartNumber(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNum = data
      },
    });
  }
  getProductsCart(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        this.cartNum = res.numOfCartItems


      }
    })
  }


  isScrolling: boolean = false
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolling = window.scrollY > 30;
  }
}
