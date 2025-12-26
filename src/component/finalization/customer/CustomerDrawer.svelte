<script>
    import DocumentField from "$component/finalization/customer/fields/DocumentField.svelte";
    import { validateCPF } from "$lib/validation";
    import { onMount } from "svelte";

    let { customer={}, updateCustomer=()=>{} } = $props();

    let loading = $state(false);
    let open = $state(false);
    let focus = $state(false);
    let error = $state(null);
    let submit = $state(null);
    let value = $state("");

    export const openDrawer = () => {
        window.document.body.classList.add("no-scroll");
        value = "";
        error = null;
        open = true;
    }
    export const closeDrawer = () => {
        open = false;
        window.scrollTo({ top: 0, behavior: "instant" });
        window.document.body.classList.remove("no-scroll");
    }
    const submitForm = (e) => {
        error = null;
        
        if(validateCPF(value)){
            closeDrawer();
            window.document.body.classList.add("no-scroll");
            loading = true;

            setTimeout(() => {
                loading = false;
                window.document.body.classList.remove("no-scroll");
                updateCustomer({
                    document: {
                        type: "CPF",
                        number: value
                    }
                });
            }, 2000);
        }
        else{
            error = "CPF inválido. Verifique e tente novamente.";
        }
    }

    onMount(() => {
        submit.addEventListener("touchstart", submitForm, { passive: false })
        return () => {
            submit.removeEventListener("touchstart", submitForm);
        }
    });
</script>

<div class={`fixed top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none z-50 duration-300 transition-opacity ${loading ? "opacity-100" : "opacity-0"}`}>
    <div class="flex flex-col justify-center items-center w-[7.6rem] pt-[2rem] pb-[0.9rem] rounded-[0.25rem] bg-[#000000b5]">
        <div class="relative w-[1rem] h-[1rem] me-[0.5rem] z-20">
            <span class="absolute w-3 h-3 rounded-full bg-cyan-300 mix-blend-darken animate-revolve"></span>
            <span class="absolute w-3 h-3 rounded-full bg-red-500 mix-blend-darken animate-revolve [animation-delay:-0.4s]"></span>
        </div>
        <span class="w-full text-white text-center text-[0.78rem] font-semibold mt-[1.15rem]">Carregando...</span>
    </div>
</div>
<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${open ? "opacity-50" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${open ? "translate-y-0" : "translate-y-[100%]"} transition-transform duration-200 z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-[0.55rem] right-[0.5rem] p-2 z-50" onclick={closeDrawer}>
            <svg class="min-w-[0.8rem] max-w-[0.8rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[0.75rem] px-4 py-[1.15rem]">
            <span class="text-black text-[1.06rem] font-bold leading-none">Adicionar CPF</span>
        </div>
        <div class="flex flex-col w-full transparent-scroll px-[1rem]">
            <span class="text-[#595959] text-[0.8rem] text-start leading-[0.88rem]">O CPF será usado para emitir faturas</span>
            <DocumentField bind:value={value} onFocus={() => focus = true} onBlur={() => focus = false} {error}/>
        </div>
        <div class="w-full p-[1rem]">
            <button bind:this={submit} class="flex justify-center items-center w-full h-[3rem] rounded-lg bg-[#FE2C55] hover:bg-[#E81D44] active:bg-[#E81D44] disabled:opacity-50" type="button" disabled={!value}>
                <span class="text-white text-[0.92rem] font-semibold leading-none">Confirmar</span>
            </button>
        </div>
        {#if focus == false}
            <div class="w-full h-[env(safe-area-inset-bottom)]"></div>
        {/if}
    </div>
</div>