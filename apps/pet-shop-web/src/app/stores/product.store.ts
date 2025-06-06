import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../../../../pet-shop/src/generated/prisma';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs';


const GET_PRODUCTS = gql`
    query GetProducts {
        products {
            id
            name
            description
            price
            image
            stripePriceId
        }
    }
`

export interface ProductState{
    products: Product[];
    featuredProducts: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    featuredProducts: [],
    loading: false,
    error: null
};

export const ProductStore = signalStore(
 
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    loadProducts() {
        patchState(store, { loading: true, error: null });
        apollo.watchQuery<{ products: Product[] }>({
            query: GET_PRODUCTS
        }).valueChanges.pipe(
            tap({
                next: ({data}) => patchState(
                    store,
                    {products: data.products, loading: false, error: null}
                ),
                error: (err) => patchState(
                    store, 
                    { error: err.message, loading: false })
            })
        ).subscribe();
    },
    getThings(){
        return console.log('getThings called');
    }
  }))
);