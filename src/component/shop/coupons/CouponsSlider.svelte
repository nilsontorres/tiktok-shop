<script>
    import { onMount } from "svelte";

    let { coupons=[] } = $props();

    let container = $state(null);
    let carrosel = $state(null);
    let show_start_arrow = $state(false);
    let show_end_arrow = $state(false);

    const onScroll = (e) => {
        const currentPosition = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const carroselWidth = carrosel.offsetWidth;

        if(currentPosition > 0){
            show_start_arrow = true;
        }
        else{
            show_start_arrow = false;
        }

        if(currentPosition < (carroselWidth - containerWidth)){
            show_end_arrow = true;
        }
        else{
            show_end_arrow = false;
        }
    }

    onMount(() => {
        onScroll();
    });
</script>

<div class="flex w-full items-center relative">
    {#if show_start_arrow}
        <div class="flex justify-center items-center absolute left-0 top-0 h-8 z-20">
            <div class="w-4 h-[1.3rem] bg-linear-to-l from-transparent to-white"></div>
        </div>
    {/if}
    <div class="flex overflow-x-auto relative unselectable no-scrollbar h-8" bind:this={container} onscroll={onScroll}>
        <button type="button" class="mt-0">
            <ul class="flex items-center gap-1" bind:this={carrosel}>
                {#each coupons as coupon, index}
                    <li class="flex items-center gap-[0.35rem] bg-[#FFE5EA] rounded-sm px-[0.35rem] h-[1.3rem]">
                        <svg class="min-w-3 max-w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 37 28">
                            <path fill="#DF0644" d="M21 5h4V0h7c2 0 5 2.5 5 4.5V11h-2a3 3 0 1 0 0 6h2v6.5c0 2-2.5 4.5-5 4.5h-7v-5h-4v5H5c-2.5 0-5-2.5-5-4.5V17h2a3 3 0 1 0 0-6H0V4.5C0 2.5 3 0 5 0h16v5Zm0 14h4v-3h-4v3Zm0-7h4V9h-4v3Z"/>
                        </svg>                          
                        <span class="text-[#DF0644] text-[0.75rem] font-semibold whitespace-nowrap">{coupon.title}</span>                      
                    </li>
                {/each}
                <li class="w-4"></li>
            </ul>
        </button>
    </div>
    <div class="flex justify-center items-center h-8 absolute right-0 z-20">
        <div class="w-4 h-[1.3rem] bg-linear-to-r from-transparent to-white"></div>
        <div class="flex justify-end items-center bg-white w-3 h-[1.3rem]">
            <svg class="min-w-[0.33rem] max-w-[0.33rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
            </svg>
        </div>
    </div>
</div>