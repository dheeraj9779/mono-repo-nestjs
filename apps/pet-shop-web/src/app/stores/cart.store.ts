import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "../../../../pet-shop/src/generated/prisma";
import { computed } from "@angular/core";

type CartItem = Product & {
    quantity: number;
}

type CartState = {
    items: CartItem[]
   
}

const initialState:CartState = {
    items: [],
    
}

const CART_LOCALSTORAGE_KEY = 'cart';

export const CartStore = signalStore(
    { providedIn: 'root'},
    withState(() => {
        if('localStorage' in globalThis){
            return {
                ...initialState,
                items: JSON.parse(
                    localStorage.getItem(CART_LOCALSTORAGE_KEY) ?? '[]'
                ) as CartItem[],
            }
        }
        return initialState;
    }),
    withComputed((store) => ({
           totalItems: computed(() => 
                store.items().reduce((acc, item) => {
                    return acc + item.quantity;
                }, 0)
            ),
            totalAmount: computed(() => 
                store.items().reduce((acc, item) => {
                    return acc + item.quantity * item.price;
                }, 0)
            ),
    })),
    withMethods((store) => ({

        addToCart(product: Product, quantity = 1){
            const currentItems = store.items();
            const existingItem = currentItems.find(item => item.id === product.id);
            if(existingItem){
                const updateItems = store.items().map(cartItem => {
                    if(cartItem.id === existingItem.id){
                        return {...cartItem, quantity: cartItem.quantity + quantity};
                    }
                    return cartItem;
                })
                patchState(store,{
                    items: updateItems,
                    
                })
            }
            else{
                const newItems = [...currentItems, { ...product, quantity }];
                patchState(store, {
                    items: newItems,
                   
                });
            }
            localStorage.setItem(
                CART_LOCALSTORAGE_KEY, 
                JSON.stringify(store.items()))
        },

        removeFromCart(productId: string){
            const updatedItems = store.items().filter(item => item.id !== productId);
                patchState(store, {
                    items: updatedItems,
                   
                })
                localStorage.setItem(
                CART_LOCALSTORAGE_KEY, 
                JSON.stringify(updatedItems))
            
        },

        clearCart(){
            patchState(store, {
                    items: [],
                   
            })
            localStorage.removeItem(CART_LOCALSTORAGE_KEY)
        },

        updateQuantity(productId: string, quantity: number){
            const updatedItems = store.items().map(cartItem => {
                    if(cartItem.id === productId){
                            return {...cartItem, quantity};
                    }
                    return cartItem;
                })
               
                patchState(store, {
                    items: updatedItems,
                   
                })
                localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(updatedItems))
            
        },
        
    }))
)