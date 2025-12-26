<script>
    import { formatPrice } from "$lib/formating";

    let { shipping={} } = $props();

    let product_expand = $state(true);
    let shipping_expand = $state(true);

    const toggleProduct = () => {
        product_expand = !product_expand;
    }
    const toggleShipping = () => {
        shipping_expand = !shipping_expand;
    }
</script>

<div class="flex flex-col w-full px-[1rem] py-[1.2rem] bg-white">
    <span class="text-black text-[0.92rem] font-semibold leading-none">Resumo do pedido</span>
    <button class="flex w-full justify-between items-center mt-[1.2rem]" type="button" onclick={toggleProduct}>
        <div class="flex items-center gap-[0.25rem]">
            <span class="text-black text-[0.875rem] font-medium">Subtotal do produto</span>
            <svg class={`w-[0.54rem] ${product_expand ? "rotate-0" : "rotate-180"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 17">
                <path fill="#000" d="M0 13 13 0l13 13-3.5 3.5L13 7l-9.5 9.5L0 13Z"/>
            </svg>
        </div>
        <span class="text-black text-[0.92rem]">R$ 37,99</span>
    </button>
    {#if product_expand}
        <div class="w-full mt-[1rem] ps-[1rem] gap-[1.1rem]">
            <div class="flex justify-between items-center text-[0.75rem] leading-none">
                <span class="text-black">Preço original</span>
                <span class="text-black">R$ 80,00</span>
            </div>
            <div class="flex justify-between items-center text-[0.75rem] leading-none mt-[1.1rem]">
                <span class="text-black">Desconto no produto</span>
                <span class="text-[#E10543]">- R$ 42,01</span>
            </div>
            <div class="flex justify-between items-center text-[0.75rem] leading-none mt-[1.1rem]">
                <span class="text-black">Cupons do TikTok Shop</span>
                <span class="text-[#E10543]">- R$ 11,45</span>
            </div>
        </div>
    {/if}
    <button class="flex w-full justify-between items-center mt-[1.2rem]" type="button" onclick={toggleShipping}>
        <div class="flex items-center gap-[0.25rem]">
            <span class="text-black text-[0.875rem] font-medium">Subtotal do envio</span>
            <svg class={`w-[0.54rem] ${shipping_expand ? "rotate-0" : "rotate-180"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 17">
                <path fill="#000" d="M0 13 13 0l13 13-3.5 3.5L13 7l-9.5 9.5L0 13Z"/>
            </svg>
        </div>
        <span class="text-black text-[0.92rem]">R$ {formatPrice(shipping?.price?.regular - shipping?.price?.promotional, true)}</span>
    </button>
    {#if shipping_expand}
        <div class="w-full mt-[1rem] ps-[1rem] gap-[1.1rem]">
            <div class="flex justify-between items-center text-[0.75rem] leading-none">
                <span class="text-black">Taxa de envio</span>
                <span class="text-black">R$ {formatPrice(shipping?.price?.regular, true)}</span>
            </div>
            {#if shipping?.price?.promotional > 0}
                <div class="flex justify-between items-center text-[0.75rem] leading-none mt-[1.1rem]">
                    <span class="text-black">Desconto de envio</span>
                    <span class="text-[#E10543]">- R$ {formatPrice(shipping?.price?.promotional, true)}</span>
                </div>
            {/if}
        </div>
    {/if}
    <div class="w-full h-[0.054rem] bg-[#ededed] mt-[1.1rem]"></div>
    <div class="flex flex-col items-end w-full mt-[1rem]">
        <div class="flex w-full justify-between items-center leading-none">
            <span class="text-black text-[1rem] font-semibold">Total</span>
            <span class="text-black text-[0.92rem] text-end font-semibold">R$ 46,69</span>
        </div>
        <span class="text-[#595959] text-[0.76rem] leading-none mt-[0.5rem]">Impostos inclusos</span>
    </div>
</div>