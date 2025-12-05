<script>
    import { maskWords } from "$lib/formating";
    import ReviewRating from "$component/shop/reviews/ReviewRating.svelte";
    import ReviewItem from "./ReviewItem.svelte";

    let { reviews=[] } = $props();
</script>

<ul class="flex flex-col gap-4 px-4">
    {#each reviews as review}
        <ReviewItem {review}/>
    {/each}
</ul>