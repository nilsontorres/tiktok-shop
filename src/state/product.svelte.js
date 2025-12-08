import { setContext, getContext } from 'svelte';

class ProductState {
    id = $state();
    slug = $state();
    title = $state();
    description = $state();
    badge = $state();
    rating = $state();
    flash_sale = $state();
    store = $state();
    images = $state([]);
    prices = $state([]);
    tags = $state([]);
    coupons = $state([]);
    videos = $state([]);
    reviews = $state([]);
    variations = $state([]);
    total_reviews = $state();
    total_sales = $state();
    saved = $state();
    quantity = $state();

    async loadProduct(slug, callback=()=>{}){
        const request = await fetch("/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ slug })
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
            this.store = response.store;
            this.images = response.images;
            this.prices = response.prices;
            this.tags = response.tags;
            this.coupons = response.coupons;
            this.videos = response.videos;
            this.reviews = response.reviews;
            this.variations = response.variations;
            this.total_reviews = response.total_reviews;
            this.total_sales = response.total_sales;
            this.is_saved = false;
            this.quantity = 1;
        }

        callback();
    }

    async loadStore(id, callback=()=>{}){
        const request = await fetch("/api/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        if(request.status === 200){
            const response = await request.json();
            this.store = {
                id: response.id,
                title: response?.title,
                reviews: response?.reviews,
                sales: response?.sales,
                image: response?.image,
                products: response?.products
            }
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