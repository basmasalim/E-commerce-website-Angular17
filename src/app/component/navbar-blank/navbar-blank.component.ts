import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss'
})
export class NavbarBlankComponent {
  readonly _AuthService = inject(AuthService)

  isScrolling: boolean = false
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolling = window.scrollY > 30;
  }
}
