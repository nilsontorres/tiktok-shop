<script>
    import { useProductState } from "$state/product.svelte";
    import { onMount } from "svelte";
    import { visible } from "$action/visible";

    import SuggestionsItem from "$component/product/suggestions/SuggestionsItem.svelte";

    let { scroll=0, onUpdateSection=()=>{} } = $props();

    let component = $state();
    let product = useProductState();

    const onVisible = async () => {
        if(!product.suggestions){
            product.loadProductSuggestions();
        }
    }

    $effect(() => {
        const { top } = component?.getBoundingClientRect();
        onUpdateSection("suggestions", top+scroll-90);
    });
</script>

<div class="flex flex-col py-[1rem] mt-[0.35rem]" bind:this={component} use:visible={onVisible}>
    {#if product.suggestions}
        <div class="flex justify-between items-center px-4">
            <span class="text-black text-[0.93rem] font-semibold leading-none">Você também pode gostar</span>
        </div>
        <div class="w-full px-4 mt-[1.25rem]">
            <div class="flex flex-wrap w-full relative gap-[0.55rem]">
                {#each product.suggestions as suggestion}
                    <SuggestionsItem {suggestion}/>
                {/each}
            </div>
        </div>
    {:else}
        <div class="flex justify-between items-center px-4">
            <span class="w-[12rem] h-[1rem] rounded-sm bg-[#fcfcfc]"></span>
        </div>
        <div class="w-full px-4 mt-[1.25rem]">
            <div class="flex flex-wrap w-full relative gap-[0.55rem]">
                {#each Array(6) as item}
                    <div class="rounded-lg overflow-hidden bg-white shadow-recommendations relative"  style="width: calc(50vw - 1.28rem);">
                        <div class="w-full pb-[100%] relative">
                            <div class="absolute top-0 left-0 w-full h-full bg-[#F8F8F8]"></div>
                        </div>
                        <div class="flex flex-col w-full bg-white gap-[0.4rem] px-[0.5rem] pt-[0.75rem] pb-[0.7rem] overflow-hidden">
                            <span class="w-full h-[1rem] rounded-sm skeleton"></span>
                            <span class="w-full h-[1rem] rounded-sm skeleton"></span>
                            <span class="w-[40%] h-[1rem] rounded-sm skeleton"></span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>