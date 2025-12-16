<script>
    import MethodsDrawer from "$component/finalize/payment/MethodsDrawer.svelte";
    import PixMethod from "$component/finalize/payment/PixMethod.svelte";
    import CreditCardMethod from "$component/finalize/payment/CreditCardMethod.svelte";
    import ApplePayMethod from "$component/finalize/payment/ApplePayMethod.svelte";
    import BoletoMethod from "$component/finalize/payment/BoletoMethod.svelte";

    let drawer = $state();
    let method = $state();

    const updatePaymentMethod = (value) => {
        method = value;
    }
</script>

<MethodsDrawer bind:this={drawer} {method} onChangePayment={updatePaymentMethod}/>

<div class="flex flex-col w-full px-[1rem] py-[1.2rem] bg-white">
    <span class="text-black text-[0.92rem] font-semibold leading-none">Forma de pagamento</span>
    <PixMethod selected={method == "pix"} onChangePayment={updatePaymentMethod}/>
    <CreditCardMethod selected={method == "credit-card"} onChangePayment={updatePaymentMethod} disabled={true}/>
    <ApplePayMethod selected={method == "apple-pay"} onChangePayment={updatePaymentMethod} disabled={true}/>
    <BoletoMethod selected={method == "boleto"} onChangePayment={updatePaymentMethod} disabled={true}/>
    <div class="w-full h-[0.054rem] bg-[#ededed] mt-[1.1rem]"></div>
    <button type="button" class="flex items-center justify-between mt-[1rem]" onclick={() => drawer.openDrawer()}>
        <span class="text-black text-[0.8rem] font-semibold">Ver todos</span>
        <svg class="h-[0.76rem] me-[0.25rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 35">
            <path fill="#858585" d="m0 3 3-3 17.5 17.5L3 35l-3-3 14-14.5L0 3Z"/>
        </svg>
    </button>
</div>