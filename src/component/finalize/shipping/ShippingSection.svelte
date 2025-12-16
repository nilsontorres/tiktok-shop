<script>
    let { address, openAddressDrawer=()=>{} } = $props();
</script>

<div class="w-full bg-white px-[1rem] py-[0.75rem]">
    <button class="flex w-full h-[2.6rem] justify-center items-center gap-[0.35rem] rounded-md bg-[#F2F2F2] active:bg-[#e3e3e3]" type="button" onclick={openAddressDrawer}>
        <svg class="w-[0.88rem] h-[0.87rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 46 46">
            <path fill="#000" d="M24 0a2 2 0 0 1 2 2v18h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H26v18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V26H2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h18V2a2 2 0 0 1 2-2h2Z"/>
        </svg>            
        <span class="text-black text-[0.975rem] font-semibold leading-none">Adicionar endereço de entrega</span>
    </button>
</div>