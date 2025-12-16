<script>
    let open = $state(false);

    export const openDrawer = () => {
        document.body.classList.add("no-scrollbar");
        open = true;
    }
    export const closeDrawer = () => {
        open = false;
        document.body.classList.remove("no-scrollbar");
    }

    export { open };
</script>

<div class="flex w-full h-12 justify-between items-center">
    <button class="flex justify-center items-center w-[3.5rem] h-[2rem]" type="button" aria-label="Voltar" onclick={closeDrawer}>
        <svg class="h-[1.1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
            <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
        </svg>
    </button>
    <div class="flex flex-col w-full items-center justify-center gap-[0.4rem]">
        <span class="text-black text-[1.05rem] font-bold leading-none">Adicionar novo endereço</span>
    </div>
    <div class="flex w-[3.5rem] items-center"></div>
</div>