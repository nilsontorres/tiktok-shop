<script>
    import { firstAndLastName, maskPhone } from "$lib/formating";

    import ShippingPopup from "./ShippingPopup.svelte";

    let { scroll=0, shipping={}, updatePage=()=>{} } = $props();

    let popup = $state(null);
    let height = $state(0);
</script>

<ShippingPopup bind:this={popup} {shipping} {updatePage}/>

{#if shipping?.filled && scroll >= height}
    <div class="inline w-full absolute top-[3rem] left-0 z-20 px-[1rem] pb-[0.25rem] pt-[0.35rem] bg-white shadow-md text-[#707070] text-[0.65rem] leading-[1.1rem]">
        <svg class="inline-flex h-[0.72rem] me-[0.1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 46">
            <path fill="#707070" d="M19.01 0c10.493 0 19 8.507 19 19 0 10.984-18.944 26.454-19 26.5 0 0-19.51-16-19-26.5 0-10.493 8.506-19 19-19Zm0 4.15C10.808 4.15 4.16 10.8 4.16 19s14.85 21 14.85 21c.048-.042 14.85-12.812 14.85-21 0-8.201-6.649-14.85-14.85-14.85ZM19 10a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 4.028a4.972 4.972 0 1 0 0 9.945 4.972 4.972 0 0 0 0-9.945Z"/>
        </svg>
        {firstAndLastName(shipping?.fullname)}, (+55){maskPhone(shipping?.fullname)}, {shipping?.street}, {shipping?.number}, {shipping?.district}, {shipping?.city?.name}, {shipping?.region?.name}, {shipping?.postal}
    </div>
{/if}
<div class="flex items-center w-full min-h-[3.4rem] bg-white px-[1rem] py-[1rem]" bind:offsetHeight={height}>
    <button class="flex justify-between w-full items-start gap-[1rem]" type="button" onclick={() => updatePage("shipping")}>
        <div class="flex items-start gap-[0.4rem] mt-[0.15rem]">
            <svg class="w-[0.83rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 46">
                <path fill="#000" d="M19.01 0c10.493 0 19 8.507 19 19 0 10.984-18.944 26.454-19 26.5 0 0-19.51-16-19-26.5 0-10.493 8.506-19 19-19Zm0 4.15C10.808 4.15 4.16 10.8 4.16 19s14.85 21 14.85 21c.048-.042 14.85-12.812 14.85-21 0-8.201-6.649-14.85-14.85-14.85ZM19 10a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 4.028a4.972 4.972 0 1 0 0 9.945 4.972 4.972 0 0 0 0-9.945Z"/>
            </svg>
            {#if shipping?.filled}
                <div class="flex w-full flex-col text-black text-start gap-[0.5rem]">
                    <b class="text-[0.9rem] font-semibold leading-[1.1rem]">{scroll} - {height} | {firstAndLastName(shipping?.fullname)}, (+55){maskPhone(shipping?.phone)}</b>
                    <span class="text-[0.86rem] leading-[1.1rem]">{shipping?.street}, {shipping?.number}, {shipping?.district}, {shipping?.city?.name}, {shipping?.region?.name}, {shipping?.postal}</span>
                </div>
            {:else}
                <span class="text-black text-[0.86rem] font-medium leading-[1rem]">Endereço de envio</span>
            {/if}
        </div>
        {#if shipping?.filled}
            <svg class="h-[0.76rem] me-[0.25rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 35">
                <path fill="#858585" d="m0 3 3-3 17.5 17.5L3 35l-3-3 14-14.5L0 3Z"/>
            </svg>
        {:else}
            <div class="flex items-center gap-[0.3rem]">
                <svg class="w-[0.76rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
                    <path fill="#FE2C55" d="M20 16h16v4H20v16h-4V20H0v-4h16V0h4v16Z"/>
                </svg>
                <span class="text-[#FE2C55] text-[0.86rem] font-medium mt-[0.1rem]">Adicionar endereço</span>
            </div>
        {/if}
    </button>
</div>