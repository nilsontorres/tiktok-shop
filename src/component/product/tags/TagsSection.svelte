<script>
    import { onMount } from "svelte";

    import TagItem from "$component/product/tags/TagItem.svelte";

    let { product={} } = $props();

    let container = $state(null);
    let carrosel = $state(null);
    let start_arrow = $state(false);
    let end_arrow = $state(false);

    const updateScroll = (e) => {
        const scroll_x = container.scrollLeft;
        const container_width = container.offsetWidth;
        const carrosel_width = carrosel.offsetWidth;

        if(scroll_x > 0){
            start_arrow = true;
        }
        else{
            start_arrow = false;
        }

        if(scroll_x < (carrosel_width - container_width)){
            end_arrow = true;
        }
        else{
            end_arrow = false;
        }
    }

    onMount(() => {
        updateScroll();
    });
</script>

<div class="flex w-full justify-between items-center gap-[0.3rem] mt-[0.4rem]">
    <div class="flex w-full items-center relative">
        {#if start_arrow}
            <div class="flex justify-center items-center absolute left-0 top-0 h-8 z-20">
                <div class="w-4 h-[1.3rem] bg-linear-to-l from-transparent to-white"></div>
            </div>
        {/if}
        <div class="flex overflow-x-auto relative no-selectable transparent-scroll h-8" bind:this={container} onscroll={updateScroll}>
            <button type="button" class="mt-0">
                <ul class="flex items-center gap-1" bind:this={carrosel}>
                    {#each product?.tags as tag, index}
                        <TagItem {tag}/>
                    {/each}
                </ul>
            </button>
        </div>
        {#if end_arrow}
            <div class="flex justify-center items-center h-8 absolute right-0 z-20">
                <div class="w-4 h-[1.3rem] bg-linear-to-r from-transparent to-white"></div>
            </div>
        {/if}
    </div>
</div>