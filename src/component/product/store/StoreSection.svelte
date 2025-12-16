<script>
    import { useProductState } from "$state/product.svelte";
    import { onMount } from "svelte";
    import { formatNumber } from "$lib/formating";
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    import ProductItem from "$component/product/store/ProductItem.svelte";

    let ready = $state(false);
    let product = useProductState();

    onMount(async () => {
        await product?.loadStoreProducts(() => {
            console.log("Loading store products");
            ready = true;
        });
    });
</script>

<div class="flex flex-col py-[1rem] bg-white">
    <div class="flex justify-between items-center px-4">
        <div class="flex items-center gap-[0.75rem]">
            <div class="w-[3.5rem] h-[3.5rem] bg-center bg-cover rounded-full" style={product?.store?.image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${product?.store?.image?.source}');`}></div>
            <div class="flex flex-col">
                <span class="text-black text-[0.9rem] font-semibold">{product?.store?.title}</span>
                <span class="text-[#666] text-[0.775rem] leading-none mt-[0.15rem]">{formatNumber(product?.store?.total_sales).en} vendido(s)</span>
            </div>
        </div>
        <button type="button" class="flex items-center gap-[0.25rem] px-[1.2rem] h-[1.8rem] bg-[#F2F2F2] active:bg-[#e3e3e3] rounded-sm">
            <span class="text-black text-[0.875rem] font-semibold">Visitar</span>
        </button>
    </div>
    <span class="flexw-full h-[0.06rem] bg-[#f0f0f0] mx-4 mt-[0.8rem]"></span>
    <div class="flex justify-between items-center px-4 mt-[0.85rem]">
        <span class="text-[#444] text-[0.8rem] font-semibold leading-none">Mais desta loja</span>
        <div class="flex items-center gap-[0.4rem]">
            <svg class="min-h-[0.58rem] max-h-[0.6rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#696969" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </div>
    </div>
    <div class="w-full mt-[0.8rem]">
        <div class="flex w-full items-center relative">
            <div class="flex overflow-x-auto relative no-selectable transparent-scrollbar">
                {#if product?.store?.products}
                    <ul class="flex items-center gap-[0.5rem]">
                        <div class="flex w-[0.5rem]"></div>
                        {#each product?.store?.products as product}
                            <ProductItem product={product}/>
                        {/each}
                        <div class="flex w-[0.8rem]"></div>
                    </ul>
                {:else}
                    <ul class="flex gap-[0.5rem]">
                        <div class="flex w-[0.5rem]"></div>
                        {#each Array(6) as item}
                            <li class="flex flex-col gap-[0.5rem]">
                                <div class="w-[6rem] h-[6rem] rounded-lg skeleton"></div>
                                <div class="w-[3rem] h-[1.1rem] rounded-sm skeleton"></div>
                            </li>
                        {/each}
                        <div class="flex w-[0.8rem]"></div>
                    </ul>
                {/if}
            </div>
        </div>
    </div>
</div>