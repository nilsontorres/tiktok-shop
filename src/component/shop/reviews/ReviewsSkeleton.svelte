<script>
    import ProductFooter from "$component/shop/product/ProductFooter.svelte";
    import ReviewsHeader from "$component/shop/reviews/ReviewsHeader.svelte";

    let { review, store, product, shipping, price, updatePage=()=>{} } = $props();
</script>

<div class="w-full h-dvh bg-[#F5F5F5] relative">
    <ReviewsHeader {product} {store} {updatePage}/>
    <main class="flex flex-col justify-center items-center w-full h-full bg-white relative">
        <div class="relative -left-[12px] -top-[6px] z-20">
            <span class="absolute w-3 h-3 rounded-full bg-cyan-300 mix-blend-darken animate-revolve"></span>
            <span class="absolute w-3 h-3 rounded-full bg-red-500 mix-blend-darken animate-revolve [animation-delay:-0.4s]"></span>
        </div>
    </main>
    <ProductFooter {product} {price} {shipping} {updatePage}/>
</div>