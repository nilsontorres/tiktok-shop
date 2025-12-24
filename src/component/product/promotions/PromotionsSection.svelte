<script>
    import { useProductState } from "$state/product.svelte";
    import PromotionItem from "$component/product/promotions/PromotionItem.svelte";
    import PromotionsDrawer from "$component/product/promotions/PromotionsDrawer.svelte";

    let drawer = $state();
    let product = useProductState();
</script>

<PromotionsDrawer bind:this={drawer} />

<button type="button" class="flex w-full flex-col py-[1.1rem] bg-white" onclick={() => drawer.openDrawer()}>
    <div class="flex w-full justify-between items-center px-4">
        <span class="text-black text-[0.93rem] font-semibold leading-none">Ofertas</span>
        <svg class="min-w-[0.33rem] max-w-[0.33rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
            <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
        </svg>
    </div>
    <div class="flex w-full overflow-hidden items-center mt-[0.8rem]">
        <div class="flex w-full items-center relative">
            <div class="flex overflow-x-auto relative no-selectable transparent-scroll">
                <ul class="flex items-center gap-[0.5rem]">
                    <li class="flex w-[0.5rem]"></li>
                    {#each product?.coupons as coupon, index}
                        <PromotionItem variant="compact" {coupon}/>
                    {/each}
                    <li class="flex w-[0.5rem]"></li>
                </ul>
            </div>
        </div>
    </div>
</button>