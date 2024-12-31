import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent), title: 'FreshCart-Login' },
      { path: 'register', loadComponent: () => import('./pages/register/register.component').then((c) => c.RegisterComponent), title: 'FreshCart-Register' },
      { path: 'verifyEmail', loadComponent: () => import('./pages/forgot-password/verify-email/verify-email.component').then((c) => c.VerifyEmailComponent), title: 'FreshCart-VerifyEmail' },
      { path: 'verifyCode', loadComponent: () => import('./pages/forgot-password/verify-code/verify-code.component').then((c) => c.VerifyCodeComponent), title: 'FreshCart-VerifyCode' },
      { path: 'resetPassword', loadComponent: () => import('./pages/forgot-password/reset-password/reset-password.component').then((c) => c.ResetPasswordComponent), title: 'FreshCart-ResetPassword' },
    ]
  },
  {
    path: '', component: BlankLayoutComponent, canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'FreshCart-Home' },
      { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then((c) => c.CartComponent), title: 'FreshCart-Cart' },
      { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then((c) => c.BrandsComponent), title: 'FreshCart-Brands' },
      { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then((c) => c.CategoriesComponent), title: 'FreshCart-Categories' },
      { path: 'specificCategory/:id', loadComponent: () => import('./component/specific-category/specific-category.component').then((c) => c.SpecificCategoryComponent), title: 'FreshCart-SpecificCategory' },
      { path: 'SpecificBrand/:id', loadComponent: () => import('./component/specific-brand/specific-brand.component').then((c) => c.SpecificBrandComponent), title: 'FreshCart-SpecificBrand' },
      { path: 'products', loadComponent: () => import('./pages/products/products.component').then((c) => c.ProductsComponent), title: 'FreshCart-Products' },
      { path: 'favourite', loadComponent: () => import('./pages/wishlist/wishlist.component').then((c) => c.WishlistComponent), title: 'FreshCart-Favourite' },
      { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then((c) => c.DetailsComponent), title: 'FreshCart-DetailsProduct' },
      { path: 'allorders', loadChildren: () => import('./pages/allorders/allorders.component').then((c) => c.AllordersComponent), title: 'FreshCart-Allorders' },
      { path: 'payment/:id', loadComponent: () => import('./pages/payment/payment.component').then((c) => c.PaymentComponent), title: 'FreshCart-Payment' },
      { path: 'specifcOrder/:id', loadComponent: () => import('./pages/specific-order/specific-order.component').then((c) => c.SpecificOrderComponent), title: 'FreshCart-SpecifcOrder' },
    ]
  },
  { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then((c) => c.NotfoundComponent) },
];
