<script>
    import { addHoursToDate, getSecondsBetweenDates } from "$lib/datetime";
    import { formatNumber, formatPrice, formatTimer } from "$lib/formating";
    import { onMount } from "svelte";

    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";
    
    let { suggestion } = $props();

    let timer = $state(null);
    let interval;

    const updateTimer = () => {
        timer = getSecondsBetweenDates(Date.now(), suggestion?.flash_sale);
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

<div class="rounded-lg overflow-hidden bg-white shadow-recommendations relative"  style="width: calc(50vw - 21px);">
    <div class="w-full pb-[100%] relative">
        <div class="absolute top-0 left-0 w-full h-full bg-[#eaeaea] bg-cover bg-center" style={suggestion?.image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${suggestion?.image?.source}')`}></div>
    </div>
    <div class="flex flex-col w-full bg-white px-[8px] pt-[12px] pb-[11px] overflow-hidden">
        <span class="inline-block max-w-full text-ellipsis text-black text-[14px] overflow-hidden whitespace-nowrap leading-none">{suggestion?.title}</span>
        <div class="flex items-baseline gap-[4px] mt-[8px]">
            <span class="text-[#FD2C55] text-[14px] font-semibold leading-none">R$<b class="text-[18px] font-semibold ps-[3px]">{formatPrice(suggestion?.price?.promotional)}</b></span>
            <span class="text-[#858585] text-[12px] line-through">R$ {formatPrice(suggestion?.price?.regular)}</span>
        </div>
        {#if suggestion?.flash_sale}
            <div class="flex mt-[4px]">
                <div class="flex items-center">
                    <div class={`flex items-center ${timer ? "rounded-s-sm" : "rounded-sm"} ps-[3px] pe-[3px] h-[16px] gap-[2px] bg-[#FE5C21]`}>
                        <svg class="h-[10px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 45">
                            <path fill="#fff" d="M8.525 0h19.649c2.519 0 2.595 1.554 1.557 3.625l-5.114 10.876h7.267c2 0 3.038 2.072 1.038 4.144l-22.84 25.377c-2.153 2.071-4.748.518-4.153-1.554l4.672-17.609H2.295C.22 24.86-.376 23.823.22 21.752L5.41 3.107C6.02 1.288 6.373 0 8.526 0Z"/>
                        </svg>                                  
                        <span class="text-white text-[11px] font-semibold leading-none whitespace-nowrap">Oferta Relâmpago</span>
                    </div>
                    {#if timer}
                        <div class="flex items-center rounded-e-sm ps-[3px] pe-[3px] h-[16px] gap-[2px] bg-[#FEF2EE]">
                            <div class="flex text-[#FE5C21] text-[11px] font-bold leading-none whitespace-nowrap gap-[1px] tabular-nums">{formatTimer(timer)}</div>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}
        <div class="flex items-center gap-[6px] mt-[10px]">
            <div class="flex items-center gap-[3px]">
                <svg class="w-[11px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                    <path fill="#FFC628" d="M18.8 3c.75-2 2.075-3 3.2-3s2.05 1 2.8 3l4.5 10.5 10.659 1c4.5.5 4.34 3 1.84 5.5l-8 7 2.5 12c.66 3.5-1.34 5-4.5 3L22 35.5s-6.694 4.567-9.701 6.5c-3.34 2.148-6 1-5-3l2.5-12-8-7c-2.84-2.5-2.34-5 1.66-5.5l11.34-1L18.8 3Z"/>
                </svg>
                <span class="text-[#444] text-[12px] leading-none">{suggestion?.rating}</span>
            </div>
            <svg class="w-[2px] h-[9px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 4 27">
                <path fill="#D9D9D9" d="M0 2a2 2 0 0 1 4 0v23a2 2 0 1 1-4 0V2Z"/>
            </svg>
            <span class="text-[#444] text-[12px] leading-none">{formatNumber(suggestion?.public_orders).en} vendidos</span>                    
        </div>
    </div>
</div>