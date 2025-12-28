<script>
    import { onMount } from "svelte";
    import { navigating } from "$app/stores";
    import { formatPrice } from "$lib/formating";
    import { PUBLIC_UPLOAD_BASE } from '$env/static/public';

    import PromotionsSection from "$component/product/promotions/PromotionsSection.svelte";
    import CouponSection from "$component/product/coupons/CouponSection.svelte";
    import ShippingSection from "$component/product/shipping/ShippingSection.svelte";
    import ReviewsSection from "$component/product/reviews/ReviewsSection.svelte";
    import StoreSection from "$component/product/store/StoreSection.svelte";
    import VariationsSection from "$component/product/variations/VariationsSection.svelte";
    import PriceSection from "$component/product/prices/PriceSection.svelte";
    import ImagesSection from "$component/product/ImagesSection.svelte";
    import TitleSection from "$component/product/TitleSection.svelte";
    import ProtetionsSection from "$component/product/protetions/ProtetionsSection.svelte";
    import DescriptionSection from "$component/product/DescriptionSection.svelte";
    import RatingSection from "$component/product/RatingSection.svelte";
    import VideosSection from "$component/product/videos/VideosSection.svelte";
    import SuggestionsSection from "$component/product/suggestions/SuggestionsSection.svelte";
    import TagsSection from "$component/product/tags/TagsSection.svelte";
    import InstallmentsSection from "$component/product/installments/InstallmentsSection.svelte";

    let {
        product={},
        shipping={},
        price={},
        quantity=1,
        saved=false,
        updateShipping=()=>{},
        updateQuantity=()=>{},
        updatePage=()=>{},
        saveProduct=()=>{}
    } = $props();

    let timeout;
    let ready = $state(false);
    let dragging = $state(false);
    let sections = $state({ overview: 0 });
    let tab = $state("overview");
    let scrollable = $state(null);
    let scroll = $state(0);

    const updateScroll = () => {
        scroll = scrollable.scrollTop;

        if(!dragging){
            if(scroll >= sections.suggestions) tab = "suggestions";
            else if(scroll >= sections.description) tab = "description";
            else if(scroll >= sections.reviews) tab = "reviews";
            else tab = "overview";
        }
    }
    const updateSection = (name, value) => {
        sections[name] = value;
    }
    const updateTab = (value) => {
        clearTimeout(timeout);

        dragging = true;
        tab = value;

        window.scrollTo({ top: sections[tab], behavior: "smooth" });

        timeout = setTimeout(() => {
            dragging = false;
        }, 1000);
    }

    onMount(async () => {
        ready = true;
        console.log(price);
    });
</script>

<div class="w-full max-h-dvh bg-[#F5F5F5] relative">
    <header class="flex flex-col fixed top-0 left-0 w-full z-40">
        <div class="flex justify-between items-center h-12 px-5 bg-white">
            <div class="flex items-center">
                <button type="button" title="Fechar" onclick={window?.close}>
                    <svg class="min-w-4 max-w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 47 46">
                        <path fill="#000" d="M46.077 4.053 27.091 22.89l18.986 18.84-4.022 4.052-19.017-18.87-19.017 18.87L0 41.73l18.984-18.84L0 4.054 4.021 0l19.017 18.87L42.055 0l4.022 4.053Z"/>
                    </svg>
                </button>
            </div>
            <div class="flex items-center gap-[1.3rem]">
                <button type="button" title="Compartilhar">
                    <svg class="min-w-[1.45rem] max-w-[1.45rem] h-[1.35rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 67 63">
                        <path fill="#000" d="M29.054 2.317c0-3 3.5-3 6-.5l30 26.5c2.367 2.488 2.32 3.795 0 6l-30.5 26.5c-2.5 2.5-5.5 1-5.5-2.5v-14c-12.5 0-18 3.5-24 8-2.054 1.54-4.861 0-5-2.501-1-18 12-30.499 29-31.999v-15.5Zm6 18.499c-.054 2.684-1.555 2.915-4 3-12.763.443-23.055 8.685-24.555 20.185C12.61 41.022 17 39 32 38.5c2-.172 3.055.816 3.055 3.316V52l24.5-20.684-24.5-21.5v11Z"/>
                    </svg>
                </button>
                <button type="button" title="Carrinho">
                    <svg class="min-w-[1.45rem] max-w-[1.45rem] h-[1.32rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 64">
                        <path fill="#000" d="M23.566 51a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm31 0a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm-45-51c2.934 0 4.934 1.5 5.5 4.5l1.5 7.5h45.5c4.934 0 7.434 2.5 6.5 6l-6.5 24.5c-.566 2.5-2.566 5.5-7 5.5h-30c-4.066 0-7.066-2-8-6l-8.5-36h-6.5c-2.5 0-3-6 0-6h7.5Zm13 38.5c.749 2.45 1.467 3.426 4 3.5h26.5c2.689-.2 3.302-1.238 4-3.5l5-20.5h-44l4.5 20.5Z"/>
                    </svg>
                </button>
                <button type="button" title="Opções">
                    <svg class="min-w-[1.15rem] max-w-[1.15rem] h-[0.32rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 12">
                        <path fill="#000" d="M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0Zm22 0a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm22 0a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"/>
                    </svg>                                          
                </button>
            </div>
        </div>
        <div class="flex flex-col w-full bg-white" style={`opacity: ${scroll >= 75 ? "100" : (scroll / 75) * 100}%`}>
            <div class="flex overflow-x-auto relative no-selectable transparent-scroll -mb-[0.04rem] z-20">
                <div>
                    <div class="flex items-center">
                        <div class="flex w-[0.9rem]"></div>
                        <button type="button" class={`flex justify-between items-center gap-[0.4rem] pb-[0.5rem] pt-[0.6rem] px-[0.6rem] border-b-[0.16rem] ${tab == "overview" ? "border-black" : "border-transparent"} relative`} onclick={() => onChangeTab("overview")}>
                            <span class={`text-[0.95rem] ${tab == "overview" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Visão geral</span>
                        </button>
                        <button type="button" class={`flex justify-between items-center gap-[0.4rem] pb-[0.5rem] pt-[0.6rem] px-[0.6rem] border-b-[0.16rem] ${tab == "reviews" ? "border-black" : "border-transparent"} relative`} onclick={() => onChangeTab("reviews")}>
                            <span class={`text-[0.95rem] ${tab == "reviews" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Avaliações</span>
                        </button>
                        <button type="button" class={`flex justify-between items-center gap-[0.4rem] pb-[0.5rem] pt-[0.6rem] px-[0.6rem] border-b-[0.16rem] ${tab == "description" ? "border-black" : "border-transparent"} relative`} onclick={() => onChangeTab("description")}>
                            <span class={`text-[0.95rem] ${tab == "description" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Descrição</span>
                        </button>
                        <button type="button" class={`flex justify-between items-center gap-[0.4rem] pb-[0.5rem] pt-[0.6rem] px-[0.6rem] border-b-[0.16rem] ${tab == "suggestions" ? "border-black" : "border-transparent"} relative`} onclick={() => onChangeTab("suggestions")}>
                            <span class={`text-[0.95rem] ${tab == "suggestions" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Recomendações</span>
                        </button>
                        <div class="flex w-[0.9rem]"></div>
                    </div>
                </div>
            </div>
            <span class="absolute left-0 bottom-0 w-full h-[0.045rem] bg-[#D0D1D3] z-10"></span>
        </div>
    </header>
    <main bind:this={scrollable} onscroll={updateScroll} class="flex flex-col pt-[3rem] pb-[6.3rem] no-selectable overflow-y-scroll overscroll-none max-h-dvh transparent-scroll scrollable">
        <ImagesSection {product} {scroll}/>
        <PriceSection {product} {price}/>
        <div class="flex flex-col px-4 pt-[0.65rem] pb-[0.85rem] bg-white">
            <InstallmentsSection {price}/>
            <CouponSection {product}/>
            <TitleSection {product} {saved} {saveProduct}/>
            <RatingSection {product}/>
            <TagsSection {product}/>
            <span class="w-full h-[0.053rem] bg-[#efefef] mt-[0.6rem]"></span>
            <ShippingSection {product} {shipping}/>
            <span class="w-full h-[0.053rem] bg-[#efefef] mt-[0.9rem]"></span>
            <VariationsSection {product} {quantity} {updateQuantity}/>
        </div>
        <ProtetionsSection {product}/>
        <span class="w-full h-[0.5rem]"></span>
        <PromotionsSection {product}/>
        <span class="w-full h-[0.5rem] mt-[0.1rem]"></span>
        <VideosSection {product}/>
        <span class="w-full h-[0.5rem] mt-[0.1rem]"></span>
        <ReviewsSection {product} {scroll} {updateSection}/>
        <span class="w-full h-[0.5rem] mt-[0.1rem]"></span>
        <StoreSection {product}/>
        <span class="w-full h-[0.5rem] mt-[0.1rem]"></span>
        <DescriptionSection {product} {scroll} {updateSection}/>
        <SuggestionsSection {product} {scroll} {updateSection}/>
    </main>
    <footer class="flex fixed bottom-0 left-0 w-full py-[0.6rem] pb-[2.75rem] px-[0.6rem] gap-2 bg-white border-t-[0.063rem] border-[#E8E8E8] z-40">
        <div class="flex justify-center items-center gap-3">
            <button type="button" title="Loja" class="flex flex-col items-center p-1">
                <div class="flex justify-center items-center w-[1.4rem] h-[1.4rem]">
                    <svg class="min-w-[1.13rem] max-w-[1.13rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 51">
                        <path fill="#000" d="M39 0c2.5 0 4.906 1.653 6.5 4 4 5 8.5 10 8.5 13.5 0 7 0 10.5-6 15v11c0 4-4 7.5-7 7.5H13c-3 0-7-3.5-7-7.5v-11c-5-4-6-6.5-6-15 0-3 5-9.56 8-13.5 1.8-2.365 4-4 6-4h25Zm-3.5 29.5c-7.88 7.583-12.864 4.136-17 0-2.6 2.62-4.172 3.785-7.5 4.5v8c.185 2.86.901 4.29 3.5 4.5h25c2.694-.386 3.362-1.849 3.5-4.5v-8c-3.825-.225-5.403-1.32-7.5-4.5ZM5 23c0 1 5 11 11 1.5 1.5-1.5 3-2 5 0 3.706 4.5 7 6.5 12.5 0 1.27-1.5 3-2 4.5 0 3.5 8.5 11 2 11-1.5v-3H5v3Zm9-18c-4.113 3.939-5.54 6.122-7.5 10H48c-2.384-3.932-4.187-6.12-8-10H14Z"/>
                    </svg>
                </div>
                <span class="text-black text-[0.65rem]">Loja</span>
            </button>
            <button type="button" title="Chat" class="flex flex-col items-center p-1">
                <div class="flex justify-center items-center w-[1.4rem] h-[1.4rem]">
                    <svg class="min-w-[1.13rem] max-w-[1.13rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 55">
                        <path fill="#000" d="M28 0c17 0 28 12 28 23-.5 14.5-19.5 29.5-28 31.5V44C8 44 0 34 0 23 .5 10 13 0 28 0Zm0 5C18.5 5 5.5 13 5.5 23.5S14.5 40 33 39v7.5c10.036-7.193 18-16 18-24C51 13.5 39 5 28 5Z"/>
                    </svg>
                </div>      
                <span class="text-black text-[0.65rem]">Chat</span>
            </button>
            <button type="button" title="Adicionar ao carrinho" class="flex flex-col justify-center h-11 items-center px-5 bg-[#FFF0F3] rounded-lg hover:opacity-50  active:opacity-50">
                <svg class="min-w-6 max-w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 70 61">
                    <path fill="#DF0644" d="M23.375 49.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm34 0a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11ZM9.375 0c3 0 5.5 2 6.5 5.5l7 28c1.396 3.303 4 5.5 6.5 5.5h23c2.5 0 4.79-3.257 5.5-6.5l5-19h6.5l-6 22c-2 6-5.5 9.5-10 9.5h-25c-5.5 0-9.29-4.556-10.5-9l-8.5-30h-7.5c-2.5 0-2.5-6 0-6h7.5Zm30.5 3.5c1.657 0 3 .343 3 2v8h8c1.657 0 2.125 1.343 2.125 3s-.468 3-2.125 3h-8v8c0 1.657-1.343 2-3 2s-3-.343-3-2v-8h-7c-1.657 0-2.375-1.343-2.375-3s.718-3 2.375-3h7v-8c0-1.657 1.343-2 3-2Z"/>
                </svg>
            </button>
        </div>
        <button type="button" title="Adicionar ao carrinho" class="flex flex-col justify-center w-full h-11 gap-1 items-center bg-[#FE2C55] rounded-lg hover:bg-[#E81D44] active:bg-[#E81D44] overflow-hidden" onclick={() => updatePage("finalization")}>
            <span class="text-white text-[1rem] font-semibold leading-none">R$ {formatPrice(price.promotional)}</span>
            <span class="inline-block max-w-full text-ellipsis overflow-hidden whitespace-nowrap text-white text-[0.675rem] font-medium leading-none">Compre pelo preço de Oferta relâmpago</span>
        </button>
    </footer>
</div>