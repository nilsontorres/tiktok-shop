<script>
    import { getSecondsBetweenDates } from "$lib/datetime";
    import { formatTimer, formatPrice } from "$lib/formating";
    import { getLowestPrice, isDifferentPrices } from "$lib/prices";
    import { onMount } from "svelte";

    let { prices=[], coupon=false, expiration } = $props();

    let timer = $state(null);
    let interval;

    const updateTimer = () => {
        timer = getSecondsBetweenDates(Date.now(), expiration);
    }

    let price = $derived(getLowestPrice(prices));

    onMount(async () => {
        if(expiration){
            timer = getSecondsBetweenDates(Date.now(), expiration);
            interval = setInterval(updateTimer, 1000);

            return () => {
                clearInterval(interval);
            }
        }
    });
</script>

<div class="flex justify-between items-center w-full h-16 bg-linear-to-r from-[#FF2C56] to-[#FF731B] from-40%">
    <div class="flex flex-col justify-center items-start gap-[0.1rem] mt-1 ps-4 whitespace-nowrap">
        <div class="flex items-start gap-[0.25rem]">
            <div class="flex px-[0.25rem] h-[1.4rem] justify-center items-center bg-white rounded-sm">
                <span class="text-[#DF0644] font-semibold text-[0.875rem] leading-none mt-[0.12rem]">-{Math.floor(((price?.regular - price?.promotional) / price?.regular) * 100)}%</span>
            </div>
            <div class="flex items-baseline leading-none">
                {#if isDifferentPrices(prices)}
                    <span class="text-white text-[0.75rem] font-semibold ms-[0.2rem]">A partir de</span>
                {/if}
                <span class="text-white text-[1rem] font-semibold ms-[0.25rem]">R$ <b class="text-[1.4rem] font-semibold">{formatPrice(price?.promotional)}</b></span>
                {#if coupon}
                    <svg class="w-[0.84rem] h-[0.74rem] ms-[0.2rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 34">
                        <path fill="#FFF" d="M38 0a6 6 0 0 1 6 6v6a5 5 0 0 0 0 10v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6v-6a5 5 0 0 0 0-10V6a6 6 0 0 1 6-6h32ZM7 4a3 3 0 0 0-3 3v2s5.5 1.5 5.5 8S4 25 4 25v2a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-2s-5.5-1.5-5.5-8S40 9.5 40 9.5V7a3 3 0 0 0-3-3H7Zm25.5 7.5L21 27l-8-8.5 3-3 4.5 5L29 9l3.5 2.5Z"/>
                    </svg>
                {/if}
            </div>
        </div>
        <span class="text-white text-[0.75rem] font-medium opacity-70 line-through mt-[0.35rem]">R$ {formatPrice(price?.regular)}</span>
    </div>
    <div class="flex w-full justify-end relative">
        <svg class="h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 513 190">
            <path fill="url(#a)" fill-opacity=".1" d="M28.142 0H513v190H43.142L58.5 128.5H19.642c-16.756 1.099-22.917-7.725-18-25L28.142 0Z"/>
            <defs>
                <linearGradient id="a" x1="24" x2="535" y1="26" y2="190" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#fff"/>
                    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
                </linearGradient>
            </defs>
        </svg>          
        <div class="flex flex-col items-end w-full absolute top-0 right-0 pe-3">
            <div class="flex items-center gap-[0.2rem] mt-[0.6rem]">
                <svg class="min-w-3 max-w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 45">
                    <path fill="#fff" d="M8.525 0h19.649c2.519 0 2.595 1.554 1.557 3.625l-5.114 10.876h7.267c2 0 3.038 2.072 1.038 4.144l-22.84 25.377c-2.153 2.071-4.748.518-4.153-1.554l4.672-17.609H2.295C.22 24.86-.376 23.823.22 21.752L5.41 3.107C6.02 1.288 6.373 0 8.526 0Z"/>
                </svg>
                <span class="text-white text-[0.75rem] font-semibold">Oferta Relâmpago</span>
            </div>
            <span class="text-white text-[0.775rem] font-medium mt-[0.5rem]">Termina em {formatTimer(timer)}</span>
        </div>
    </div>
</div>