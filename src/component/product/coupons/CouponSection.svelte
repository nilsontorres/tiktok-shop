<script>
    import { onMount } from "svelte";
    import { useProductState } from "$state/product.svelte";

    import CouponItem from "$component/product/coupons/CouponItem.svelte";

    let product = useProductState();
    let container = $state(null);
    let carrosel = $state(null);
    let show_start_arrow = $state(false);
    let show_end_arrow = $state(false);

    const updateScroll = (e) => {
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
        updateScroll();
    });
</script>

<div class="flex w-full justify-between items-center gap-[0.3rem] mt-[0.3rem]">
    <div class="flex w-full items-center relative">
        {#if show_start_arrow}
            <div class="flex justify-center items-center absolute left-0 top-0 h-8 z-20">
                <div class="w-4 h-[1.3rem] bg-linear-to-l from-transparent to-white"></div>
            </div>
        {/if}
        <div class="flex overflow-x-auto relative no-selectable no-scrollbar h-8" bind:this={container} onscroll={updateScroll}>
            <button type="button" class="mt-0">
                <ul class="flex items-center gap-1" bind:this={carrosel}>
                    {#each product?.coupons as coupon, index}
                        {#if coupon.target == "product"}
                            <CouponItem {coupon}/>
                        {/if}
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
</div>