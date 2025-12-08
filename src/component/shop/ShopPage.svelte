<script>
    import { onMount } from "svelte";
    import { initProductState } from "$state/product.svelte";
    
    import FooterBar from "$component/shop/FooterBar.svelte";
    import HeaderBar from "$component/shop/HeaderBar.svelte";
    import ImageModal from "$component/shop/ImageModal.svelte";
    import ShopSkeleton from "$component/shop/ShopSkeleton.svelte";
    import PromotionsSection from "$component/shop/promotions/PromotionsSection.svelte";
    import CouponSection from "$component/shop/coupons/CouponSection.svelte";
    import ShippingSection from "$component/shop/shipping/ShippingSection.svelte";
    import ReviewsSection from "$component/shop/reviews/ReviewsSection.svelte";
    import StoreSection from "$component/shop/store/StoreSection.svelte";
    import VariationsSection from "$component/shop/variations/VariationsSection.svelte";
    import PriceSection from "$component/shop/prices/PriceSection.svelte";
    import MediasSection from "$component/shop/product/MediasSection.svelte";
    import TitleSection from "$component/shop/product/TitleSection.svelte";
    import ProtetionsSection from "$component/shop/protetions/ProtetionsSection.svelte";
    import DescriptionSection from "$component/shop/product/DescriptionSection.svelte";
    import RatingSection from "$component/shop/product/RatingSection.svelte";
    import VideosSection from "$component/shop/videos/VideosSection.svelte";
    import SuggestionsSection from "$component/shop/suggestions/SuggestionsSection.svelte";
    import TagsSection from "$component/shop/tags/TagsSection.svelte";
    import InstallmentsSection from "$component/shop/installments/InstallmentsSection.svelte";
    import Spacer from "$component/shop/Spacer.svelte";
    import PreloadImages from "$component/shop/PreloadImages.svelte";

    let { slug } = $props();

    let countries = $state([]);
    let dragging = $state(false);
    let sections = $state({ overview: 0 });
    let tab = $state("overview");
    let ready = $state(false);
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
    let cart = {
        items: [],
        price: {
            regular: 0,
            promotional: 0,
            coupons: 0
        }
    }

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

    const product = initProductState();

    onMount(async () => {
        scroll = window.scrollY;

        await product.loadProduct(slug, () => {
            ready = true;
        });
    });
</script>

<svelte:window onscroll={updateScroll}/>

{#if ready}
    <ImageModal/>
    <div class="w-full h-full bg-[#F5F5F5]">
        <HeaderBar {tab} {scroll} onChangeTab={updateTab}/>
        <main class="flex flex-col mt-12 mb-16 no-selectable">
            <MediasSection {scroll}/>
            <PriceSection {price}/>
            <div class="flex flex-col px-4 pt-[0.65rem] pb-[0.85rem] bg-white">
                <InstallmentsSection {price}/>
                <CouponSection/>
                <TitleSection/>
                <RatingSection/>
                <TagsSection/>
                <Spacer size="0.053" color="#efefef" margin="0.6"/>
                <ShippingSection {shipping}/>
                <Spacer size="0.053" color="#efefef" margin="0.9"/>
                <VariationsSection/>
            </div>
            <ProtetionsSection/>
            <Spacer size="0.5"/>
            <PromotionsSection {countries}/>
            <Spacer size="0.5" margin="0.1"/>
            <VideosSection/>
            <Spacer size="0.5" margin="0.1"/>
            <ReviewsSection {scroll} onSectionPosition={updateSection}/>
            <Spacer size="0.5" margin="0.1"/>
            <StoreSection/>
            <Spacer size="0.5" margin="0.1"/>
            <DescriptionSection {scroll} onSectionPosition={updateSection}/>
            <SuggestionsSection {scroll} onSectionPosition={updateSection}/>
        </main>
        <FooterBar price={price}/>
    </div>
{:else}
    <PreloadImages/>
    <ShopSkeleton/>
{/if}