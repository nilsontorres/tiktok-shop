<script>
    import { useProductState } from "$state/product.svelte";

    const product = useProductState();
</script>

{#each product?.images as media}
    <img class="w-0 h-0" src={media.source} alt="pre-loading"/>
{/each}
{#each product?.variations as variation}
    {#if variation.type == "image"}
        {#each variation.variants as variant}
            <img class="w-0 h-0" src={variant.image?.source} alt="pre-loading"/> 
        {/each}
    {/if}
{/each}