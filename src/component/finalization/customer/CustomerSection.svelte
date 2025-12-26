<script>
    import CustomerDrawer from "$component/finalization/customer/CustomerDrawer.svelte";

    let { customer={}, updateCustomer=()=>{} } = $props();

    let drawer = $state();
</script>

<CustomerDrawer bind:this={drawer} {customer} {updateCustomer}/>

<div class="flex items-center w-full min-h-[3.4rem] bg-white overflow-hidden px-[1rem] py-[0.8rem] pb-[1rem] relative">
    <button class="flex justify-between w-full items-center" type="button" onclick={() => drawer.openDrawer()}>
        <div class="flex items-start gap-[0.4rem]">
            <svg class="w-[0.74rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 40">
                <path fill="#000" d="M17 23a17.002 17.002 0 0 1 17 17h-3.984a13.015 13.015 0 1 0-26.032 0H0a17.001 17.001 0 0 1 17-17Zm0-23c5.523 0 10 4.477 10 10s-4.477 10-10 10S7 15.523 7 10 11.477 0 17 0Zm0 3.96a6.04 6.04 0 1 0 0 12.08 6.04 6.04 0 0 0 0-12.08Z"/>
            </svg>
            <span class="text-black text-[0.86rem] leading-[1rem]"><b class="font-medium">CPF</b>{customer?.document && `: ${customer?.document?.number}`}</span>
        </div>
        {#if customer?.document}
            <svg class="h-[0.76rem] me-[0.25rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 35">
                <path fill="#858585" d="m0 3 3-3 17.5 17.5L3 35l-3-3 14-14.5L0 3Z"/>
            </svg>
        {:else}
            <div class="flex items-center gap-[0.3rem]">
                <svg class="w-[0.76rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
                    <path fill="#FE2C55" d="M20 16h16v4H20v16h-4V20H0v-4h16V0h4v16Z"/>
                </svg>
                <span class="text-[#FE2C55] text-[0.86rem] font-medium">Adicionar CPF</span>
            </div>
        {/if}
    </button>
    <div class="absolute bottom-0 left-0 w-[106vw] -translate-x-[3vw] h-[0.13rem] bg-white bg-contain bg-repeat-x" style={`background-image: url('/images/pattern-1.png')`}></div>
</div>