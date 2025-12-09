<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let { scroll=0, tab="overview", onChangeTab=()=>{} } = $props();

    const goToCart = () => {
        goto("/cart");
    }
</script>

<header class="flex flex-col fixed top-0 left-0 w-full z-40">
    <div class="flex justify-between items-center h-12 px-5 bg-white">
        <div class="flex items-center">
            <button type="button" title="Fechar">
                <svg class="min-w-4 max-w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 47 46">
                    <path fill="#000" d="M46.077 4.053 27.091 22.89l18.986 18.84-4.022 4.052-19.017-18.87-19.017 18.87L0 41.73l18.984-18.84L0 4.054 4.021 0l19.017 18.87L42.055 0l4.022 4.053Z"/>
                </svg>
            </button>
        </div>
        <div class="flex items-center gap-[1.3rem]">
            <button type="button" title="Compartilhar">
                <svg class="min-w-[1.45rem] max-w-[1.45rem] h-[1.35rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 67 63">
                    <path fill="#000" d="M29.054 2.317c0-3 3.5-3 6-.5l30 26.5c2.367 2.488 2.32 3.795 0 6l-30.5 26.5c-2.5 2.5-5.5 1-5.5-2.5v-14c-12.5 0-18 3.5-24 8-2.054 1.54-4.861 0-5-2.501-1-18 12-30.499 29-31.999v-15.5Zm6 18.499c-.054 2.684-1.555 2.915-4 3-12.763.443-23.055 8.685-24.555 20.185C12.61 41.022 17 39 32 38.5c2-.172 3.055.816 3.055 3.316V52l24.5-20.684-24.5-21.5v11Z"/>
                </svg>
            </button>
            <button type="button" title="Carrinho" onclick={goToCart}>
                <svg class="min-w-[1.45rem] max-w-[1.45rem] h-[1.32rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 64">
                    <path fill="#000" d="M23.566 51a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm31 0a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm-45-51c2.934 0 4.934 1.5 5.5 4.5l1.5 7.5h45.5c4.934 0 7.434 2.5 6.5 6l-6.5 24.5c-.566 2.5-2.566 5.5-7 5.5h-30c-4.066 0-7.066-2-8-6l-8.5-36h-6.5c-2.5 0-3-6 0-6h7.5Zm13 38.5c.749 2.45 1.467 3.426 4 3.5h26.5c2.689-.2 3.302-1.238 4-3.5l5-20.5h-44l4.5 20.5Z"/>
                </svg>
            </button>
            <button type="button" title="Opções">
                <svg class="min-w-[1.15rem] max-w-[1.15rem] h-[0.32rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 12">
                    <path fill="#000" d="M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0Zm22 0a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm22 0a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"/>
                </svg>                                          
            </button>
        </div>
    </div>
    <div class="flex flex-col w-full bg-white" style={`opacity: ${scroll >= 75 ? "100" : (scroll / 75) * 100}%`}>
        <div class="flex overflow-x-auto relative no-selectable no-scrollbar -mb-[0.04rem] z-20">
            <div>
                <div class="flex items-center">
                    <div class="flex w-[0.9rem]"></div>
                    <button type="button" class={`flex justify-between items-center gap-[0.4rem] pb-[0.5rem] pt-[0.6rem] px-[0.6rem] border-b-[0.16rem] ${tab == "overview" ? "border-black" : "border-transparent"} relative`} onclick={() => onChangeTab("overview")}>
                        <span class={`text-[0.95rem] ${tab == "overview" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Visão geral</span>
                    </button>
                    <button type="button" class={`flex justify-between items-center gap-[0.4rem] pb-[0.5rem] pt-[0.6rem] px-[0.6rem] border-b-[0.16rem] ${tab == "reviews" ? "border-black" : "border-transparent"} relative`} onclick={() => onChangeTab("reviews")}>
                        <span class={`text-[0.95rem] ${tab == "reviews" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Avaliações</span>
                    </button>
                    <button type="button" class={`flex justify-between items-center gap-[0.4rem] pb-[0.5rem] pt-[0.6rem] px-[0.6rem] border-b-[0.16rem] ${tab == "description" ? "border-black" : "border-transparent"} relative`} onclick={() => onChangeTab("description")}>
                        <span class={`text-[0.95rem] ${tab == "description" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Descrição</span>
                    </button>
                    <button type="button" class={`flex justify-between items-center gap-[0.4rem] pb-[0.5rem] pt-[0.6rem] px-[0.6rem] border-b-[0.16rem] ${tab == "suggestions" ? "border-black" : "border-transparent"} relative`} onclick={() => onChangeTab("suggestions")}>
                        <span class={`text-[0.95rem] ${tab == "suggestions" ? "text-black" : "text-[#707070]"} font-semibold whitespace-nowrap`}>Recomendações</span>
                    </button>
                    <div class="flex w-[0.9rem]"></div>
                </div>
            </div>
        </div>
        <span class="absolute left-0 bottom-0 w-full h-[0.045rem] bg-[#D0D1D3] z-10"></span>
    </div>
</header>