<script>
    import { useProductState } from "$state/product.svelte";
    import { getSecondsBetweenDates } from "$lib/datetime";

    import PriceDrawer from "$component/product/prices/PriceDrawer.svelte";
    import FlashPrice from "$component/product/prices/FlashPrice.svelte";
    import NormalPrice from "$component/product/prices/NormalPrice.svelte";

    let { price={} } = $props();

    let product = useProductState();
    let drawer = $state();
</script>

<PriceDrawer bind:this={drawer} price={price}/>

<button type="button" onclick={() => drawer.openDrawer()}>
    {#if product?.flash_sale && getSecondsBetweenDates(Date.now(), product?.flash_sale) > 0}
        <FlashPrice prices={product?.prices} expiration={product?.flash_sale}/>
    {:else}
        <NormalPrice prices={product?.prices}/>
    {/if}
</button>