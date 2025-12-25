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

    let { id, images=[], changePage=()=>{}, locked=false } = $props();

    const product = initProductState();

    let scrollable = $state(null);
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

    export const scrollTo = (params) => {
        scrollable.scrollTo(params);
    }

    onMount(async () => {
        product.loadProduct(id, () => {
            ready = true;
        });
    });
</script>

<svelte:window onscroll={updateScroll}/>

{#if ready}
    <div class="flex flex-col max-h-dvh relative">
        <header class="flex flex-col w-full fixed top-0 left-0 z-50">
            <div class="flex justify-between items-center h-12 bg-white border-b-[0.05rem] border-[#e0e0e0]">
                <button class="flex justify-center items-center w-[3.5rem] h-[2rem]" type="button" aria-label="Voltar" onclick={() => changePage("finalization")}>
                    <svg class="h-[1.1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
                        <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
                    </svg>
                </button>
                <div class="flex flex-col w-full items-center justify-center gap-[0.4rem]">
                    <span class="text-black text-[0.92rem] font-bold leading-none">Resumo do pedido</span>
                    <div class="flex items-center gap-[0.2rem]">
                        <svg class="w-[0.63rem] h-[0.69rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 35">
                            <path fill="#359F75" d="M12.5.596c.75-.626 1.875-.947 3.02 0 3.36 2.777 5.905 3.654 10.605 4.603C27.25 5.427 28 6.291 28 7.416v9.722l-.012.406c-.237 4.34-4.154 12.799-12.141 16.552-1.51.709-2.422.74-3.925 0C3.952 30.38 0 21.23 0 17.062V7.416C0 6.29.75 5.437 2.25 5.124 6.6 4.215 9.132 3.407 12.5.596Zm1.512 2.634C10.339 6.187 7.35 7.116 3 8.031v9.031c0 1.361.73 4.151 2.537 7.131 1.71 2.822 4.183 5.47 7.345 7.035l.308.149.058.027c.266.131.429.19.522.216a.593.593 0 0 0 .08.018l.01.002h.008l.018-.003a.803.803 0 0 0 .104-.024c.114-.032.295-.098.581-.232 3.488-1.639 6.123-4.374 7.896-7.227C24.283 21.231 25 18.507 25 17.138V8.029c-4.487-.935-7.428-1.954-10.988-4.799Zm3.755 8.7c.241-.423.607-.424 1.147-.12l.966.664c.362.241.543.603.362.905l-5.856 9.24c-.544.844-1.45 1.206-2.597 0l-3.562-4.047c-.302-.362-.302-.724 0-.966l1.026-.966c.367-.335.724-.302 1.026 0l2.658 2.959 4.83-7.67Z"/>
                        </svg>
                        <span class="text-[#49A97C] text-[0.65rem] font-bold leading-none mt-[0.1rem]">Seus dados estão seguros e criptografados</span>  
                    </div>
                </div>
                <div class="flex w-[3.5rem] items-center"></div>
            </div>
        </header> 
        <main bind:this={scrollable} class={`flex flex-col w-full bg-[#F5F5F5] transparent-scroll pt-[3rem] pb-[9.4rem] ${locked ? "overflow-y-scroll" : "overflow-hidden"}`}>
            <AddShippingSection {scroll} {shipping} onChangeShipping={updateShipping} openDrawer={() => changePage("add_shipping")}/>
            <span class="flex shrink-0 w-full h-[0.05rem] bg-[#e0e0e0]"></span>
            <span>{locked}</span>
            <AddDocumentSection {document} onChangeDocument={updateDocument}/>
            <div class="flex shrink-0 w-full h-[0.5rem] bg-[#F5F5F5]"></div>
            <ItemSection {quantity} onIncrementQuantity={incrementQuantity} onDecrementQuantity={decrementQuantity}/>
            <ShippingSection {shipping}/>
            <div class="flex shrink-0 w-full h-[0.5rem] bg-[#F5F5F5]"></div>
            <DiscountSection {shipping}/>
            <div class="flex shrink-0 w-full h-[0.5rem] bg-[#F5F5F5]"></div>
            <OverviewSection {shipping}/>
            <div class="flex shrink-0 w-full h-[0.5rem] bg-[#F5F5F5]"></div>
            <PaymentSection/>
            <div class="flex w-full p-[1rem]">
                <span class="text-black text-[0.84rem] leading-[1.12rem]">Ao fazer um pedido, você concorda com <b class="font-semibold">Termos de uso e venda do TikTok Shop</b> e reconhece que leu e concordou com a <b class="font-semibold">Política de privacidade do Tiktok</b>.</span>
            </div>
        </main>
        <footer class="flex flex-col w-full fixed bottom-0 left-0 z-50">
            <div class="flex items-center gap-[0.5rem] w-full px-[1rem] h-[2.6rem] bg-[#FFF2F5]">
                <svg class="w-[0.97rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 46 46">
                    <path fill="#FE2C55" d="M23 0c12.703 0 23 10.297 23 23S35.703 46 23 46 0 35.703 0 23 10.297 0 23 0Zm0 5C13.059 5 5 13.059 5 23s8.059 18 18 18 18-8.059 18-18S32.941 5 23 5Zm14 19c0 7.732-6.268 14-14 14S9 31.732 9 24h28Zm-21.483 5A8.99 8.99 0 0 0 23 33a8.99 8.99 0 0 0 7.483-4H15.517ZM15 14a6 6 0 0 1 6 6h-4a2 2 0 1 0-4 0H9a6 6 0 0 1 6-6Zm16 0a6 6 0 0 1 6 6h-4a2 2 0 1 0-4 0h-4a6 6 0 0 1 6-6Z"/>
                </svg>          
                <span class="text-[#FE2C55] text-[0.76rem] font-medium">Você está economizando R$ 39,37 nesse pedido.</span>
            </div>
            <div class="w-full border-t-[0.05rem] border-[#e0e0e0] bg-white">
                <div class="flex flex-col gap-[0.6rem] p-[1rem] pt-[0.7rem]">
                    <div class="flex justify-between items-center">
                        <span class="text-black text-[1rem] font-semibold leading-none">Total (1 item)</span>
                        <span class="text-[#FE2C55] text-[1rem] font-semibold">R$ 47,70</span>
                    </div>
                    <button class="flex flex-col justify-center items-center w-full h-[3rem] bg-[#FE2C55] rounded-lg hover:bg-[#E81D44] active:bg-[#E81D44] overflow-hidden" type="button">
                        <span class="text-white text-[0.96rem] font-medium leading-none">Fazer pedido</span>
                        <span class="text-white text-[0.675rem] font-medium leading-none mt-[0.3rem]">O cupom expira em 08:37:15</span>
                    </button>
                </div>
            </div>
        </footer>
    </div>
{:else}
    <FinalizeSkeleton/>
{/if}