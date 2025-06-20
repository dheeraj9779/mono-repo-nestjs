import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStore } from '../../stores/order.store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderDetailComponent } from '../../orders/components/order-detail/order-detail.component';
import { CartStore } from '../../stores/cart.store';

@Component({
  selector: 'app-checkout-success',
  imports: [CommonModule,RouterLink,OrderDetailComponent],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss',
})
export class CheckoutSuccessComponent implements OnInit{
  orderStore = inject(OrderStore);
  activatedRoute = inject(ActivatedRoute);
  cartStore = inject(CartStore)

  constructor(){
    afterNextRender(() => {
      this.cartStore.clearCart();
    })
  }

  ngOnInit(){
    const orderId = this.activatedRoute.snapshot.queryParamMap.get('orderId');
    if(!orderId){
      this.orderStore.setError('No Order Id found !!');
      return;
    }
    this.orderStore.getOrder(orderId).subscribe();
  }
}
