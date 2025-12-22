<script>
    import { onMount } from "svelte";
    import { initProductState } from "$state/product.svelte";
    import { PUBLIC_UPLOAD_BASE } from '$env/static/public';

    import FinalizeSkeleton from "$component/finalize/FinalizeSkeleton.svelte";
    import FooterBar from "$component/finalize/FooterBar.svelte";
    import HeaderBar from "$component/finalize/HeaderBar.svelte";
    import PaymentSection from "$component/finalize/payment/PaymentSection.svelte";
    import OverviewSection from "$component/finalize/overview/OverviewSection.svelte";
    import DiscountSection from "$component/finalize/discounts/DiscountSection.svelte";
    import ShippingSection from "$component/finalize/shipping/DeadlineSection.svelte";
    import ItemSection from "$component/finalize/item/ItemSection.svelte";
    import AddDocumentSection from "$component/finalize/document/AddDocumentSection.svelte";
    import AddShippingSection from "$component/finalize/shipping/AddShippingSection.svelte";
    import AddShippingDrawer from "$component/finalize/shipping/AddShippingDrawer.svelte";

    let { data } = $props();

    const product = initProductState();

    let container = $state(null);
    let drawer = $state(null);
    let ready = $state(false);
    let document = $state(null);
    let address = $state(null);
    let quantity = $state(1);
    let scroll = $state(0);

    let shipping = $state({
        filled: false,
        deadline: {from: 22, to: 28, month: "dez"},
        price: {regular: 28.70, promotional: 20.0},
        coupon: {discount: 20.0},
        country: {name: "Brasil", code: "BR"}
    });

    const updateDocument = (value) => {
        document = value;
    }
    const incrementQuantity = () => {
        quantity = Math.min(quantity+1, 10);
    }
    const decrementQuantity = (value) => {
        quantity = Math.max(quantity-1, 1);
    }
    const updateShipping = (value) => {
        shipping = value;
    }
    const updateScroll = () => {
        scroll = window.scrollY;
    }

    onMount(async () => {
        product.loadProduct(data?.id, () => {
            ready = true;
        });
    });

    $inspect(shipping);
</script>

<svelte:head>
    {#each data?.images as image}
        {#if image.index == 0}
            <link rel="preload" as="image" href={`${PUBLIC_UPLOAD_BASE}/${image.source}`}/>
        {/if}
    {/each}
</svelte:head>
<svelte:window onscroll={updateScroll}/>

{#if ready}
    <div class={`w-full fixed top-0 left-0 z-40 duration-300 transition-transform ${drawer?.open && "-translate-x-[10rem]"}`}>
        <HeaderBar/>
    </div>
    <div class={`flex flex-col w-full duration-300 transition-transform ${drawer?.open && "-translate-x-[10rem]"}`}>
        <main class="flex flex-col w-full bg-[#F5F5F5] pt-12 pb-[9.4rem]">
            <AddShippingSection {scroll} {shipping} onChangeShipping={updateShipping} openDrawer={drawer?.openDrawer}/>
            <span class="block w-full h-[0.05rem] bg-[#e0e0e0]"></span>
            <AddDocumentSection {document} onChangeDocument={updateDocument}/>
            <div class="w-full h-[0.5rem] bg-[#F5F5F5]"></div>
            <ItemSection {quantity} onIncrementQuantity={incrementQuantity} onDecrementQuantity={decrementQuantity}/>
            <ShippingSection {shipping}/>
            <div class="w-full h-[0.5rem] bg-[#F5F5F5]"></div>
            <DiscountSection {shipping}/>
            <div class="w-full h-[0.5rem] bg-[#F5F5F5]"></div>
            <OverviewSection {shipping}/>
            <div class="w-full h-[0.5rem] bg-[#F5F5F5]"></div>
            <PaymentSection/>
            <div class="flex w-full p-[1rem]">
                <span class="text-black text-[0.84rem] leading-[1.12rem]">Ao fazer um pedido, você concorda com <b class="font-semibold">Termos de uso e venda do TikTok Shop</b> e reconhece que leu e concordou com a <b class="font-semibold">Política de privacidade do Tiktok</b>.</span>
            </div>
        </main>
    </div>
    <div class={`w-full fixed bottom-0 left-0 z-40 duration-300 transition-transform ${drawer?.open && "-translate-x-[10rem]"}`}>
        <FooterBar/>
    </div>
    <div class={`flex items-start w-full h-full bg-[#F5F5F5] fixed top-0 z-50 duration-300 transition-transform ${drawer?.open ? "translate-x-0" : "translate-x-[100vw]"}`}>
        <AddShippingDrawer {shipping} onChangeShipping={updateShipping} bind:this={drawer}/>
    </div>
{:else}
    <FinalizeSkeleton/>
{/if}