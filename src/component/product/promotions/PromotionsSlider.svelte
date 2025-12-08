<script>
    import { useProductState } from "$state/product.svelte";
    import PromotionItem from "$component/product/promotions/PromotionItem.svelte";

    const product = useProductState();
</script>

<div class="flex overflow-x-auto relative no-selectable no-scrollbar">
    <ul class="flex items-center gap-[0.5rem]">
        <li class="flex w-[0.5rem]"></li>
        {#each product?.coupons as coupon, index}
            <PromotionItem variant="compact" {coupon}/>
        {/each}
        <li class="flex w-[0.5rem]"></li>
    </ul>
</div>