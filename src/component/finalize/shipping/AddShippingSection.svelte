<script>
    let { shipping, openDrawer=()=>{} } = $props();
</script>

<div class="flex items-center w-full bg-white px-[1rem] h-[3.6rem]">
    <button class="flex justify-between w-full items-center" type="button" onclick={openDrawer}>
        <div class="flex items-center gap-[0.4rem]">
            <svg class="w-[0.8rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 46">
                <path fill="#000" d="M19.01 0c10.493 0 19 8.507 19 19 0 10.984-18.944 26.454-19 26.5 0 0-19.51-16-19-26.5 0-10.493 8.506-19 19-19Zm0 4.15C10.808 4.15 4.16 10.8 4.16 19s14.85 21 14.85 21c.048-.042 14.85-12.812 14.85-21 0-8.201-6.649-14.85-14.85-14.85ZM19 10a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 4.028a4.972 4.972 0 1 0 0 9.945 4.972 4.972 0 0 0 0-9.945Z"/>
            </svg>
            <span class="text-black text-[0.86rem] font-medium">Endereço de envio</span>
        </div>
        <div class="flex items-center gap-[0.3rem]">
            <svg class="w-[0.76rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
                <path fill="#FE2C55" d="M20 16h16v4H20v16h-4V20H0v-4h16V0h4v16Z"/>
            </svg>
            <span class="text-[#FE2C55] text-[0.86rem] font-medium">Adicionar endereço</span>
        </div>
    </button>
</div>