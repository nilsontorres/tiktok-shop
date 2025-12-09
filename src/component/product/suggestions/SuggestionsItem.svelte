<script>
    import { addHoursToDate, getSecondsBetweenDates } from "$lib/datetime";
    import { getLowestPrice } from "$lib/prices";
    import { formatNumber, formatPrice } from "$lib/formating";
    import { onMount } from "svelte";

    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";
    
    let { suggestion={} } = $props();

    let timer = $state(null);
    let interval;

    const updateTimer = () => {
        timer = getSecondsBetweenDates(Date.now(), suggestion.lightning);
    }
    const formatTimer = (value) => {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        const seconds = Math.floor(value % 60);

        const pad = num => String(num).padStart(2, '0');
        return `<span>${pad(hours)}</span><span>:</span><span>${pad(minutes)}</span><span>:</span><span>${pad(seconds)}</span>`;
    }
    const getCouponTitle = (coupon) => {
        if(coupon.type == "variable" && !coupon.minimum && !coupon.limit){
            return `${Math.floor(coupon.discount * 100)} OFF`;
        }
        else if(coupon.limit){
            return `Desconto de ${coupon.type == "variable" ? `${Math.floor(coupon.discount * 100)}%` : `R$ ${formatPrice(coupon.discount)}`}, máximo de R$ ${formatPrice(coupon.limit)}`;
        }
        else if(coupon.minimum){
            return `Ganhe ${coupon.type == "variable" ? `${Math.floor(coupon.discount * 100)}%` : `R$ ${formatPrice(coupon.discount)}`} de desconto`;
        }
        else{
            return `Desconto de ${coupon.type == "variable" ? `${Math.floor(coupon.discount * 100)}%` : `R$ ${formatPrice(coupon.discount)}`}`;
        }
    }

    let price = $derived(getLowestPrice(suggestion.prices));
    let image = $derived(suggestion.images?.find(image => image.index == 0));

    onMount(() => {
        if(suggestion.flash_sale){
            const difference = getSecondsBetweenDates(Date.now(), suggestion.flash_sale);
            if(difference >= 0 && difference < 86400){
                timer = difference;
                interval = setInterval(updateTimer, 1000);

                return () => {
                    clearInterval(interval);
                }
            }
        }
    });
</script>

<div class="rounded-lg overflow-hidden bg-white shadow-recommendations relative"  style="width: calc(50vw - 1.28rem);">
    <div class="w-full pb-[100%] relative">
        <div class="absolute top-0 left-0 w-full h-full bg-[#eaeaea] bg-cover bg-center" style={image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image?.source}')`}></div>
    </div>
    <div class="flex flex-col w-full bg-white px-[0.5rem] pt-[0.75rem] pb-[0.7rem] overflow-hidden">
        <span class="inline-block max-w-full text-ellipsis text-black text-[0.875rem] overflow-hidden whitespace-nowrap leading-none">{suggestion.title}</span>
        <div class="flex items-baseline gap-[0.25rem] mt-[0.5rem]">
            <span class="text-[#FD2C55] text-[0.85rem] font-semibold leading-none">R$<b class="text-[1.1rem] font-semibold ps-[0.15rem]">{formatPrice(price.promotional)}</b></span>
            <span class="text-[#858585] text-[0.75rem] line-through">R$ {formatPrice(price.regular)}</span>
        </div>
        {#if suggestion.lightning}
            <div class="flex mt-[0.25rem]">
                <div class="flex items-center">
                    <div class={`flex items-center ${timer ? "rounded-s-sm" : "rounded-sm"} ps-[0.2rem] pe-[0.2rem] h-[1rem] gap-[0.15rem] bg-[#FE5C21]`}>
                        <svg class="h-[0.6rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 45">
                            <path fill="#fff" d="M8.525 0h19.649c2.519 0 2.595 1.554 1.557 3.625l-5.114 10.876h7.267c2 0 3.038 2.072 1.038 4.144l-22.84 25.377c-2.153 2.071-4.748.518-4.153-1.554l4.672-17.609H2.295C.22 24.86-.376 23.823.22 21.752L5.41 3.107C6.02 1.288 6.373 0 8.526 0Z"/>
                        </svg>                                  
                        <span class="text-white text-[0.68rem] font-semibold leading-none whitespace-nowrap">Oferta Relâmpago</span>
                    </div>
                    {#if timer}
                        <div class="flex items-center rounded-e-sm ps-[0.2rem] pe-[0.2rem] h-[1rem] gap-[0.15rem] bg-[#FEF2EE]">
                            <div class="flex text-[#FE5C21] text-[0.7rem] font-bold leading-none whitespace-nowrap gap-[0.06rem]">{@html formatTimer(timer)}</div>
                        </div>
                    {/if}
                </div>
            </div>
        {:else if suggestion.coupons?.length > 0}
            <div class="flex mt-[0.25rem]">
                <div class="flex items-center ps-[0.15rem] pe-[0.3rem] h-[1rem] gap-[0.1rem] rounded-sm bg-[#FFE5EA]">
                    <svg class="w-[1rem] h-[0.57rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 37 28">
                        <path fill="#E10543" d="M21 5h4V0h7c2 0 5 2.5 5 4.5V11h-2a3 3 0 1 0 0 6h2v6.5c0 2-2.5 4.5-5 4.5h-7v-5h-4v5H5c-2.5 0-5-2.5-5-4.5V17h2a3 3 0 1 0 0-6H0V4.5C0 2.5 3 0 5 0h16v5Zm0 14h4v-3h-4v3Zm0-7h4V9h-4v3Z"/>
                    </svg>                          
                    <span class="text-[#E10543] text-[0.7rem] font-semibold leading-none">{getCouponTitle(suggestion.coupons[0])}</span>
                </div>
            </div>
        {/if}
        <div class="flex items-center gap-[0.35rem] mt-[0.6rem]">
            <div class="flex items-center gap-[0.2rem]">
                <svg class="w-[0.7rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                    <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                </svg>
                <span class="text-[#444] text-[0.75rem] leading-none">{suggestion.rating}</span>
            </div>
            <svg class="w-[0.14rem] h-[0.56rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 4 27">
                <path fill="#D9D9D9" d="M0 2a2 2 0 0 1 4 0v23a2 2 0 1 1-4 0V2Z"/>
            </svg>
            <span class="text-[#444] text-[0.75rem] leading-none">{formatNumber(suggestion.sales).en} vendidos</span>                    
        </div>
    </div>
</div>