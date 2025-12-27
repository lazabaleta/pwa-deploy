import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridComponent {
  @Input() products: Product[] = [];
  @Output() open = new EventEmitter<number>();

  readonly displayedColumns = ['title', 'category', 'price', 'rating', 'origin'];

  onRowClick(id: number): void {
    this.open.emit(id);
  }
}
