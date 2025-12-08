import { setContext, getContext } from 'svelte';

class ProductState {
    id = $state();
    slug = $state();
    title = $state();
    description = $state();
    badge = $state();
    rating = $state();
    total_reviews = $state();
    total_sales = $state();
    flash_sale = $state();
    images = $state();
    prices = $state();
    coupons = $state();
    tags = $state();
    variations = $state();
    saved = $state();
    quantity = $state();
    store = $state({});

    videos = $state();
    reviews = $state();

    async loadProduct(id, callback=()=>{}){
        const request = await fetch("/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        if(request.status === 200){
            const response = await request.json();
            this.id = response.id;
            this.slug = response.slug;
            this.title = response.title;
            this.description = response.description;
            this.badge = response.badge;
            this.rating = response.rating;
            this.flash_sale = response.flash_sale;
            this.images = response.images;
            this.prices = response.prices;
            this.tags = response.tags;
            this.coupons = response.coupons;
            this.variations = response.variations;
            this.total_reviews = response.total_reviews;
            this.total_sales = response.total_sales;
            this.is_saved = false;
            this.quantity = 1;

            this.store.id = response.store.id;
            this.store.title = response.store.title;
            this.store.total_reviews = response.store.total_reviews;
            this.store.total_sales = response.store.total_sales;
            this.store.image = response.store.image;

            console.log(this.coupons);
        }

        callback();
    }

    async loadStoreProducts(callback=()=>{}){
        const request = await fetch("/api/store/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: this.store?.id })
        });

        if(request.status === 200){
            const response = await request.json();
            this.store.products = response.products;
        }

        callback();
    }

    incrementQuantity(){
        this.quantity = Math.min(this.quantity + 1, 10);
    }

    decrementQuantity(){
        this.quantity = Math.max(this.quantity - 1, 1);
    }

    toggleSaved(){
        this.saved = !this.saved;
    }
}

export const initProductState = () => {
    const state = new ProductState();
    setContext("product", state);
    return state;
}

export const useProductState = () => {
    const state = getContext("product");
    return state;
}