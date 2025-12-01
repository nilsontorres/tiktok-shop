<script>
    import { onMount } from "svelte";

    let {
        tags=[]
    } = $props();

    let container = $state(null);
    let carrosel = $state(null);
    let showStartArrow = $state(false);
    let showEndArrow = $state(false);

    const onScroll = (e) => {
        const scrollX = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const carroselWidth = carrosel.offsetWidth;

        if(scrollX > 0){
            showStartArrow = true;
        }
        else{
            showStartArrow = false;
        }

        if(scrollX < (carroselWidth - containerWidth)){
            showEndArrow = true;
        }
        else{
            showEndArrow = false;
        }
    }

    onMount(() => {
        onScroll();
    });
</script>

<div class="flex w-full items-center relative">
    {#if showStartArrow}
        <div class="flex justify-center items-center absolute left-0 top-0 h-8 z-20">
            <div class="w-4 h-[1.3rem] bg-linear-to-l from-transparent to-white"></div>
        </div>
    {/if}
    <div class="flex overflow-x-auto relative unselectable no-scrollbar h-8" bind:this={container} onscroll={onScroll}>
        <button type="button" class="mt-0">
            <ul class="flex items-center gap-1" bind:this={carrosel}>
                {#each tags as tag, index}
                    <li class="flex items-center gap-[0.35rem] bg-[#F9EDE2] rounded-sm px-[0.35rem] h-[1.3rem]">
                        <span class="text-[#895109] text-[0.75rem] font-medium whitespace-nowrap">{tag.title}</span>                      
                    </li>
                {/each}
            </ul>
        </button>
    </div>
    {#if showEndArrow}
        <div class="flex justify-center items-center h-8 absolute right-0 z-20">
            <div class="w-4 h-[1.3rem] bg-linear-to-r from-transparent to-white"></div>
        </div>
    {/if}
</div>