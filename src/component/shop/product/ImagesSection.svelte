
<script>
    import { onMount } from "svelte";

    let { images=[] } = $props();

    let container = $state(null);
    let index = $state(0);

    const onScrollX = () => {
        const scroll_x = container.scrollLeft;
        const screen_width = window.innerWidth;

        index = Math.floor(scroll_x / screen_width);
        if(scroll_x >= ((index * screen_width) + (screen_width / 2))){
            index += 1;
        }
        if(index < 0) index = 0;
    }
</script>

<div class="w-full overflow-hidden bg-[#F8F8F8] relative">
    <div class="flex items-center justify-center absolute right-[1rem] bottom-[1rem] bg-[#0000007d] rounded-full w-[2.1rem]  h-[1.25rem] z-20">
        <span class="text-white text-[0.675rem] z-20 leading-none mt-[0.1rem]">{index+1}/{images?.length}</span>
    </div>
    <div bind:this={container} onscroll={onScrollX} class="flex overflow-x-auto h-full snap-x snap-mandatory scroll-smooth no-scrollbar">
        {#each images as image}
            <div class="flex snap-start snap-always flex-none w-screen pb-[100vw] h-full relative">
                <div class="flex justify-center items-center absolute top-0 left-0 w-full h-full">
                    <div class="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat" style={`background-image: url('${image.source}')`}></div>
                </div>
            </div>
        {/each}
    </div>
</div>