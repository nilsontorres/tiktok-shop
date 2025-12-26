<script>
    import { formatPrice } from "$lib/formating";
    import { getLowestPrice } from "$lib/prices";
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    let { product={} } = $props();

    let price = $derived(getLowestPrice(product?.prices));
    let image = $derived(product?.images?.find(image => image.index == 0));
</script>

<li class="flex flex-col">
    <div class="flex w-[6rem] h-[6rem] rounded-lg bg-[#F6F6F6] bg-cover bg-center ponto-2" style={image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image?.source}')`}></div>
    <div class="flex items-baseline gap-[0.2rem] leading-none mt-[0.4rem]">
        <span class="text-black text-[0.675rem] font-semibold">R$</span>
        <span class="text-black text-[0.9rem] font-semibold">{formatPrice(price?.promotional)}</span>
    </div>
    <div class="flex mt-[0.2rem]">
        <div class="flex items-center justify-center rounded-sm px-[0.25rem] h-[1rem] bg-[#FEE5EA]">
            <span class="text-[#E10543] text-[0.65rem] font-semibold leading-none">-{Math.floor(((price?.regular - price?.promotional) / price?.regular) * 100)}%</span>
        </div>
    </div>
</li>