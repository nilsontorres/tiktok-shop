<script>
    import { maskWords } from "$lib/formating";
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    import ReviewRating from "$component/shop/reviews/ReviewRating.svelte";

    let { review={} } = $props();
</script>

<li class="flex flex-col">
    <div class="flex items-center gap-[0.5rem]">
        <div class="block w-[1.46rem] h-[1.46rem] bg-cover bg-center rounded-full" style={review.user?.image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${review.user?.image?.source}')`}></div>
        <span class="text-black text-[0.8rem] font-semibold">{maskWords(review.user?.fullname)}</span>
    </div>
    <div class="mt-[0.45rem]">
        <ReviewRating rating={review.rating}/>
    </div>
    <span class="text-[#666] text-[0.8rem] mt-[0.35rem]">Item: {review.item}</span>
    <p class="text-black text-[0.9rem] leading-[1.2rem] mt-[0.4rem]">{@html review.content}</p>
    {#if review.images?.length > 0}
        <div class="flex gap-[0.5rem] mt-[0.5rem] relative mb-[0.2rem]">
            {#each review.images as image, index}
                {#if index <= 3}
                    <div class="pb-[25%] relative overflow-hidden rounded-md bg-center bg-cover" style={`min-width: calc(25% - 0.35rem); max-width: calc(25% - 0.35rem); ${image.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image.source}')`}`}>
                        {#if index == 3 && review.images.length > 4}
                            <div class="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-[#0000003e]">
                                <span class="text-white text-[1rem] font-semibold">+{review.images.length - 4}</span>
                            </div>
                        {/if}
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</li>