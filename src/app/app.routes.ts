import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'PWA Products',
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    title: 'Detalle producto',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
