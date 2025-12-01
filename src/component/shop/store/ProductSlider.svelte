<script>
    import { formatPrice } from "$lib/formating";

    let { products=[] } = $props();
</script>

<div class="flex w-full items-center relative">
    <div class="flex overflow-x-auto relative unselectable no-scrollbar">
        <ul class="flex items-center gap-[0.5rem]">
            <div class="flex w-[0.5rem]"></div>
            {#each products as product, index}
                <li class="flex flex-col">
                    <div class="flex w-[6rem] h-[6rem] rounded-lg bg-[#F6F6F6] bg-cover bg-center" style={`background-image: url('${product.medias?.find(image => image.index == 0)?.source}')`}></div>
                    <div class="flex items-baseline gap-[0.2rem] leading-none mt-[0.4rem]">
                        <span class="text-black text-[0.675rem] font-semibold">R$</span>
                        <span class="text-black text-[0.9rem] font-semibold">{formatPrice(product.prices?.reduce((a, b) => a.price < b.price ? a : b).price)}</span>
                    </div>
                    <div class="flex mt-[0.2rem]">
                        <div class="flex items-center justify-center rounded-sm px-[0.25rem] h-[1rem] bg-[#FEE5EA]">
                            <span class="text-[#E10543] text-[0.65rem] font-semibold leading-none">-{Math.round((product.prices?.reduce((a, b) => a.price < b.price ? a : b).discount / product.prices?.reduce((a, b) => a.price < b.price ? a : b).price) * 100)}%</span>
                        </div>
                    </div>
                </li>
            {/each}
            <div class="flex w-[0.8rem]"></div>
        </ul>
    </div>
</div>