<script>
    import { onMount } from "svelte";
    import { observe } from "$action/observe";
    import { formatNumber } from "$lib/formating";
    import { getLowestPrice } from "$lib/prices";
    
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
    import ImagesSection from "$component/shop/product/ImagesSection.svelte";
    import TitleSection from "$component/shop/product/TitleSection.svelte";
    import ProtetionsSection from "$component/shop/protetions/ProtetionsSection.svelte";
    import DescriptionSection from "$component/shop/product/DescriptionSection.svelte";
    import RatingSection from "$component/shop/product/RatingSection.svelte";
    import VideosSection from "$component/shop/videos/VideosSection.svelte";
    import SuggestionsSection from "$component/shop/suggestions/SuggestionsSection.svelte";
    import TagsSection from "$component/shop/tags/TagsSection.svelte";
    import InstallmentsSection from "$component/shop/installments/InstallmentsSection.svelte";
    import Spacer from "$component/shop/Spacer.svelte";

    let { slug } = $props();

    let dragging = $state(false);
    let sections = $state({ overview: 0 });
    let tab = $state("overview");
    let ready = $state(false);
    let scroll = $state(0);

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
    let suggestions = $state([]);

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

    onMount(async () => {
        updateScroll();

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
            suggestions = store?.products;

            ready = true;
        }
    });
</script>

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
<svelte:window onscroll={updateScroll}/>

{#if ready}
    <ImageModal images={images}/>
    <div class="w-full h-full bg-[#F5F5F5]">
        <HeaderBar tab={tab} {scroll} onChangeTab={updateTab}/>
        <main class="flex flex-col mt-12 mb-16 no-selectable">
            <ImagesSection {images} {scroll}/>
            <PriceSection {product} {price}/>
            <div class="flex flex-col px-4 pt-[0.65rem] pb-[0.85rem] bg-white">
                <InstallmentsSection {price}/>
                <CouponSection {coupons}/>
                <TitleSection {product}/>
                <RatingSection {product}/>
                <TagsSection {tags}/>
                <Spacer size="0.053" color="#efefef" margin="0.6"/>
                <ShippingSection {shipping}/>
                <Spacer size="0.053" color="#efefef" margin="0.9"/>
                <VariationsSection bind:variations={variations}/>
            </div>
            <ProtetionsSection/>
            <Spacer size="0.5"/>
            <PromotionsSection {coupons} {countries}/>
            <Spacer size="0.5" margin="0.1"/>
            <VideosSection {videos}/>
            <Spacer size="0.5" margin="0.1"/>
            <ReviewsSection {reviews} {product} {store} {scroll} onSectionPosition={updateSection}/>
            <Spacer size="0.5" margin="0.1"/>
            <StoreSection {store}/>
            <Spacer size="0.5" margin="0.1"/>
            <DescriptionSection {product} {scroll} onSectionPosition={updateSection}/>
            <SuggestionsSection {suggestions} {scroll} onSectionPosition={updateSection}/>
        </main>
        <FooterBar price={price}/>
    </div>
{:else}
    {#each images as image, index}
        <img class="w-0 h-0" src={image?.source} alt="pre-loading"/>
    {/each}
    {#each variations as variation}
        {#if variation.type == "image"}
            {#each variation.variants as variant}
                <img class="w-0 h-0" src={variant.media.source} alt="pre-loading"/> 
            {/each}
        {/if}
    {/each}
    <ShopSkeleton/>
{/if}