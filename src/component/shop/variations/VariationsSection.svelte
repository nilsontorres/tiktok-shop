<script>
    import { useProductState } from "$state/product.svelte";
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";

    import VariationDrawer from "$component/shop/variations/VariationsDrawer.svelte";

    let drawer = $state();
    let product = useProductState();

    const updateVariant = (new_variant) => {
        product?.variations?.forEach((variation, i) => {
            variation?.variants.forEach((variant, j) => {
                if(variant.variation.id == new_variant.variation.id){
                    product.variations[i].variants[j].selected = false;
                }
                if(variant.id == new_variant.id){
                    product.variations[i].variants[j].selected = !product.variations[i].variants[j].selected;
                }
            });
        });
    }
</script>

<VariationDrawer bind:this={drawer} onChangeVariant={updateVariant}/>

<button onclick={() => drawer.openDrawer()} type="button" aria-label="Variações" class="flex w-full justify-between items-center gap-[0.3rem] mt-[0.8rem]">
    <div class="flex items-center gap-[0.6rem]">
        <svg class="min-w-[0.92rem] max-w-[0.92rem] h-[0.88rem] mt-[0.1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 39">
            <path fill="#202020" d="M15 21a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V24a3 3 0 0 1 3-3h12Zm21 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3V24a3 3 0 0 1 3-3h12ZM4 35h10V25H4v10Zm21 0h10V25H25v10ZM15 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h12Zm21 0a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h12ZM4 14h10V4H4v10Zm21 0h10V4H25v10Z"/>
        </svg>                  
        <div class="flex items-center gap-[0.6rem]">
            <ul class="flex items-center gap-[0.3rem]">
                {#each product?.variations?.find(v => v.type == "image")?.variants as variant}
                    <li class="w-8 h-8 rounded-sm overflow-hidden bg-cover bg-center" style={variant.image?.source && `background-image: url('${PUBLIC_UPLOAD_BASE}/${variant.image?.source}')`}></li>   
                {/each}
            </ul>
            <span class="text-[#858585] text-[0.775rem]">{product?.variations[0]?.variants?.length} opções disponíveis</span>
        </div>
    </div>
    <div class="flex items-center h-full">
        <svg class="min-w-[0.33rem] max-w-[0.33rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
            <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
        </svg>
    </div>
</button>