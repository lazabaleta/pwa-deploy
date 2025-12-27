import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://fakestoreapi.com/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((items) =>
        items.map((item, idx) => ({
          ...item,
          // Enriquecemos algunos campos para la UI
          featured: idx % 3 === 0,
          origin: ['USA', 'EU', 'ASIA'][idx % 3],
        }))
      )
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      map((item) => ({
        ...item,
        featured: true,
        origin: 'EU',
      }))
    );
  }
}
