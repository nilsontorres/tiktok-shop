<script>
    import PixMethod from "$component/finalize/payment/PixMethod.svelte";
    import CreditCardMethod from "$component/finalize/payment/CreditCardMethod.svelte";
    import ApplePayMethod from "$component/finalize/payment/ApplePayMethod.svelte";
    import BoletoMethod from "$component/finalize/payment/BoletoMethod.svelte";

    let { method, onChangePayment=()=>{} } = $props();
    let open = $state(false);

    export const openDrawer = () => {
        document.body.classList.add("no-scroll");
        open = true;
    }
    export const closeDrawer = () => {
        open = false;
        document.body.classList.remove("no-scroll");
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-[0.55rem] right-[0.5rem] p-2 z-50" onclick={closeDrawer}>
            <svg class="min-w-[0.8rem] max-w-[0.8rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[0.75rem] px-4 py-[1rem]">
            <span class="text-black text-[1rem] font-bold leading-none">Forma de pagamento</span>
        </div>
        <span class="w-full h-[0.05rem] bg-[#E8E8E8]"></span>
        <div class="flex flex-col w-full transparent-scroll px-[1rem]">
            <PixMethod selected={method == "pix"} {onChangePayment}/>
            <CreditCardMethod selected={method == "credit-card"} {onChangePayment} disabled={true}/>
            <ApplePayMethod selected={method == "apple-pay"} {onChangePayment} disabled={true}/>
            <BoletoMethod selected={method == "boleto"} {onChangePayment} disabled={true}/>
        </div>
        <div class="w-full fixed bottom-0 left-0 p-[1rem]">
            <button class="flex justify-center items-center w-full h-[2.7rem] rounded-full bg-[#FE2C55] hover:bg-[#E81D44] active:bg-[#E81D44] disabled:bg-[#F2F2F2] group" type="button" disabled={method==null} onclick={closeDrawer}>
                <span class="text-white group-disabled:text-[#9F9F9F] text-[0.92rem] font-semibold leading-none">Continuar</span>
            </button>
        </div>
    </div>
</div>