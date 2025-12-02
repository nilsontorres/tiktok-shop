<script>
    import { onMount } from "svelte";
    import { formatNumber, formatPrice } from "$lib/formating";
    import { months } from "$lib/datetime";
    
    import CouponsSlider from "$component/shop/coupons/CouponsSlider.svelte";
    import FooterBar from "$component/shop/navigations/FooterBar.svelte";
    import HeaderBar from "$component/shop/navigations/HeaderBar.svelte";
    import ImageSlider from "$component/shop/images/ImageSlider.svelte";
    import PromotionSlider from "$component/shop/promotions/PromotionSlider.svelte";
    import TagSlider from "$component/shop/tags/TagSlider.svelte";
    import ProtetionDrawer from "$component/shop/drawers/ProtetionDrawer.svelte";
    import VariationDrawer from "$component/shop/drawers/VariationDrawer.svelte";
    import ShippingDrawer from "$component/shop/drawers/ShippingDrawer.svelte";
    import LocationDrawer from "$component/shop/drawers/LocationDrawer.svelte";
    import ImageModal from "$component/shop/images/ImageModal.svelte";
    import VideosSlider from "$component/shop/videos/VideosSlider.svelte";
    import ElevenElevenBadge from "$component/shop/badges/ElevenElevenBadge.svelte";
    import BlackFridayBadge from "$component/shop/badges/BlackFridayBadge.svelte";
    import CyberMondayBadge from "$component/shop/badges/CyberMondayBadge.svelte";
    import ProductSlider from "$component/shop/store/ProductSlider.svelte";
    import ReviewsList from "$component/shop/reviews/ReviewsList.svelte";
    import RatingStars from "$component/shop/reviews/RatingStars.svelte";
    import ProductDescription from "$component/shop/product/ProductDescription.svelte";
    import ProductPage from "$component/skeletons/ProductPage.svelte";
    import SuggestedProducts from "$component/shop/suggestions/SuggestedProducts.svelte";
    import LightningPrice from "$component/shop/prices/LightningPrice.svelte";
    import NormalPrice from "$component/shop/prices/NormalPrice.svelte";

    let { slug } = $props();

    let ready = $state(false);
    let protetion_drawer = $state(false);
    let variation_drawer = $state(false);
    let shipping_drawer = $state(false);
    let location_drawer = $state(false);
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

    let quantity = $state(1);

    const updatePageScrollY = (e) => {
        scroll_y = window.scrollY;
    }
    const openProtetionDrawer = () => {
        protetion_drawer = true;
        document.body.style.overflow = "hidden";
    }
    const closeProtetionDrawer = () => {
        protetion_drawer = false;
        document.body.style.overflow = "";
    }
    const openVariationDrawer = () => {
        variation_drawer = true;
        document.body.style.overflow = "hidden";
    }
    const closeVariationDrawer = () => {
        variation_drawer = false;
        document.body.style.overflow = "";
    }
    const openShippingDrawer = () => {
        shipping_drawer = true;
        document.body.style.overflow = "hidden";
    }
    const closeShippingDrawer = () => {
        shipping_drawer = false;
        document.body.style.overflow = "";
    }
    const openLocationDrawer = () => {
        location_drawer = true;
        shipping_drawer = false;
        document.body.style.overflow = "hidden";
    }
    const closeLocationDrawer = () => {
        location_drawer = false;
        document.body.style.overflow = "";
    }
    const saveProduct = () => {
        saved = !saved;
    }
    const incrementOrderQuantity = () => {
        quantity += 1;
        if(quantity > 10){
            quantity = 10;
        }
    }
    const decrementOrderQuantity = () => {
        quantity -= 1;
        if(quantity < 1){
            quantity = 1;
        }
    }
    const changeProductVariant = (new_variant) => {
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
    const changeLocationCity = (value) => {
        shipping.location.city = value;
        if(shipping.location?.region && shipping.location?.country){
            closeLocationDrawer();
            openShippingDrawer();
        }
    }
    const changeLocationRegion = (value) => {
        shipping.location.region = value;
    }
    const changeLocationCountry = (value) => {
        shipping.location.country = value;
    }
    const initialize = async () => {
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
    }

    onMount(async () => {
        initialize();
    });
</script>


<svelte:window onscroll={updatePageScrollY}></svelte:window>
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

<ProtetionDrawer
    open={protetion_drawer}
    onCloseDrawer={closeProtetionDrawer}
/>
<VariationDrawer
    open={variation_drawer}
    variations={variations}
    quantity={quantity}
    onCloseDrawer={closeVariationDrawer}
    onIncrementQuantity={incrementOrderQuantity}
    onDecrementQuantity={decrementOrderQuantity}
    onChangeVariant={changeProductVariant}
/>
<ShippingDrawer
    open={shipping_drawer}
    shipping={shipping}
    onCloseDrawer={closeShippingDrawer}
    onOpenLocationDrawer={openLocationDrawer}/>
<LocationDrawer
    open={location_drawer}
    shipping={shipping}
    onCloseDrawer={closeLocationDrawer}
    onChangeCity={changeLocationCity}
    onChangeRegion={changeLocationRegion}
    onChangeCountry={changeLocationCountry}
/>

<ProductPage show={!ready}/>
<div class="w-full h-full bg-[#F8F8F8]">
    <ImageModal images={images}/>
    <HeaderBar scroll={scroll_y}/>

    <main class="flex flex-col mt-12 mb-16 no-selectable">
        <div class="w-full">
            <ImageSlider images={images}/>
        </div>
        {#if product.lightning}
            <LightningPrice prices={product?.prices} expiration={product.lightning}/>
        {:else}
            <NormalPrice prices={product?.prices}/>
        {/if}
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
            <div class="flex w-full justify-between items-center gap-[0.3rem] mt-[0.3rem]">
                <CouponsSlider coupons={coupons}/>
            </div>
            <div class="flex justify-between itens-start mt-[0.35rem]">
                <div class="inline leading-[1.3rem]">
                    {#if product?.badge == "eleven-eleven"}
                        <div class="inline-flex items-center align-middle pb-[0.1rem]">
                            <ElevenElevenBadge size={0.9}/>
                        </div>
                    {:else if product?.badge == "black-friday"}
                        <div class="inline-flex items-center align-middle pb-[0.1rem]">
                            <BlackFridayBadge size={0.9}/>
                        </div>
                    {:else if product?.badge == "cyber-monday"}
                        <div class="inline-flex items-center align-middle">
                            <CyberMondayBadge size={0.96}/>
                        </div>
                    {/if}
                    <span class="text-black text-[0.95rem] font-medium">
                        {product.title}
                    </span>
                </div>
                <button type="button" title="Salvar" class="-mt-[0.8rem]" onclick={saveProduct}>
                    {#if saved}
                        <svg class="min-w-[0.875rem] max-w-[0.875rem] h-[1.2rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 50">
                            <path fill="#202020" d="M34 0c3 0 6 1.5 6 5v42c0 3-3 3-5.5 1.5L20 36 5 48.5c-2 1.5-5 1-5-1.5V5c0-3 2.5-5 6-5h28Z"/>
                        </svg>
                    {:else}
                        <svg class="min-w-[0.875rem] max-w-[0.875rem] h-[1.2rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 50">
                            <path fill="#202020" d="M34 0c3 0 6 1.5 6 5v42c0 3-3 3-5.5 1.5L20 36 5 48.5c-2 1.5-5 1-5-1.5V5c0-3 2.5-5 6-5h28ZM7.5 5C5.758 5.04 5 5.5 5 7v35l12-9.5c2.5-2 3.5-2 6 0L35 42V7c0-1.5-.5-2-2-2H7.5Z"/>
                        </svg>
                    {/if}                 
                </button>
            </div>
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
            <button onclick={openShippingDrawer} type="button" class="flex w-full justify-between items-center gap-[0.3rem] mt-[0.9rem]">
                <div class="flex items-start gap-2">
                    <svg class="min-w-[1.05rem] max-w-[1.05rem] mt-[0.1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 38">
                        <path fill="#202020" d="M7 27.393A7.002 7.002 0 0 1 19.709 29h7.582a7.002 7.002 0 0 1 13.418 0H44v-7c0-4.5-4-11-5.5-11H34v7.5c0 2-4 2-4 0V6c0-1.5-.5-1.937-2-2H3.5c0-2.5 1-4 3.5-4h22c3 0 5 2 5 4.5V7h6c2.5 0 8 7.5 8 14v8c0 2.5-.5 4-3 4h-4.291a7.002 7.002 0 0 1-13.418 0h-7.582a7.002 7.002 0 0 1-13.42-.009C4.396 32.857 3 30.93 3 29v-5h4v3.393ZM13 28a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm21 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-21-8H3v-4h10v4Zm5-8H0V8h18v4Z"/>
                    </svg>
                    <div class="flex flex-col">
                        <div class="flex items-center gap-[0.3rem]">
                            {#if shipping.total == 0}
                                <div class="flex items-center bg-[#E0F6F6] py-[0.2rem] ps-[0.25rem] pe-[0.2rem] rounded-sm">
                                    <span class="text-[#059091] text-[0.75rem] font-medium leading-none">Frete grátis</span>
                                </div>
                            {/if}
                            <div class="flex items-center gap-[0.1rem] text-black text-[0.85rem] leading-none">
                                <span>Receba até {shipping.deadline.from}</span>
                                <span class="w-[0.4rem] h-[0.08rem] bg-black"></span>
                                <span>{shipping.deadline.to} de {shipping.deadline.month}</span>
                            </div>
                        </div>
                        <div class="flex items-center text-[#595959] text-[0.8rem] gap-[0.3rem] mt-[0.5rem] leading-none">
                            <span>Taxa de envio:</span>
                            {#if shipping.discount}
                                <span class="line-through">R$ {formatPrice(shipping.amount)}</span>
                                <span class="text-black">R$ {formatPrice(shipping.total)}</span>
                            {:else}
                                <span class="text-black">R$ {formatPrice(shipping.amount)}</span>
                            {/if}
                        </div>
                        {#if shipping.discount}
                            <span class="text-[#059091] text-[0.8rem] mt-[0.3rem] text-start leading-[1.1rem]">{shipping.discount.description}</span>
                        {/if}
                    </div>
                </div>
                <div class="flex items-center h-full">
                    <svg class="min-w-[0.33rem] max-w-[0.33rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                        <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
                    </svg>
                </div>
            </button>
            <span class="w-full h-[0.053rem] bg-[#efefef] mt-[0.9rem]"></span>
            <button onclick={openVariationDrawer} type="button" aria-label="Variações" class="flex w-full justify-between items-center gap-[0.3rem] mt-[0.8rem]">
                <div class="flex items-center gap-[0.6rem]">
                    <svg class="min-w-[0.92rem] max-w-[0.92rem] h-[0.88rem] mt-[0.1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 39">
                        <path fill="#202020" d="M15 21a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V24a3 3 0 0 1 3-3h12Zm21 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3V24a3 3 0 0 1 3-3h12ZM4 35h10V25H4v10Zm21 0h10V25H25v10ZM15 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h12Zm21 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h12ZM4 14h10V4H4v10Zm21 0h10V4H25v10Z"/>
                    </svg>                  
                    <div class="flex items-center gap-[0.6rem]">
                        <ul class="flex items-center gap-[0.3rem]">
                            {#each variations?.find(v => v.type == "image")?.variants as variant}
                                <li class="w-8 h-8 rounded-sm overflow-hidden bg-cover bg-center" style={`background-image: url('${variant.media.source}')`}></li>   
                            {/each}
                        </ul>
                        <span class="text-[#858585] text-[0.775rem]">{variations[0]?.variants.length} opções disponíveis</span>
                    </div>
                </div>
                <div class="flex items-center h-full">
                    <svg class="min-w-[0.33rem] max-w-[0.33rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                        <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
                    </svg>
                </div>
            </button>
        </div>
        <button type="button" onclick={openProtetionDrawer} class="flex w-full justify-between items-start gap-[0.3rem] px-4 py-3 bg-linear-to-b from-[#FFF8EE] to-[#FFFBF5]">
            <div class="flex items-start gap-[0.6rem]">
                <svg class="min-w-[0.8rem] max-w-[0.8rem] h-[1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 47">
                    <path fill="#895109" d="M17 .794c1-.834 2.5-1.262 4.027 0 4.48 3.702 8.208 5.527 14.473 6.793C37 7.89 38 9.042 38 10.542v14.5c0 6-8.209 15.952-19 21-11.09-5.715-19-15-19-21v-14.5c0-1.5 1-2.637 3-3.055 5.799-1.211 9.51-2.946 14-6.693Zm.5 24.748-4.5-4-2.5 2.5 7.5 7 10-14-3-2-7.5 10.5Z"/>
                </svg>
                <div class="flex flex-col gap-[0.35rem] mt-[0.15rem]">
                    <span class="flex w-full justify-start text-[#895109] text-[0.78rem] font-semibold leading-none">Proteção do cliente</span>
                    <ul class="flex flex-wrap gap-x-4 gap-y-[0.15rem] mt-[0.25rem]">
                        <li class="flex items-center gap-[0.25rem]">
                            <svg class="min-w-[0.5rem] max-w-[0.5rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                                <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                            </svg>                          
                            <span class="text-black text-[0.75rem] whitespace-nowrap">Devolução gratuita</span>
                        </li>
                        <li class="flex items-center gap-[0.25rem]">
                            <svg class="min-w-[0.5rem] max-w-[0.5rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                                <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                            </svg>
                            <span class="text-black text-[0.75rem] whitespace-nowrap">Reembolso automático por danos</span>
                        </li>
                        <li class="flex items-center gap-[0.25rem]">
                            <svg class="min-w-[0.5rem] max-w-[0.5rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                                <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                            </svg>
                            <span class="text-black text-[0.75rem] whitespace-nowrap">Pagamento seguro</span>
                        </li>
                        <li class="flex items-center gap-[0.25rem]">
                            <svg class="min-w-[0.5rem] max-w-[0.5rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                                <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                            </svg>
                            <span class="text-black text-[0.75rem] whitespace-nowrap">Cupom por atraso na coleta</span>
                        </li>
                    </ul>
                </div>
            </div>
            <svg class="min-w-[0.33rem] max-w-[0.33rem] mt-[0.2rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#895109" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </button>
        <div class="w-full h-[0.5rem]"></div>
        <div class="flex flex-col py-[1.1rem] bg-white">
            <div class="flex justify-between items-center px-4">
                <span class="text-black text-[0.93rem] font-semibold leading-none">Ofertas</span>
                <svg class="min-w-[0.33rem] max-w-[0.33rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                    <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
                </svg>
            </div>
            <div class="flex items-center mt-[0.8rem]">
                <PromotionSlider promotions={promotions}/>
            </div>
        </div>
        <div class="w-full h-[0.5rem] mt-[0.1rem]"></div>
        <div class="flex flex-col py-[1.1rem] bg-white">
            <div class="flex justify-between items-center px-4">
                <span class="text-black text-[0.93rem] font-semibold leading-none">Vídeos de criadores ({videos?.length})</span>
            </div>
            <div class="flex items-center mt-[1rem]">
                <VideosSlider videos={videos}/>
            </div>
        </div>
        <div class="w-full h-[0.5rem] mt-[0.1rem]"></div>
        <div class="flex flex-col py-[1.1rem] bg-white">
            <div class="flex justify-between items-center px-4">
                <span class="text-black text-[0.93rem] font-semibold leading-none">Avaliações dos clientes ({formatNumber(product?.reviews).pt})</span>
                <div class="flex items-center gap-[0.4rem]">
                    <span class="text-[0.8rem] text-[#696969] font-semibold leading-none">Ver mais</span>
                    <svg class="min-h-[0.58rem] max-h-[0.6rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                        <path fill="#696969" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
                    </svg>
                </div>
            </div>
            <div class="flex items-center mt-[0.8rem] px-4 gap-[0.35rem]">
                <div class="flex items-center gap-[0.3rem] mt-[0.1rem]">
                    <span class="text-[0.9rem] text-black font-medium">{product?.rating}</span>
                    <span class="text-[0.8rem] text-[#777]">/5</span>
                </div>
                <RatingStars rating={product?.rating} size={0.95} gap={0.25}/>
            </div>
            <div class="mt-[0.85rem]">
                <ReviewsList reviews={reviews}/>
            </div>
            <span class="flexw-full h-[0.06rem] bg-[#f0f0f0] mx-4 mt-[1.1rem]"></span>
            <div class="flex justify-between items-center px-4 mt-[1.1rem]">
                <span class="text-black text-[0.93rem] font-semibold leading-none">Avaliações da loja ({formatNumber(store?.reviews).pt})</span>
                <div class="flex items-center gap-[0.4rem]">
                    <svg class="min-h-[0.58rem] max-h-[0.6rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                        <path fill="#696969" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
                    </svg>
                </div>
            </div>
            <div class="px-4 mt-[1rem]">
                <div class="flex gap-[0.5rem]">
                    <button type="button" class="flex items-center gap-[0.25rem] px-[0.5rem] h-[1.8rem] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm">
                        <svg class="h-[0.62rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 29">
                            <path fill="#000" d="M17 0c6 0 8 4 8 4a9 9 0 0 1 9 9v7a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9v-7a9 9 0 0 1 9-9s2-4 8-4Zm0 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/>
                        </svg>
                        <span class="text-black text-[0.7rem] leading-none whitespace-nowrap">Inclui imagens ou vídeos ({Math.floor(store?.reviews * 0.14)})</span>                  
                    </button>
                    <button type="button" class="flex items-center gap-[0.25rem] px-[0.5rem] h-[1.8rem] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm">
                        <span class="text-black text-[0.7rem] leading-none whitespace-nowrap">5</span>
                        <svg class="w-[0.65rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                            <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                        </svg>
                        <span class="text-black text-[0.7rem] leading-none whitespace-nowrap">({Math.floor(store?.reviews * 0.32)})</span>
                    </button>
                    <button type="button" class="flex items-center gap-[0.25rem] px-[0.5rem] h-[1.8rem] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm">
                        <span class="text-black text-[0.7rem] leading-none whitespace-nowrap">4</span>
                        <svg class="w-[0.65rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                            <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                        </svg>
                        <span class="text-black text-[0.7rem] leading-none whitespace-nowrap">({Math.floor(store?.reviews * 0.07)})</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="w-full h-[0.5rem] mt-[0.1rem]"></div>
        <div class="flex flex-col py-[1rem] bg-white">
            <div class="flex justify-between items-center px-4">
                <div class="flex items-center gap-[0.75rem]">
                    <div class="w-[3.5rem] h-[3.5rem] bg-center bg-cover rounded-full" style={`background-image: url('${store?.media?.source}');`}></div>
                    <div class="flex flex-col">
                        <span class="text-black text-[0.9rem] font-semibold">{store?.title}</span>
                        <span class="text-[#666] text-[0.775rem] leading-none mt-[0.15rem]">{formatNumber(store?.sales).en} vendido(s)</span>
                    </div>
                </div>
                <button type="button" class="flex items-center gap-[0.25rem] px-[1.2rem] h-[1.8rem] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm">
                    <span class="text-black text-[0.875rem] font-semibold">Visitar</span>
                </button>
            </div>
            <span class="flexw-full h-[0.06rem] bg-[#f0f0f0] mx-4 mt-[0.8rem]"></span>
            <div class="flex justify-between items-center px-4 mt-[0.85rem]">
                <span class="text-[#444] text-[0.8rem] font-semibold leading-none">Mais desta loja</span>
                <div class="flex items-center gap-[0.4rem]">
                    <svg class="min-h-[0.58rem] max-h-[0.6rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                        <path fill="#696969" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
                    </svg>
                </div>
            </div>
            <div class="w-full mt-[0.8rem]">
                <ProductSlider products={store?.products}/>
            </div>
        </div>
        <div class="w-full h-[0.5rem] mt-[0.1rem]"></div>
        <div class="flex flex-col py-[1.1rem] bg-white">
            <div class="flex justify-between items-center px-4">
                <span class="text-black text-[0.93rem] font-semibold leading-none">Sobre este produto</span>
            </div>
            <div class="mt-[0.5rem]">
                <ProductDescription description={product?.description}/>
            </div>
        </div>
        <div class="flex flex-col py-[1rem] mt-[0.5rem]">
            <div class="flex justify-between items-center px-4 ms-[0.5rem]">
                <span class="text-black text-[0.93rem] font-semibold leading-none">Você também pode gostar</span>
            </div>
            <div class="w-full px-4 mt-[1.25rem]">
                <SuggestedProducts products={store?.products}/>
            </div>
        </div>
    </main>
    <FooterBar/>
</div>