<script>
    import { formatNumber } from "$lib/formating";

    import ReviewRating from "$component/shop/reviews/ReviewRating.svelte";
    import ReviewItem from "$component/shop/reviews/ReviewItem.svelte";

    let { reviews, product, store } = $props();
</script>

<div class="flex flex-col py-[1.1rem] bg-white">
    <div class="flex justify-between items-center px-4">
        <span class="text-black text-[0.93rem] font-semibold leading-none">Avaliações dos clientes ({formatNumber(product?.reviews).pt})</span>
        <div class="flex items-center gap-[0.4rem]">
            <span class="text-[0.8rem] text-[#696969] font-semibold leading-none">Ver mais</span>
            <svg class="min-h-[0.58rem] max-h-[0.6rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#696969" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </div>
    </div>
    <div class="flex items-center mt-[0.8rem] px-4 gap-[0.35rem]">
        <div class="flex items-center gap-[0.3rem] mt-[0.1rem]">
            <span class="text-[0.9rem] text-black font-medium">{product?.rating}</span>
            <span class="text-[0.8rem] text-[#777]">/5</span>
        </div>
        <ReviewRating
            rating={product?.rating}
            size={0.95}
            gap={0.25}
        />
    </div>
    <div class="mt-[0.85rem]">
        <ul class="flex flex-col gap-4 px-4">
            {#each reviews as review}
                <ReviewItem {review}/>
            {/each}
        </ul>
    </div>
    <span class="flexw-full h-[0.06rem] bg-[#f0f0f0] mx-4 mt-[1.1rem]"></span>
    <div class="flex justify-between items-center px-4 mt-[1.1rem]">
        <span class="text-black text-[0.93rem] font-semibold leading-none">Avaliações da loja ({formatNumber(store?.reviews).pt})</span>
        <div class="flex items-center gap-[0.4rem]">
            <svg class="min-h-[0.58rem] max-h-[0.6rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#696969" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </div>
    </div>
    <div class="px-4 mt-[1rem]">
        <div class="flex gap-[0.5rem]">
            <button type="button" class="flex items-center gap-[0.25rem] px-[0.5rem] h-[1.8rem] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm">
                <svg class="h-[0.62rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 29">
                    <path fill="#000" d="M17 0c6 0 8 4 8 4a9 9 0 0 1 9 9v7a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9v-7a9 9 0 0 1 9-9s2-4 8-4Zm0 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/>
                </svg>
                <span class="text-black text-[0.7rem] leading-none whitespace-nowrap">Inclui imagens ou vídeos ({Math.floor(store?.reviews * 0.14)})</span>                  
            </button>
            <button type="button" class="flex items-center gap-[0.25rem] px-[0.5rem] h-[1.8rem] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm">
                <span class="text-black text-[0.7rem] leading-none whitespace-nowrap">5</span>
                <svg class="w-[0.65rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                    <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                </svg>
                <span class="text-black text-[0.7rem] leading-none whitespace-nowrap">({Math.floor(store?.reviews * 0.32)})</span>
            </button>
            <button type="button" class="flex items-center gap-[0.25rem] px-[0.5rem] h-[1.8rem] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm">
                <span class="text-black text-[0.7rem] leading-none whitespace-nowrap">4</span>
                <svg class="w-[0.65rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                    <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                </svg>
                <span class="text-black text-[0.7rem] leading-none whitespace-nowrap">({Math.floor(store?.reviews * 0.07)})</span>
            </button>
        </div>
    </div>
</div>