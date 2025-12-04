<script>
    import { onMount } from "svelte";
    import { formatNumber } from "$lib/formating";
    import { getLowestPrice } from "$lib/prices";
    
    import FooterBar from "$component/shop/navigations/FooterBar.svelte";
    import HeaderBar from "$component/shop/navigations/HeaderBar.svelte";
    import TagSlider from "$component/shop/tags/TagSlider.svelte";
    import ImageModal from "$component/shop/images/ImageModal.svelte";
    import VideosSlider from "$component/shop/videos/VideosSlider.svelte";
    import ProductDescription from "$component/shop/product/DescriptionSection.svelte";
    import ShopSkeleton from "$component/shop/ShopSkeleton.svelte";
    import SuggestedProduct from "$component/shop/suggestions/SuggestedProduct.svelte";
    import PromotionsSection from "$component/shop/promotions/PromotionsSection.svelte";
    import CouponSection from "$component/shop/coupons/CouponSection.svelte";
    import ShippingSection from "$component/shop/shipping/ShippingSection.svelte";
    import ReviewsSection from "$component/shop/reviews/ReviewsSection.svelte";
    import StoreSection from "$component/shop/store/StoreSection.svelte";
    import VariationsSection from "$component/shop/variations/VariationsSection.svelte";
    import PriceSection from "$component/shop/prices/PriceSection.svelte";
    import ImagesSection from "$component/shop/product/ImagesSection.svelte";
    import TitleSection from "$component/shop/product/TitleSection.svelte";
    import ProtetionsSection from "$component/shop/protetions/ProtetionsSection.svelte";
    import DescriptionSection from "$component/shop/product/DescriptionSection.svelte";

    let { slug } = $props();

    let ready = $state(false);
    let drawers = $state({});
    let scroll_y = $state(0);

    let variations = $state([]);
    let countries = $state([]);
    let images = $state([]);
    let coupons = $state([]);
    let product = $state({});
    let store = $state({});
    let tags = $state([]);
    let promotions = $state([]);
    let videos = $state([]);
    let reviews = $state([]);
    let saved = $state(false);

    let shipping = $state({
        amount: 47.00,
        total: 27.00,
        location: {
            country: countries?.find(country => country.code == "BR")
        },
        discount: {
            amount: 20.00,
            description: "Desconto de R$ 20 no frete em pedidos acima de R$ 29"
        },
        deadline: {
            from: 19,
            to: 28,
            month: "dez"
        }
    });

    let price = $derived(getLowestPrice(product?.prices));
    let quantity = $state(1);
    let cart = {
        items: [],
        price: {
            regular: 0,
            promotional: 0,
            coupons: 0
        }
    }

    const updateScroll = (e) => {
        scroll_y = window.scrollY;
    }
    const openDrawer = (name) => {
        for (const name in drawers){
            drawers[name]?.closeDrawer();
        }
        drawers[name]?.openDrawer();
    }
    const closeDrawer = (name) => {
        drawers[name]?.closeDrawer();
    }
    const saveProduct = () => {
        saved = !saved;
    }
    const incrementQuantity = () => {
        quantity += 1;
        if(quantity > 10){
            quantity = 10;
        }
    }
    const decrementQuantity = () => {
        quantity -= 1;
        if(quantity < 1){
            quantity = 1;
        }
    }
    const updateVariant = (new_variant) => {
        variations?.forEach((variation, i) => {
            variation?.variants.forEach((variant, j) => {
                if(variant.variation.id == new_variant.variation.id){
                    variations[i].variants[j].selected = false;
                }
                if(variant.id == new_variant.id){
                    variations[i].variants[j].selected = !variations[i].variants[j].selected;
                }
            });
        });
    }

    onMount(async () => {
        const request = await fetch("/api/shop", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                slug: slug
            })
        });

        if(request.status === 200){
            const response = await request.json();
            
            variations = response.variations;
            countries = response.countries;
            images = response.images;
            coupons = response.coupons;
            product = response.product;
            store = response.store;
            tags = response.tags;
            promotions = response.promotions;
            videos = response.videos;
            reviews = response.reviews;

            ready = true;
        }
    });
</script>


<svelte:window onscroll={updateScroll}></svelte:window>
<svelte:head>
    <link rel="preload" as="image" href="/images/bg-protecao-1.jpg" />
    <link rel="preload" as="image" href="/images/bg-shipping-1.jpg" />
    {#each images as image}
        <link rel="preload" as="image" href={image.source} />
    {/each}
    {#each variations as variation}
        {#if variation.type == "image"}
            {#each variation.variants as variant}
                <link rel="preload" as="image" href={variant.media.source} />   
            {/each}
        {/if}
    {/each}
</svelte:head>

<ShopSkeleton show={!ready}/>

<div class="w-full h-full bg-[#F8F8F8]">
    <ImageModal images={images}/>
    <HeaderBar scroll={scroll_y}/>

    <main class="flex flex-col mt-12 mb-16 no-selectable">
        <ImagesSection {images}/>
        <PriceSection {product} {price}/>
        <div class="flex flex-col px-4 pt-[0.65rem] pb-[0.85rem] bg-white">
            <div class="flex items-center gap-[0.35rem]">
                <svg class="min-w-4 max-w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 45 39">
                    <path fill="#202020" d="M35 19c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10Zm6-19c3 0 3 2.5 3 4.5v13.825c-1.112-.872-1.978-1.646-4-2.325v-3H4v17h17c.18 2.197.423 2.947 1 4H3.5C1 34 0 32.5 0 30V3.5C0 1.5 1 0 3 0h38Zm-4.5 24c0-2-3.5-2-3.5 0v6l5 2.5c2 1 4-1.5 1.5-3l-3-1.5v-4ZM4 9h36V4H4v5Z"/>
                </svg>
                <span class="text-black text-[0.775rem] leading-none">5x R$ 6,02</span>
                <span class="text-[#F2204C] text-[0.775rem] font-medium">Sem juros</span>
                <svg class="min-w-[0.33rem] max-w-[0.33rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                    <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
                </svg>
            </div>
            <CouponSection {coupons}/>
            <TitleSection {product}/>
            <div class="flex items-center gap-[0.3rem] mt-[0.5rem]">
                <svg class="min-w-[0.96rem] max-w-[0.96rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                    <path fill="#ffc628" d="M18.8 3c1.5-4 4.5-4 6 0l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3l-10-6.5s-6.493 4.567-9.5 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1 4-10.5Z"/>
                </svg>
                <span class="text-black text-[0.75rem] leading-none">{product?.rating}</span>
                <span class="text-[#2B5DB9] text-[0.75rem] leading-none">({formatNumber(product?.reviews).pt})</span>
                <svg class="min-w-[0.08rem] max-w-[0.08rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 3 24">
                    <path fill="#E0E0E0" d="M0 0h3v24H0z"/>
                </svg>              
                <div class="flex items-center gap-[0.2rem]">
                    <span class="text-black text-[0.75rem] leading-none">{formatNumber(product?.sales).en}</span>
                    <span class="text-[#595959] text-[0.75rem] leading-none">vendidos</span>
                </div>
            </div>
            <div class="flex w-full justify-between items-center gap-[0.3rem] mt-[0.4rem]">
                <TagSlider tags={tags}/>
            </div>
            <span class="w-full h-[0.053rem] bg-[#efefef] mt-[0.6rem]"></span>
            <ShippingSection {shipping}/>
            <span class="w-full h-[0.053rem] bg-[#efefef] mt-[0.9rem]"></span>
            <VariationsSection {variations} onIncrementQuantity={incrementQuantity} onDecrementQuantity={decrementQuantity} onChangeVariant={updateVariant}/>
        </div>
        <ProtetionsSection/>
        <div class="w-full h-[0.5rem]"></div>
        <PromotionsSection {coupons} {countries}/>
        <div class="w-full h-[0.5rem] mt-[0.1rem]"></div>
        <button type="button" class="flex flex-col py-[1.1rem] bg-white">
            <div class="flex justify-between items-center px-4">
                <span class="text-black text-[0.93rem] font-semibold leading-none">Vídeos de criadores ({videos?.length})</span>
            </div>
            <div class="flex w-full overflow-hidden items-center mt-[1rem]">
                <VideosSlider videos={videos}/>
            </div>
        </button>
        <div class="w-full h-[0.5rem] mt-[0.1rem]"></div>
        <ReviewsSection {reviews} {product} {store}/>
        <div class="w-full h-[0.5rem] mt-[0.1rem]"></div>
        <StoreSection {store}/>
        <div class="w-full h-[0.5rem] mt-[0.1rem]"></div>
        <DescriptionSection {product}/>
        <div class="flex flex-col py-[1rem] mt-[0.5rem]">
            <div class="flex justify-between items-center px-4 ms-[0.5rem]">
                <span class="text-black text-[0.93rem] font-semibold leading-none">Você também pode gostar</span>
            </div>
            <div class="w-full px-4 mt-[1.25rem]">
                <div class="flex flex-wrap w-full relative gap-[0.55rem]">
                    {#each store?.products as product}
                        <SuggestedProduct product={product}/>
                    {/each}
                </div>
            </div>
        </div>
    </main>
    <FooterBar price={price}/>
</div>