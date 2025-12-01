<script>
    import { maskWords } from "$lib/formating";
    import RatingStars from "$component/shop/reviews/RatingStars.svelte";

    let { reviews=[] } = $props();
</script>

<ul class="flex flex-col gap-4 px-4">
    {#each reviews as review}
        <li class="flex flex-col">
            <div class="flex items-center gap-[0.5rem]">
                <div class="block w-[1.46rem] h-[1.46rem] bg-cover bg-center rounded-full" style={`background-image: url('${review.user?.media?.source}')`}></div>
                <span class="text-black text-[0.8rem] font-semibold">{maskWords(review.user?.fullname)}</span>
            </div>
            <div class="mt-[0.45rem]">
                <RatingStars rating={review.rating}/>
            </div>
            <span class="text-[#666] text-[0.8rem] mt-[0.35rem]">Item: {review.item}</span>
            <p class="text-black text-[0.9rem] leading-[1.2rem] mt-[0.4rem]">{@html review.body}</p>
            {#if review.medias?.length > 0}
                <div class="flex gap-[0.5rem] mt-[0.5rem] relative mb-[0.2rem]">
                    {#each review.medias as media, index}
                        {#if index <= 3}
                            <div class="pb-[25%] relative overflow-hidden rounded-md bg-center bg-cover" style={`min-width: calc(25% - 0.35rem); max-width: calc(25% - 0.35rem); background-image: url('${media?.source}')`}>
                                {#if index == 3 && review.medias.length > 4}
                                    <div class="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-[#0000003e]">
                                        <span class="text-white text-[1rem] font-semibold">+{review.medias.length - 4}</span>
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    {/each}
                </div>
            {/if}
        </li>
    {/each}
</ul>