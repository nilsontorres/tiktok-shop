<script>
    import { clickout } from "$lib/clickout";

    let { method, addDiscount=()=>{} } = $props();

    let type = $state("variable");
    let input = $state(null);
    let value = $state("");
    let focus = $state(false);
    let height = $state(0);
    let open = $state(false);

    const formatCurrency = (digits) => {
        if (!digits) return "";
        const number = parseInt(digits, 10);
        const formatted = (number / 100).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return formatted;
    };

    const handleInput = (event) => {
        value = event.target.value.replace(/\D/g, "");
        value = formatCurrency(value);

        let discount = parseFloat(value.replace(".", "").replace(",", "."));
        if(type == "variable" && discount > 100) type = "fixed";
        addDiscount(method, discount);
    };

    const handleClickout = () => {
        open = false;
    }

    const handleFocus = () => {
        focus = true;
    }

    const handleBlur = () => {
        focus = false;
    }
</script>

<div class="flex items-center group">
    <div class={`flex h-[44px] items-center px-[12px] border-[1px] ${focus || open ? "border-[#d4d4d4]" : "border-[#eaeaea] group-hover:border-[#d4d4d4]"} border-e-0 rounded-s-[8px]`}>
        <span class="text-[#666] text-[14px] whitespace-nowrap leading-none">{method.label}</span>
    </div>
    <div class={`flex items-center w-full h-[44px] border-[1px] ${focus || open ? "border-[#d4d4d4]" : "border-[#eaeaea] group-hover:border-[#d4d4d4]"} cursor-text bg-[#f7f7f7]`}>
        <button type="button" class="flex w-full items-center h-full px-[10px] gap-[5px] cursor-text relative" onclick={() => input.focus()}>
            {#if type == "fixed"}
                <span class={`${value != "" ? "text-[#333]" : "text-[#888]"} text-[14px] leading-0`}>R$ </span>
            {/if}
            <span class={`${value != "" ? "text-[#333]" : "text-[#888]"} text-[14px] leading-0 opacity-0`}>{value !== "" ? value : "0,00"}</span>
            {#if type == "variable"}
                <span class={`${value != "" ? "text-[#333]" : "text-[#888]"} text-[14px] leading-0`}>%</span>
            {/if}
            <input type="text" placeholder="0,00" class={`flex absolute ${type == "fixed" ? "left-[31px]" : "left-[12px]"} text-[#333] w-full placeholder:text-[#888] text-[14px] z-20`} bind:value={value} bind:this={input} oninput={handleInput} onfocus={handleFocus} onblur={handleBlur}>
        </button>
    </div>
    <div class={`flex h-[44px] items-center border-[1px] ${focus || open ? "border-[#d4d4d4]" : "border-[#eaeaea] group-hover:border-[#d4d4d4]"} border-s-0 rounded-e-[8px]`}>
        <div class="relative">
            <button type="button" class="flex items-center ps-[13px] pe-[10px] h-[44px] gap-[6px] cursor-pointer relative z-30 group/button" onclick={() => open = true }>             
                <span class={`${open ? "text-[#333]" : "text-[#666]"} group-hover/button:text-[#333] text-[14px] font-semibold leading-0`}>{type == "fixed" ? "Fixo" : "Variável"}</span>
                <svg class={`w-[9px] mt-[3px] ${open ? "fill-[#333]" : "fill-[#666]"} group-hover/button:fill-[#333]`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 5">
                    <path d="M3.897 4.5 0 0h7.794L3.897 4.5Z"/>
                </svg>
            </button>
            <div class={`flex flex-col absolute right-0 bg-white rounded-[6px] shadow-custom w-[120px] py-[6px] overflow-hidden ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={`bottom: -${height}px;`} bind:clientHeight={height} use:clickout={handleClickout}>
                <button type="button" class="flex items-center w-full h-[32px] px-[20px] bg-white hover:bg-[#f7f7f7] cursor-pointer" onclick={() => { type = "fixed"; open = false; }}>
                    <span class={`w-full text-[#333] text-start text-[14px] ${type == "fixed" ? "font-semibold" : "font-normal"} leading-none`}>Fixo</span>
                </button>
                <button type="button" class="flex items-center w-full h-[32px] px-[20px] bg-white hover:bg-[#f7f7f7] cursor-pointer" onclick={() => { type = "variable"; open = false; }}>
                    <span class={`w-full text-[#333] text-start text-[14px] ${type == "variable" ? "font-semibold" : "font-normal"} leading-none`}>Variável</span>
                </button>
            </div>
        </div>
    </div>
</div>