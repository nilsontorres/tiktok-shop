<script>
    import { formatPrice } from "$lib/formating";
    import { getShippingRange } from "$lib/shipping";
    
    let { shipping } = $props();

    let deadline = $derived(getShippingRange(shipping?.delivery));
</script>

<div class="flex flex-col w-full px-[16px] py-[16px] bg-[#F0FBFB]">
    <div class="flex w-full justify-between items-center text-[13px]">
        <b class="text-black font-semibold leading-none">Receba até {deadline?.from}<span class="px-[2px]">-</span>{deadline?.to}</b>
        <b class="text-black font-semibold leading-none">R$ {formatPrice(shipping?.price?.promotional, true)} <span class="line-through font-medium text-[#7D8383]">R$ {formatPrice(shipping?.price?.regular, true)}</span></b>
    </div>
    <span class="text-black text-[13px] leading-none mt-[12px]">{shipping?.name}</span>
</div>