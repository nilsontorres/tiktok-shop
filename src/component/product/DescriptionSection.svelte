<script>
    let { product={}, scroll=0, updateSection=()=>{} } = $props();

    let component = $state(null);
    let minimized = $state(true);

    const minize = () => {
        minimized = !minimized;
    }

    $effect(() => {
        const { top } = component?.getBoundingClientRect();
        updateSection("description", top+scroll-90);
    });
</script>

<div class="flex flex-col py-[1.1rem] bg-white" bind:this={component}>
    <div class="flex justify-between items-center px-4">
        <span class="text-black text-[0.93rem] font-semibold leading-none">Sobre este produto</span>
    </div>
    <div class="mt-[0.5rem]">
        <div class={`px-4 relative ${minimized ? "max-h-[40rem] overflow-hidden" : "max-h-auto pb-[2rem]"}`}>
            <div class="text-[0.875rem] wrapper">{@html product?.description}</div>
            <button type="button" class="absolute bottom-0 left-0 w-full z-20" onclick={minize}>
                {#if minimized}
                    <div class="w-full h-[5rem] bg-linear-to-b from-transparent to-white"></div>
                {/if}
                <div class="flex items-center justify-center gap-[0.35rem] pt-[1rem] bg-white">
                    <span class="text-[#333] text-[0.875rem] font-semibold leading-none">Ver {minimized ? "mais" : "menos"}</span>
                    {#if minimized}
                        <svg class="w-[0.78rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 15">
                            <path fill="#333" d="M0 2.213 2.25 0 13 10.574 23.75 0 26 2.213 13 15 0 2.213Z"/>
                        </svg>
                    {:else}
                        <svg class="w-[0.78rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 15">
                            <path fill="#333" d="M26 12.787 23.75 15 13 4.426 2.25 15 0 12.787 13 0l13 12.787Z"/>
                        </svg>
                    {/if}              
                </div>
            </button>
        </div>
    </div>
</div>

<style>
    :global(.wrapper .paragraph) {
        margin-top: 0.25rem;
    }
    :global(.wrapper .title) {
        margin-top: 0.7rem;
        font-weight: 500;
    }
    :global(.wrapper .list) {
        margin-top: 0.35rem;
        margin-bottom: 0.85rem;
    }
    :global(.wrapper .item) {
        display: flex;
        margin-top: 0.2rem;
    }
    :global(.wrapper .key) {
        min-width: 40%;
        color: #666;
        font-size: 0.8rem;
    }
    :global(.wrapper .value) {
        font-size: 0.8rem;
    }
</style>