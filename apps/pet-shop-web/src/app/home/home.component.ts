import { afterNextRender, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStore } from '../stores/product.store';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  productsStore = inject(ProductStore);

  constructor(){
    afterNextRender(() => {
      this.productsStore.getThings();
    })
  }
}
