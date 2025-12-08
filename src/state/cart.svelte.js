import { setContext, getContext } from 'svelte';

class CartState {
    items = $state([]);
    coupons = $state([]);

    price = $state({
        regular: 0,
        promotional: 0,
        coupon: 0
    });

    length = $derived(this.items.length);

    addItemToCart(product){
        this.items.push(product);

        this.price.regular += product.price.regular;
        this.price.promotional += product.price.promotional;
    }

    removeItemFromCart(id){
        let index = this.items.findIndex(item => item.id == id);
        let product = this.items[index];

        this.price.regular -= product.price.regular;
        this.price.promotional -= product.price.promotional;

        this.items.slice(index, index+1);
    }

    applyCoupon(product, coupon){
        this.coupons.push(coupon);

        this.price.coupon += coupon.type == "variable" ? coupon.discount * product.price.promotional : coupon.discount;
    }
}

export const initCartState = () => {
    const state = new CartState();
    setContext("cart", state);
    return state;
}

export const useCartState = () => {
    const state = getContext("cart");
    return state;
}