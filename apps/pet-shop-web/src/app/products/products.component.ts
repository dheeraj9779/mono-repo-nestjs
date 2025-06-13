import { afterNextRender, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStore } from '../stores/product.store';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import untilDestroyed from '../utils/untilDestroyed';
import { CartStore } from '../stores/cart.store';
@Component({
  selector: 'app-products',
  imports: [CommonModule,ProductCardComponent,FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productsStore = inject(ProductStore);
  searchTerm:string = '';
  searchSubject = new Subject<string>();
  destroyed = untilDestroyed();
  cartStore = inject(CartStore);
  constructor(){

    //Ensure products are loaded after the component is initialized
    //This is necessary because the store might not be ready when the component is created
    //Rendered everthing on Client side
    // afterNextRender(() => {
    //   this.productsStore.loadProducts();
    // })
    this.productsStore.loadProducts();
    afterNextRender(() => {
      this.searchSubject.pipe(debounceTime(500),distinctUntilChanged(),this.destroyed()).subscribe((term: string) => {
        this.productsStore.searchProducts(term);
      })
    })
  }

  searchOProduct(term: string) {
    this.searchSubject.next(term);
  }
}
