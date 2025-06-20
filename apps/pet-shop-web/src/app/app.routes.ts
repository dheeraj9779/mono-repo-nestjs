import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadComponent: async () => {
            const comp = await import('./home/home.component');
            return comp.HomeComponent;
        }
    },
    {
        path: 'products',
        loadComponent: async () => {
            const comp = await import('./products/products.component');
            return comp.ProductsComponent;
        }
    },
    {
        path: 'cart',
        loadComponent: async () => {
            const comp = await import('./cart/cart.component');
            return comp.CartComponent;
        }
    },
    {
        path: 'checkout',
        loadComponent: async () => {
            const comp = await import('./checkout/checkout.component');
            return comp.CheckoutComponent;
        }
    },
    {
        path: 'checkout/cancel',
        loadComponent: async () => {
            const comp = await import('./checkout/checkout-failure/checkout-failure.component');
            return comp.CheckoutFailureComponent;
        }
    },
    {
        path: 'checkout/success',
        loadComponent: async () => {
            const comp = await import('./checkout/checkout-success/checkout-success.component');
            return comp.CheckoutSuccessComponent
        }
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
