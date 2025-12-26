<script>
    import { formatPrice } from "$lib/formating";
    import { onMount } from "svelte";
    import { getLowestPrice, isDifferentPrices } from "$lib/prices";

    let { prices=[], coupon=false } = $props();
    
    let price = $derived(getLowestPrice(prices));
</script>

<div class="flex justify-between items-center w-full pt-[1rem] pb-[0.15rem] bg-white">
    <div class="flex items-start gap-[0.25rem] ps-4 whitespace-nowrap">
        <div class="flex items-start gap-[0.25rem]">
            <div class="flex px-[0.25rem] h-[1.4rem] justify-center items-center bg-[#FE2C55] rounded-sm">
                <span class="text-white font-semibold text-[0.875rem] leading-none mt-[0.12rem]">-{Math.floor(((price?.regular - price?.promotional) / price?.regular) * 100)}%</span>
            </div>
            <div class="flex items-baseline leading-none">
                {#if isDifferentPrices(prices)}
                    <span class="text-[#DF0644] text-[0.75rem] font-semibold ms-[0.2rem]">A partir de</span>
                {/if}
                <span class="text-[#DF0644] text-[0.9rem] font-semibold ms-[0.25rem]">R$ <b class="text-[1.4rem] font-semibold">{formatPrice(price?.promotional)}</b></span>
            </div>
        </div>
        {#if coupon}
            <svg class="h-[0.68rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 34">
                <path fill="#E10543" d="M38 0a6 6 0 0 1 6 6v6a5 5 0 0 0 0 10v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6v-6a5 5 0 0 0 0-10V6a6 6 0 0 1 6-6h32ZM7 4a3 3 0 0 0-3 3v2s5.5 1.5 5.5 8S4 25 4 25v2a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-2s-5.5-1.5-5.5-8S40 9.5 40 9.5V7a3 3 0 0 0-3-3H7Zm25.5 7.5L21 27l-8-8.5 3-3 4.5 5L29 9l3.5 2.5Z"/>
            </svg>
        {/if}          
        <span class="text-[#666] text-[0.75rem] font-medium opacity-70 line-through mt-[0.35rem]">R$ {formatPrice(price?.regular)}</span>
    </div>
</div>