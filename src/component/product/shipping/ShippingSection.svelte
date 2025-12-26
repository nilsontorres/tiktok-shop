<script>
    import { formatPrice } from "$lib/formating";

    import ShippingDrawer from "$component/product/shipping/ShippingDrawer.svelte";
    import AddShippingDrawer from "$component/location/LocationDrawer.svelte";

    let { shipping={} } = $props();

    let shipping_drawer = $state();
    let location_drawer = $state();
</script>

<ShippingDrawer bind:this={shipping_drawer} {shipping} onOpenLocationDrawer={location_drawer?.openDrawer}/>
<AddShippingDrawer bind:this={location_drawer} {shipping}/>

<button onclick={() => shipping_drawer.openDrawer("shipping")} type="button" class="flex w-full justify-between items-center gap-[0.3rem] mt-[0.9rem]">
    <div class="flex items-start gap-2">
        <svg class="min-w-[1.05rem] max-w-[1.05rem] mt-[0.1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 38">
            <path fill="#202020" d="M7 27.393A7.002 7.002 0 0 1 19.709 29h7.582a7.002 7.002 0 0 1 13.418 0H44v-7c0-4.5-4-11-5.5-11H34v7.5c0 2-4 2-4 0V6c0-1.5-.5-1.937-2-2H3.5c0-2.5 1-4 3.5-4h22c3 0 5 2 5 4.5V7h6c2.5 0 8 7.5 8 14v8c0 2.5-.5 4-3 4h-4.291a7.002 7.002 0 0 1-13.418 0h-7.582a7.002 7.002 0 0 1-13.42-.009C4.396 32.857 3 30.93 3 29v-5h4v3.393ZM13 28a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm21 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-21-8H3v-4h10v4Zm5-8H0V8h18v4Z"/>
        </svg>
        <div class="flex flex-col">
            <div class="flex items-center gap-[0.3rem]">
                {#if shipping?.price?.promotional == 0}
                    <div class="flex items-center bg-[#E0F6F6] py-[0.2rem] ps-[0.25rem] pe-[0.2rem] rounded-sm">
                        <span class="text-[#059091] text-[0.75rem] font-medium leading-none">Frete grátis</span>
                    </div>
                {/if}
                <div class="flex items-center gap-[0.1rem] text-black text-[0.85rem] leading-none">
                    <span>Receba até {shipping?.deadline?.from}</span>
                    <span class="w-[0.4rem] h-[0.08rem] bg-black"></span>
                    <span>{shipping?.deadline?.to} de {shipping?.deadline?.month}</span>
                </div>
            </div>
            <div class="flex items-center text-[#595959] text-[0.8rem] gap-[0.3rem] mt-[0.5rem] leading-none">
                <span>Taxa de envio:</span>
                {#if shipping?.coupon?.discount}
                    <span class="line-through">R$ {formatPrice(shipping?.price?.regular)}</span>
                    <span class="text-black">R$ {formatPrice(shipping?.price?.promotional)}</span>
                {:else}
                    <span class="text-black">R$ {formatPrice(shipping?.price?.regular)}</span>
                {/if}
            </div>
            {#if shipping?.coupon}
                <span class="text-[#059091] text-[0.8rem] mt-[0.3rem] text-start leading-[1.1rem]">Desconto de R$ {formatPrice(shipping?.coupon?.discount, false)} no frete em pedidos acima de R$ {formatPrice(shipping?.coupon?.minimum, false)}</span>
            {/if}
        </div>
    </div>
    <div class="flex items-center h-full">
        <svg class="min-w-[0.33rem] max-w-[0.33rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
            <path fill="#858585" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
        </svg>
    </div>
</button>