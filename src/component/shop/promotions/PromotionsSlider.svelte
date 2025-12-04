<script>
    import PromotionItem from "$component/shop/promotions/PromotionItem.svelte";

    let {
        coupons=[]
    } = $props();
</script>

<div class="flex overflow-x-auto relative no-selectable no-scrollbar">
    <ul class="flex items-center gap-[0.5rem]">
        <li class="flex w-[0.5rem]"></li>
        {#each coupons as coupon, index}
            <PromotionItem variant="compact" {coupon}/>
        {/each}
        <li class="flex w-[0.5rem]"></li>
    </ul>
</div>