<script>
    import { formatPrice } from "$lib/formating";

    let {
        shipping={},
        onOpenLocationDrawer=()=>{}
    } = $props();

    let is_open = $state(false);

    export const openDrawer = () => {
        document.body.classList.add("no-scrollbar");
        is_open = true;
    }
    export const closeDrawer = () => {
        is_open = false;
        document.body.classList.remove("no-scrollbar");
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!is_open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${is_open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${is_open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-3 right-3 p-2 z-50" onclick={closeDrawer}>
            <svg class="min-w-[0.85rem] max-w-[0.85rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[0.75rem] px-4 py-[1.2rem]">
            <span class="text-black text-[1rem] font-bold leading-none">Envio</span>
        </div>
        <span class="w-full h-[0.05rem] bg-[#E8E8E8]"></span>
        <div class="flex flex-col w-full overflow-y-auto overscroll-y-contain transparent-scrollbar px-4 py-5">
            <div class="flex items-center gap-[0.6rem]">
                <div class="flex justify-center items-center w-[1rem] h-[1rem]">
                    <svg class="min-w-[0.82rem] max-w-[0.82rem] h-[0.84rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 37">
                        <path fill="#151921" d="M25.5 0c1.875 0 2.625.281 3.516.844L36 5.5c2 1.5 1.941 2.855 2 4.5v23c0 2.5-2.5 4-4.5 4H4c-2 0-4-2-4-4V10c0-1.5.5-3.5 2-4.5l5.5-4C9.015.442 10.068.081 12.5 0h13ZM4 33h30V12H4v21Zm25-10.5L22 31l-3-2.5 3-4H9.5v-4H22L19 17l3-2.5 7 8ZM5.5 8H33l-6.5-4.5h-15L5.5 8Z"/>
                    </svg>
                </div>
                <span class="text-black text-[0.9rem]">De São Paulo</span>             
            </div>
            <div class="mt-[0.6rem] px-[0.2rem]">
                <svg class="min-w-[0.52rem] max-w-[0.52rem] h-[0.55rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 28">
                    <path fill="#858585" d="M26 15.213 13 28 0 15.213 2.25 13 13 23.574 23.75 13 26 15.213Zm0-13L13 15 0 2.213 2.25 0 13 10.574 23.75 0 26 2.213Z"/>
                </svg>
            </div>
            <button onclick={onOpenLocationDrawer} type="button" class="flex justify-between items-center mt-[0.6rem]">
                <div class="flex items-center gap-[0.6rem]">
                    <div class="flex justify-center items-center w-[1rem] h-[1rem]">
                        <svg class="min-w-[0.94rem] max-w-[0.94rem] h-[0.94rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 46">
                            <path fill="#151921" d="M19.5 0C29.5 0 38 8 38 18.5c-.46 4.869-1 9-5.5 14L19 46 5.5 32.5C1 28 .474 24.162 0 18.5 0 7.5 9.5 0 19.5 0Zm-.105 4C11.5 4 4 9.87 4 18.479c.374 4.43.79 7.434 4.342 10.956L19 40l10.658-10.565c3.553-3.913 3.979-7.146 4.342-10.956C34 10.26 27.29 4 19.395 4ZM19 10a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/>
                        </svg>
                    </div>
                    {#if shipping.location?.country && shipping.location?.region && shipping.location?.city}
                        <span class="text-black text-[0.9rem]">{shipping.location?.city?.name}, {shipping.location?.region?.name}, {shipping.location?.country?.name}</span>
                    {:else}
                        <span class="text-black text-[0.9rem]">São Paulo, São Paulo, Brasil</span>
                    {/if}
                </div>
                <svg class="min-w-[0.44rem] max-w-[0.44rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
                    <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
                </svg>
            </button>
            <span class="w-full h-[0.05rem] bg-[#E8E8E8] mt-5"></span>
            <div class="flex items-start gap-[0.5rem] w-full pb-[1.05rem] rounded-lg bg-[#F4FDFE] mt-5 bg-cover bg-top-right px-[0.9rem]" style="background-image: url('/images/bg-shipping-1.jpg')">
                <svg class="min-w-[0.92rem] max-w-[0.92rem] h-[1rem] mt-[1.05rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 34">
                    <path fill="#000" d="M38 0a6 6 0 0 1 6 6v6a5 5 0 0 0 0 10v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6v-6a5 5 0 0 0 0-10V6a6 6 0 0 1 6-6h32ZM7 4a3 3 0 0 0-3 3v2s5.5 1.5 5.5 8S4 25 4 25v2a3 3 0 0 0 3 3h18v-2h4v2h8a3 3 0 0 0 3-3v-2s-5.5-1.5-5.5-8S40 9.5 40 9.5V7a3 3 0 0 0-3-3h-8v2h-4V4H7Zm22 20h-4v-5h4v5Zm0-9h-4v-5h4v5Z"/>
                </svg>
                <div class="flex flex-col gap-[0.3rem] mt-[1.2rem]">
                    <span class="text-black text-[0.85rem] font-semibold leading-none">Cupom de envio do Tiktok Shop</span>
                    <span class="text-[#555858] text-[0.8rem]">Desconto de R$ 20 no frete em pedidos acima de R$ 29</span>
                </div>
            </div>
            <span class="w-full h-[0.05rem] bg-[#E8E8E8] mt-5"></span>
            <div class="flex justify-between items-center mt-5">
                <span class="text-black text-[0.9rem] font-semibold">Envio padrão</span>
                <div class="flex items-center gap-[0.25rem]">
                    <span class="text-[#00000072] text-[0.775rem] line-through">R$ {formatPrice(shipping.amount)}</span>
                    {#if shipping.total > 0}
                        <span class="text-black text-[0.775rem]">R$ {formatPrice(shipping.total)}</span>
                    {:else}
                        <span class="text-[#077F7F] text-[0.775rem]">Grátis</span>
                    {/if}
                </div>
            </div>
            <div class="text-[#555858] text-[0.8rem]">Receba até {shipping?.deadline?.from}-{shipping?.deadline?.to} de {shipping?.deadline?.month}</div>
        </div>
    </div>
</div>