<script>
    import { formatPrice } from "$lib/formating";
    import PromotionItem from "./PromotionItem.svelte";

    let {
        coupons=[],
    } = $props();

    let is_open = $state(false);

    export const openDrawer = () => {
        is_open = true;
    }
    export const closeDrawer = () => {
        is_open = false;
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!is_open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${is_open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${is_open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-[0.3rem] right-[0.5rem] p-2 z-50" onclick={closeDrawer}>
            <svg class="min-w-[0.8rem] max-w-[0.8rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[0.75rem] px-4 py-[0.7rem]">
            <span class="text-black text-[1rem] font-bold leading-none">Ofertas</span>
        </div>
        <span class="w-full h-[0.05rem] bg-[#E8E8E8]"></span>
        <div class="flex flex-col w-full overflow-y-auto overscroll-y-contain no-scrollbar pb-4">
            <span class="flex w-full bg-[#F8F8F8] px-[0.85rem] pt-[0.75rem] pb-[0.9rem] text-[#353535] text-[0.92rem] leading-[1.2rem]">Resgate esses cupons e eles serão aplicados automaticamente na finalização da compra. Você pode aplicar 1 cupom e/ou promoção do TikTok Shop e 1 cupom e/ou promoção de cada vendedor. Aplicam-se termos individuais.</span>
            <div class="flex flex-col px-4 mt-[1.2rem]">
                <span class="text-black text-[0.875rem] font-bold leading-none">Cupons de envio</span>
            </div>
            <ul class="flex flex-col gap-[0.7rem] px-4 mt-[1.1rem]">
                {#each coupons as coupon}
                    {#if coupon.target == "shipping"}
                        <PromotionItem variant="full" {coupon}/>
                    {/if}
                {/each}
            </ul>
            <div class="flex flex-col px-4 mt-[1.1rem]">
                <span class="text-black text-[0.875rem] font-bold leading-none">Cupons de desconto</span>
            </div>
            <ul class="flex flex-col gap-[0.7rem] px-4 mt-[0.7rem]">
                {#each coupons as coupon}
                    {#if coupon.target == "product"}
                        <PromotionItem variant="full" {coupon}/>
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
</div>