<script>
    import { getSecondsBetweenDates } from "$lib/datetime";
    import { onMount } from "svelte";

    import PriceDrawer from "$component/shop/product/prices/PriceDrawer.svelte";
    import FlashPrice from "$component/shop/product/prices/FlashPrice.svelte";
    import NormalPrice from "$component/shop/product/prices/NormalPrice.svelte";

    let { product, price, prices, updateScroll=()=>{} } = $props();

    let drawer = $state(null);
</script>

<PriceDrawer bind:this={drawer} {product} {price} {updateScroll}/>

<button type="button" onclick={() => drawer.openDrawer()}>
    {#if product?.flash_sale && getSecondsBetweenDates(Date.now(), product?.flash_sale) > 0}
        <FlashPrice {product} {price} {prices}/>
    {:else}
        <NormalPrice {product} {price} {prices}/>
    {/if}
</button>