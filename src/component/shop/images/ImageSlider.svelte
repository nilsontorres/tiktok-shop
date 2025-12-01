<script>
    import { onMount } from "svelte";

    let { images=[] } = $props();

    let start_x = 0;
    let start_y = 0;
    let start_time = 0;

    let current_x = 0;
    let offset_x = 0;

    let index = $state(0);
    let dragging = $state(false);

    let container;

    const handleTouchStart = (e) => {
        start_x = e.touches[0].clientX;
        start_y = e.touches[0].clientY;
        start_time = Date.now();

        dragging = true;
    };

    const handleTouchMove = (e) => {
        if (!dragging) return;

        current_x = e.touches[0].clientX;
        offset_x = current_x - start_x;

        // Bordas com resistência (bounce)
        if ((index === 0 && offset_x > 0) || (index === images.length - 1 && offset_x < 0)) {
            offset_x *= 0.4;
        }

        const x = Math.round(-index * window.innerWidth + offset_x);

        container.style.transition = "none";
        container.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const handleTouchEnd = () => {
        if (!dragging) return;
        dragging = false;

        const elapsed = Date.now() - start_time;
        const threshold_distance = window.innerWidth * 0.2; // 20% da tela
        const threshold_speed = 0.3; // px/ms — controla sensibilidade do swipe rápido

        // velocidade em px/ms
        const velocity = Math.abs(offset_x / elapsed);

        // Determina se deve trocar de tela
        if((offset_x > threshold_distance || (velocity > threshold_speed && offset_x > 0)) && index > 0){
            index--;
        }
        else if((offset_x < -threshold_distance || (velocity > threshold_speed && offset_x < 0)) && index < (images.length - 1)){
            index++;
        }

        const x = Math.round(-index * window.innerWidth);
        container.style.transition = "transform 0.3s ease";
        container.style.transform = `translate3d(${x}px, 0, 0)`;

        offset_x = 0;
    };

    onMount(() => {
        container.style.transform = `translate3d(0,0,0)`;
    });
</script>

<div class="w-full overflow-hidden bg-[#F6F6F6] relative">
    <div class="flex items-center justify-center absolute right-[1rem] bottom-[1rem] bg-[#0000007d] rounded-full w-[2.1rem]  h-[1.25rem] z-20">
        <span class="text-white text-[0.675rem] z-20 leading-none mt-[0.1rem]">{index+1}/{images?.length}</span>
    </div>
    <div bind:this={container} class="flex touch-none will-change-transform backface-hidden" style="width: {images.length * 100}vw;" ontouchstart={handleTouchStart} ontouchmove={handleTouchMove} ontouchend={handleTouchEnd}>
        {#each images as image}
            <div class="flex w-screen shrink-0 pb-[100vw] translate-z-0 slide relative">
                <div class="flex justify-center items-center absolute top-0 left-0 w-full h-full">
                    <div class="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat" style={`background-image: url('${image.source}')`}></div>
                </div>
            </div>
        {/each}
    </div>
</div>