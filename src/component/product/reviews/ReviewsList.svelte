<script>
    import { useProductState } from "$state/product.svelte";

    import ReviewItem from "$component/product/reviews/ReviewItem.svelte";

    const product = useProductState();
</script>

<ul class="flex flex-col gap-4 px-4">
    {#each product?.reviews as review}
        <ReviewItem {review}/>
    {/each}
</ul>