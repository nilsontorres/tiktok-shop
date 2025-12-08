<script>
    import { useProductState } from "$state/product.svelte";
    import { getSecondsBetweenDates } from "$lib/datetime";

    import PriceDrawer from "$component/shop/prices/PriceDrawer.svelte";
    import LightningPrice from "$component/shop/prices/LightningPrice.svelte";
    import NormalPrice from "$component/shop/prices/NormalPrice.svelte";

    let { price={} } = $props();

    let product = useProductState();
    let drawer = $state();
</script>

<PriceDrawer bind:this={drawer} price={price}/>

<button type="button" onclick={() => drawer.openDrawer()}>
    {#if product?.lightning && getSecondsBetweenDates(Date.now(), product?.lightning) > 0}
        <LightningPrice prices={product?.prices} expiration={product?.lightning}/>
    {:else}
        <NormalPrice prices={product?.prices}/>
    {/if}
</button>