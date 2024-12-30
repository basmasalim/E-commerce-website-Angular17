import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss'
})
export class NavbarBlankComponent implements OnInit {
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  readonly _AuthService = inject(AuthService)

  cartNum: number = 0;
  wishNum: number = 0;

  ngOnInit(): void {
    this.getAllCartNumber();
    this.getProductsCart();
    this.getAllWishlistNumber();
    this.getProductsWishlist();
  }

  getAllCartNumber(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNum = data
      },
    });
  }

  getAllWishlistNumber(): void {
    this._WishlistService.favNumber.subscribe({
      next: (data) => {
        this.wishNum = data
      }
    })
  }
  getProductsCart(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        this.cartNum = res.numOfCartItems
      }
    })
  }

  getProductsWishlist(): void {
    this._WishlistService.getProductsWishlist().subscribe({
      next: (res) => {
        this.wishNum = res.data.length
      }
    })
  }

  isScrolling: boolean = false
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolling = window.scrollY > 30;
  }
}
