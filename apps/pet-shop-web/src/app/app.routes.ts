import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
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
    }
];
