<script>
    import { onMount } from "svelte";
    import { navigating } from "$app/stores";
    import { usePageState } from '$state/page.svelte';
    import { initProductState } from '$state/product.svelte';
    import { PUBLIC_UPLOAD_BASE } from '$env/static/public';

    import FooterBar from "$component/product/FooterBar.svelte";
    import HeaderBar from "$component/product/HeaderBar.svelte";
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
    import ProductSkeleton from '$component/product/ProductSkeleton.svelte';

    let { data } = $props();

    let ready = $state(false);
    let dragging = $state(false);
    let countries = $state([]);
    let sections = $state({ overview: 0 });
    let tab = $state("overview");
    let scroll = $state(0);

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

    let price = $state({});

    const page = usePageState();
    const product = initProductState();

    const updateScroll = () => {
        scroll = window.scrollY;

        if(!dragging){
            if(scroll >= (sections.suggestions - 90)) tab = "suggestions";
            else if(scroll >= (sections.description - 90)) tab = "description";
            else if(scroll >= (sections.reviews - 90)) tab = "reviews";
            else tab = "overview";
        }
    }
    const updateSection = (name, value) => {
        sections[name] = value;
    }
    const updateTab = (value) => {
        dragging = true;
        tab = value;

        if(value != "overview") window.scrollTo({ top: sections[tab]+90, behavior: "smooth" });
        else window.scrollTo({ top: sections[tab], behavior: "smooth" });

        setTimeout(() => {
            dragging = false;
        }, 350);
    }

    onMount(async () => {
        product?.loadProduct(data?.id, () => {
            ready = true;
        });
    });
</script>

<svelte:head>
    {#each page?.data?.images as image}
        <link rel="prefetch" href={`${PUBLIC_UPLOAD_BASE}/${image.source}`}/>
    {/each}
</svelte:head>

<svelte:window onscroll={updateScroll}/>

{#if ready}
    <div class="w-full h-full bg-[#F5F5F5]">
        <HeaderBar {tab} {scroll} onChangeTab={updateTab}/>
        <main class="flex flex-col mt-12 mb-16 no-selectable">
            <ImagesSection {scroll}/>
            <PriceSection {price}/>
            <div class="flex flex-col px-4 pt-[0.65rem] pb-[0.85rem] bg-white">
                <InstallmentsSection {price}/>
                <CouponSection/>
                <TitleSection/>
                <RatingSection/>
                <TagsSection/>
                <span class="w-full h-[0.053rem] bg-[#efefef] mt-[0.6rem]"></span>
                <ShippingSection {shipping}/>
                <span class="w-full h-[0.053rem] bg-[#efefef] mt-[0.9rem]"></span>
                <VariationsSection/>
            </div>
            <ProtetionsSection/>
            <span class="w-full h-[0.5rem]"></span>
            <PromotionsSection {countries}/>
            <span class="w-full h-[0.5rem] mt-[0.1rem]"></span>
            <VideosSection/>
            <span class="w-full h-[0.5rem] mt-[0.1rem]"></span>
            <ReviewsSection {scroll} onSectionPosition={updateSection}/>
            <span class="w-full h-[0.5rem] mt-[0.1rem]"></span>
            <StoreSection/>
            <span class="w-full h-[0.5rem] mt-[0.1rem]"></span>
            <DescriptionSection {scroll} onSectionPosition={updateSection}/>
            <SuggestionsSection {scroll} onSectionPosition={updateSection}/>
        </main>
        <FooterBar price={price}/>
    </div>
{:else}
    <ProductSkeleton/>
{/if}