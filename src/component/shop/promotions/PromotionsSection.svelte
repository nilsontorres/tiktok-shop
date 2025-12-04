<script>
    import PromotionsDrawer from "$component/shop/promotions/PromotionsDrawer.svelte";
    import PromotionsSlider from "$component/shop/promotions/PromotionsSlider.svelte";

    let { coupons=[] } = $props();

    let drawer = $state();
</script>

<PromotionsDrawer bind:this={drawer} {coupons} />

<button type="button" class="flex w-full flex-col py-[1.1rem] bg-white" onclick={() => drawer.openDrawer()}>
    <div class="flex w-full justify-between items-center px-4">
        <span class="text-black text-[0.93rem] font-semibold leading-none">Ofertas</span>
        <svg class="min-w-[0.33rem] max-w-[0.33rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
            <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
        </svg>
    </div>
    <div class="flex w-full overflow-hidden items-center mt-[0.8rem]">
        <div class="flex w-full items-center relative">
            <PromotionsSlider {coupons}/>
        </div>
    </div>
</button>