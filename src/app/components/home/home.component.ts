import { ChangeDetectionStrategy, Component, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../base/product-card/product-card.component';
import { ProductGridComponent } from '../base/product-grid/product-grid.component';

type ViewMode = 'cards' | 'table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ProductCardComponent,
    ProductGridComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  protected readonly loading = signal<boolean>(true);
  protected readonly products = signal<Product[]>([]);
  protected readonly viewMode = signal<ViewMode>('cards');
  protected readonly totalProducts: Signal<number> = computed(
    () => this.products().length
  );

  ngOnInit(): void {
    this.loadProducts();
  }

  setView(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  openDetail(id: number): void {
    this.router.navigate(['/product', id]);
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.productService.getProducts().subscribe({
      next: (items) => {
        this.products.set(items);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
