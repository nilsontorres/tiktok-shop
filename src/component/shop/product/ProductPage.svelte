<script>
    import { onMount } from "svelte";
    import { formatPrice, formatNumber } from "$lib/formating";
    import { PUBLIC_UPLOAD_BASE } from '$env/static/public';

    import PromotionsSection from "$component/shop/product/promotions/PromotionsSection.svelte";
    import CouponSection from "$component/shop/product/coupons/CouponSection.svelte";
    import ShippingSection from "$component/shop/product/shipping/ShippingSection.svelte";
    import ReviewsSection from "$component/shop/product/reviews/ReviewsSection.svelte";
    import StoreSection from "$component/shop/product/store/StoreSection.svelte";
    import VariationsSection from "$component/shop/variations/VariationsSection.svelte";
    import PriceSection from "$component/shop/product/prices/PriceSection.svelte";
    import ImageSection from "$component/shop/product/ImageSection.svelte";
    import TitleSection from "$component/shop/product/TitleSection.svelte";
    import ProtetionsSection from "$component/shop/product/protetions/ProtetionsSection.svelte";
    import DescriptionSection from "$component/shop/product/DescriptionSection.svelte";
    import RatingSection from "$component/shop/product/RatingSection.svelte";
    import VideosSection from "$component/shop/product/videos/VideosSection.svelte";
    import SuggestionsSection from "$component/shop/product/suggestions/SuggestionsSection.svelte";
    import TagsSection from "$component/shop/product/tags/TagsSection.svelte";
    import InstallmentsSection from "$component/shop/product/installments/InstallmentsSection.svelte";
    import SectionSpacer from "$component/shop/product/SectionSpacer.svelte";
    import ProductFooter from "$component/shop/product/ProductFooter.svelte";
    import ProductHeader from "$component/shop/product/ProductHeader.svelte";
    import ImagesViewer from "$component/shop/image/ImagesViewer.svelte";
    import VariationsDrawer from "$component/shop/variations/VariationsDrawer.svelte";

    let {
        product,
        address,
        shipping,
        variations,
        variants,
        quantity,
        coupons,
        prices,
        price,
        image,
        saved,
        locked,
        installments,
        updateAddress=()=>{},
        updateQuantity=()=>{},
        updateVariation=()=>{},
        applyCoupon=()=>{},
        redeemCoupon=()=>{},
        saveProduct=()=>{},
        updatePage=()=>{}
    } = $props();

    let timeout;
    let ready = $state(false);
    let dragging = $state(false);
    let sections = $state({ overview: 0 });
    let tab = $state("overview");
    let container = $state(null);
    let viewer = $state(null);
    let drawer = $state(null);
    let scroll = $state({ position: 0, locked: false });

    const handleScroll = () => {
        scroll.position = container.scrollTop;

        if(!dragging){
            if(scroll.position >= sections.suggestions) tab = "suggestions";
            else if(scroll.position >= sections.description) tab = "description";
            else if(scroll.position >= sections.reviews) tab = "reviews";
            else tab = "overview";
        }
    }
    const updateScroll = (params) => {
        if(params?.locked){
            scroll.locked = true;
        }
        else{
            scroll.locked = false;
        }

        if(params?.position !== null){
            container.scrollTo({ top: params?.position, behavior: params?.animated ? "smooth" : "instant" });
        }
    }
    const updateSection = (name, value) => {
        sections[name] = value;
    }
    const updateTab = (value) => {
        clearTimeout(timeout);

        dragging = true;
        tab = value;

        updateScroll({ position: sections[tab], animated: true });

        timeout = setTimeout(() => {
            dragging = false;
        }, 1000);
    }
    const openViewer = (index) => {
        viewer?.openViewer({ images: product?.images, index });
    }
    const gotoFinalization = (toast) => {
        if(variants.length == variations.length){
            updatePage("finalization");
            setTimeout(drawer.closeDrawer, 300);
        }
        else{
            variations.map(variation => {
                if(!variation.variants.find(variant => variant.is_selected)){
                    toast?.showMessage(`Selecione ${variation.name}`);
                }
            });
            drawer.openDrawer();
        }
    }
    const openVariationsDrawer = () => {
        drawer?.openDrawer();
    }

    onMount(async () => {
        ready = true;
    });
</script>

<ImagesViewer bind:this={viewer}/>
<VariationsDrawer bind:this={drawer} {product} {shipping} {variants} {variations} {quantity} {price} {prices} {image} {updateVariation} {updateQuantity} {gotoFinalization} {updatePage}/>

<div class="w-full h-dvh bg-[#F5F5F5] relative pt-[48px] pb-[100px]">
    <ProductHeader {tab} {scroll} {updateTab}/>
    <main bind:this={container} onscroll={handleScroll} class={`flex flex-col no-selectable ${scroll.locked ? "overflow-y-hidden" : "overflow-y-scroll"} overscroll-none h-full transparent-scroll scrollable z-20`}>
        <ImageSection {product} {openViewer}/>
        <PriceSection {product} {price} {prices} {updateScroll}/>
        <InstallmentsSection {product} {installments} {price} {updateScroll}/>
        <CouponSection {coupons}/>
        <TitleSection {product} {saved} {saveProduct}/>
        <RatingSection {product}/>
        <TagsSection {product}/>
        <ShippingSection {product} {shipping} {address} {updateAddress} {updateScroll}/>
        <VariationsSection {product} {prices} {variants} {variations} {openVariationsDrawer}/>
        <ProtetionsSection {product} {updateScroll}/>
        <SectionSpacer/>
        <PromotionsSection {product} {coupons} {updateScroll} {applyCoupon} {redeemCoupon}/>
        <SectionSpacer/>
        <VideosSection {product}/>
        <SectionSpacer/>
        <ReviewsSection {product} {scroll} {updateSection} {updatePage}/>
        <SectionSpacer/>
        <StoreSection {product}/>
        <SectionSpacer/>
        <DescriptionSection {product} {scroll} {updateSection}/>
        <SuggestionsSection {product} {scroll} {updateSection}/>
    </main>
    <ProductFooter {product} {shipping} {price} {gotoFinalization}/>
</div>