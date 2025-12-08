<script>
    import { useProductState } from "$state/product.svelte";
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    import QuantityField from "$component/product/variations/QuantityField.svelte";

    let {
        shipping={},
        onChangeVariant=()=>{}
    } = $props();

    let product = useProductState();

    let container = $state(null);
    let is_open = $state(false);

    let image = $derived(product?.variations.find(v => v.type == "image")?.variants.find(v => v.selected)?.image || product?.variations?.find(v => v.type == "image")?.variants[0].image);

    export const openDrawer = () => {
        is_open = true;
    }
    export const closeDrawer = () => {
        container.scrollTo({ top: 0, behavior: "instant" });
        is_open = false;
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!is_open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${is_open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${is_open ? "translate-y-0" : "translate-y-[100%]"} h-[70%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-3 right-3 p-2 z-50" onclick={closeDrawer}>
            <svg class="min-w-[0.85rem] max-w-[0.85rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex w-full gap-[0.75rem] p-4">
            <div class="flex min-w-[6rem] max-w-[6rem] min-h-[6rem] max-h-[6rem] rounded-lg bg-[#F6F6F6] bg-contain bg-center" style={image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${image?.source}')`}></div>
            <div class="flex flex-col w-full justify-between relative overflow-hidden">
                <div class="flex flex-col">
                    <div class="flex items-center gap-2">
                        <div class="flex w-11 h-[1.4rem] justify-center items-center bg-[#FE2C55] rounded-sm">
                            <span class="text-white font-semibold text-[0.875rem] leading-none">-72%</span>
                        </div>
                        <div class="text-[#E10543] text-[1rem] font-semibold leading-none"><span class="text-[0.775rem] font-semibold">A partir de</span> R$ <span class="text-[1.4rem] font-semibold">28,10</span></div>
                    </div>
                    <div class="mt-[0.15rem]">
                        <span class="text-black text-[0.75rem] font-medium opacity-50 line-through">R$ 98,90</span>
                    </div>
                    {#if shipping.total == 0}
                        <div class="flex w-full">
                            <div class="flex items-center bg-[#E7F9F9] border-[0.063rem] border-[#C5F0F0] h-[1.25rem] px-[0.2rem] gap-[0.15rem] rounded-sm mt-[0.15rem]">
                                <svg class="min-w-[0.75rem] max-w-[0.75rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 31">
                                    <path fill="#13C2C2" d="M20.583 0c2.375 0 3.959 1.583 3.959 3.563v1.979h4.75c1.98 0 6.333 5.937 6.333 11.083v6.333c0 1.98-.396 3.167-2.375 3.167h-3.398a5.542 5.542 0 0 1-10.622 0h-6.003a5.542 5.542 0 0 1-10.623-.007C1.104 26.012 0 24.485 0 22.958V19c.088-.97.175-2.037.259-3.167h7.658v-3.167H.47c.062-1.04.119-2.102.166-3.166h11.239V6.333H.745c.028-1.085.047-2.149.047-3.166C.792 1.187 1.583 0 3.562 0h17.021ZM7.917 22.167a2.375 2.375 0 1 0 0 4.75 2.375 2.375 0 0 0 0-4.75Zm16.625 0a2.375 2.375 0 1 0 0 4.75 2.375 2.375 0 0 0 0-4.75Zm0-12.667v5.542h6.728c0-2.77-2.374-5.542-4.353-5.542h-2.375Z"/>
                                </svg>                                  
                                <span class="text-[#13C2C2] text-[0.6rem] font-semibold leading-none">Frete grátis</span>
                            </div>
                        </div>
                    {/if}
                </div>
                <span class="inline-block max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-[#707070] text-[0.775rem]">
                    {product?.variations?.flatMap(variation => variation.variants).filter(variant => variant.selected).map(variant => variant.label).join(", ")}
                </span>
            </div>
        </div>
        <div class="flex w-full px-4">
            <span class="w-full h-[0.05rem] bg-[#E8E8E8]"></span>
        </div>
        <div class=" overflow-y-auto overscroll-y-contain no-scrollbar" bind:this={container}>
            <span class="flex w-full h-3"></span>
            {#each product?.variations as variation}
                <div class="flex flex-col px-4">
                    <span class="text-[#595959] text-[0.85rem] font-semibold">{variation.title}</span>
                    <div class="flex flex-wrap gap-[0.5rem] mt-[0.5rem]">
                        {#each variation.variants as variant}
                            {#if variation.type == "text"}
                                <button onclick={() => { onChangeVariant(variant); }} type="button" class={`flex justify-center items-center px-2 h-[1.95rem] border-[0.063rem] ${variant.selected ? "border-[#FE2C55] text-[#FE2C55]" : "border-[#D3D3D3] text-black"} rounded-md overflow-hidden`}>
                                    <span class="inline-block max-w-full text-ellipsis overflow-hidden whitespace-nowrap text-[0.75rem]">{variant?.value}</span>
                                </button>
                            {:else if variation.type == "image"}
                                <button onclick={() => { onChangeVariant(variant); }} type="button" class={`flex w-[6rem] flex-col justify-center items-center border-[0.063rem] ${variant.selected ? "border-[#FE2C55] text-[#FE2C55]" : "border-[#D3D3D3] text-black"} rounded-md overflow-hidden`}>
                                    <div class="flex w-[6rem] h-[6rem] bg-contain bg-center bg-[#F6F6F6]" style={`background-image: url('${PUBLIC_UPLOAD_BASE}/${variant?.image?.source}')`}></div>
                                    <span class="inline-block max-w-full text-ellipsis overflow-hidden whitespace-nowrap w-full text-center text-[0.75rem] py-[0.25rem] px-[0.4rem]">{variant?.value}</span>
                                </button>
                            {/if}
                        {/each}
                    </div>
                </div>
                <span class="flex w-full h-6"></span>
            {/each}
            <div class="flex justify-between items-center px-4 mt-[0.5rem]">
                <span class="text-[#595959] text-[0.85rem] font-semibold">Quantidade</span>
                <QuantityField quantity={product.quantity} onIncrementQuantity={product.incrementQuantity} onDecrementQuantity={product.decrementQuantity}/>
            </div>
            <span class="flex w-full h-25"></span>
        </div>
        <div class="flex absolute bottom-0 left-0 w-full p-3 gap-3 bg-white border-t-[0.063rem] border-[#E8E8E8]">
            <button class="flex justify-center items-center px-3 bg-[#F2F2F2] active:bg-[#e4e4e4] h-11 rounded-lg" type="button">
                <span class="text-black text-[0.96rem] font-semibold whitespace-nowrap">Adicionar ao carrinho</span>
            </button>
            <button type="button" title="Adicionar ao carrinho" class="flex flex-col justify-center w-full h-11 gap-1 px-2 items-center bg-[#FE2C55] rounded-lg hover:bg-[#E81D44] active:bg-[#E81D44] overflow-hidden">
                <span class="text-white text-[1rem] font-semibold leading-none">R$ 28,10</span>
                <span class=" inline-block max-w-full text-ellipsis whitespace-nowrap overflow-hidden text-white text-[0.675rem] font-medium leading-none">Compre pelo preço de Oferta relâmpago</span>
            </button>
        </div>
    </div>
</div>