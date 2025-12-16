<script>
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";
    
    let { variation={}, onChangeVariant=()=>{} } = $props();
</script>

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