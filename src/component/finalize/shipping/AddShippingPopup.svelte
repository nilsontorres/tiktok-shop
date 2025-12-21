<script>
    import { onMount } from "svelte";

    let { shipping, openShippingDrawer=()=>{} } = $props();
    let open = $state(false);

    export const openPopup = () => {
        open = true;
    }
    export const closePopup = () => {
        open = false;
    }

    onMount(() => {
        if(shipping?.filled){
            setTimeout(() => {
                open = true;
            }, 100);
        }
    });
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full h-full bg-[#00000099] justify-center items-center ${open ? "opacity-100" : "opacity-0"} transition-opacity duration-200 ease-in-out z-20 no-selectable`}>
        <div class="flex flex-col w-[18rem] bg-white rounded-[1rem] relative">
            <div class="flex flex-col w-full p-[1.2rem] px-[1.5rem] gap-[0.85rem]">
                <span class="w-full text-black text-[1.25rem] text-center font-bold leading-[1.5rem] mt-[0.4rem]">Adicionar endereço<br/>de entrega</span>
                <p class="w-full text-[#595959] text-[0.92rem] text-center leading-[1.2rem]">Sua conta não tem um endereço de envio. Adicione um para prosseguir com a finalização da compra.</p>
            </div>
            <div class="flex w-full border-t-[0.054rem] border-[#eaeaea]">
                <button class="flex items-center justify-center w-full h-[2.8rem]" type="button" onclick={closePopup}>
                    <span class="text-[#595959] text-[0.98rem] leading-none">Mais tarde</span>
                </button>
                <button class="flex items-center justify-center w-full h-[2.8rem] border-s-[0.054rem] border-[#eaeaea]" type="button" onclick={() => { closePopup(); openShippingDrawer(); }}>
                    <span class="text-black text-[0.98rem] font-bold leading-none">Adicionar</span>
                </button>
            </div>
        </div>
    </div>
</div>