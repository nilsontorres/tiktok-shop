<script>
    let { selected } = $props();

    let hover = $state(null);

    const handleHover = (value) => {
        hover = value;
    }

    const resetHover = () => {
        hover = null;
    }
</script>

<div class="flex items-center justify-center">
    {#if selected.length == 1}
        <button type="button" class="flex justify-center items-center rounded-s-[6px] h-[40px] ps-[11px] pe-[12px] gap-[6px] border-[1px] group border-[#eaeaea] hover:border-[#d4d4d4] border-e-0 cursor-pointer" onmouseover={() => handleHover("edit")} onfocus={() => handleHover("edit")} onmouseout={resetHover} onblur={resetHover}>
            <svg class="h-[14px] shrink-0 fill-[#666] group-hover:fill-[#333]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                <path d="M13.293.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-13 13A1 1 0 0 1 5 19H1a1 1 0 0 1-1-1v-4a1 1 0 0 1 .293-.707l10-10 3-3ZM11 5.413l-9 9V17h2.586l9-9L11 5.414Zm4 1.173L16.586 5 14 2.414 12.414 4 15 6.586Z"/>
            </svg>                      
            <span class="text-[#666] group-hover:text-[#333] text-[14px] leading-none">Editar</span>
        </button>
        <span class={`flex w-[1px] h-[40px] ${hover == "edit" || hover == "copy" ? "bg-[#d4d4d4]" : "bg-[#eaeaea]"}`}></span>
        <button type="button" class="flex justify-center items-center h-[40px] ps-[11px] pe-[12px] gap-[6px] border-[1px] group border-[#eaeaea] hover:border-[#d4d4d4] border-x-0 cursor-pointer" onmouseover={() => handleHover("copy")} onfocus={() => handleHover("copy")} onmouseout={resetHover} onblur={resetHover}>
            <svg class="h-[14px] shrink-0 fill-[#666] group-hover:fill-[#333]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path d="M0 2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4H2a2 2 0 0 1-2-2V2Zm8 12v4h10V8h-4v4a2 2 0 0 1-2 2H8Zm4-2V2H2v10h10Z"/>
            </svg>                                
            <span class="text-[#666] group-hover:text-[#333] text-[14px] leading-none">Copiar link</span>
        </button>
        <span class={`flex w-[1px] h-[40px] ${hover == "remove" ? "bg-[#f7b2b2]" : hover == "copy" ? "bg-[#d4d4d4]" : "bg-[#eaeaea]"}`}></span>
        <button type="button" class="flex justify-center items-center h-[40px] rounded-e-[6px] ps-[11px] pe-[12px] gap-[6px] border-[1px] group border-[#eaeaea] hover:border-[#f7b2b2] border-s-0 cursor-pointer" onmouseover={() => handleHover("remove")} onfocus={() => handleHover("remove")} onmouseout={resetHover} onblur={resetHover}>
            <svg class="h-[14px] shrink-0 fill-[#d15c5c] group-hover:fill-[#dc1d1d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path d="M5 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 15.069 20H4.93a2 2 0 0 1-1.995-1.858L2.07 6H1a1 1 0 0 1 0-2h4V2Zm2 2h6V2H7v2ZM4.074 6l.857 12H15.07l.857-12H4.074Z"/>
            </svg>                      
            <span class="text-[#d15c5c] group-hover:text-[#dc1d1d] text-[14px] leading-none">Apagar</span>
        </button>
    {:else}
        <button type="button" class="flex justify-center items-center h-[40px] rounded-[6px] ps-[11px] pe-[12px] gap-[6px] border-[1px] group border-[#eaeaea] hover:border-[#d4d4d4] border-x-0 cursor-pointer" onmouseover={() => handleHover("remove")} onfocus={() => handleHover("remove")} onmouseout={resetHover} onblur={resetHover}>
            <svg class="h-[14px] shrink-0 fill-[#666] group-hover:fill-[#333]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path d="M5 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 15.069 20H4.93a2 2 0 0 1-1.995-1.858L2.07 6H1a1 1 0 0 1 0-2h4V2Zm2 2h6V2H7v2ZM4.074 6l.857 12H15.07l.857-12H4.074Z"/>
            </svg>                      
            <span class="text-[#666] group-hover:text-[#333] text-[14px] leading-none">Apagar</span>
        </button>
    {/if}
</div>