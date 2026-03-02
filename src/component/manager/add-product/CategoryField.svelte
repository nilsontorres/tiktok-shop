<script>
    import { clickout } from "$lib/clickout";
    import Checkbox from "../Checkbox.svelte";

    let { categories, addCategory=()=>{} } = $props();

    let selected = $derived(categories.filter(item => item.is_selected));
    let suggestions = $state([]);

    let value = $state("");
    let height = $state(0);
    let focus = $state(false);
    let input = $state(null);

    const removeLastCategory = () => {
        if (selected.length === 0) return;

        const last = selected[selected.length - 1];
        last.is_selected = false;

        categories = [...categories];
    }

    const handleFocus = (event) => {
        focus = true;
    }

    const handleBlur = (event) => {
        focus = false;
    }

    const handleKeydown = (event) => {
        if (event.key === "Backspace" && value === "") {
            removeLastCategory();
        }
    }

    const handleInput = (event) => {
        const q = value.trim().toLowerCase();

        if (q.length < 3) {
            suggestions = [];
            return;
        }

        suggestions = categories
            .filter(c => (c.label || "").toLowerCase().includes(q) || (c.name || "").toLowerCase().includes(q))
            .slice(0, 8);
    }

    const handleClickout = () => {
        focus = false;
        suggestions = [];
        value = "";
    }

    const selectSuggestion = (category) => {
        addCategory(category);
        suggestions = [];
        value = "";
    }
</script>

<div class="flex relative" use:clickout={handleClickout}>
    <button type="button" class={`flex flex-wrap w-full p-[10px] gap-y-[5px] gap-x-[4px] ${focus || suggestions.length > 0 ? "bg-[#f2f2f2]" : "bg-[#f7f7f7]"} ${suggestions.length > 0 ? "rounded-t-[6px]" : "rounded-[6px] hover:bg-[#f2f2f2]"} cursor-text`} onclick={() => input?.focus()}>
        {#each selected as item}
            <div class="flex items-center">
                <span class="text-white text-[12px] font-medium leading-none bg-black rounded-full px-[6px] py-[4px]">{item.label}</span>
            </div>
        {/each}
        <input type="text" placeholder="Categoria" class="text-[#333] text-[14px] w-[140px] px-[4px] h-[22px] placeholder:text-[#AAA]" bind:this={input} bind:value={value} onkeydown={handleKeydown} oninput={handleInput} onfocus={handleFocus} onblur={handleBlur}>
    </button>
    <div class={`flex flex-col justify-start gap-[12px] absolute right-0 w-full rounded-b-[6px] shadow-custom border-[1px] border-[#d4d4d4] bg-white z-20 p-[15px] ${suggestions.length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={`bottom: -${height}px;`} bind:clientHeight={height}>
        {#each suggestions as item}
            <button type="button" class="flex items-center gap-[10px] w-full cursor-pointer" onclick={() => selectSuggestion(item)}>
                <Checkbox checked={item.is_selected}/>
                <span class="text-[#666] text-start text-[14px] leading-none">{item.label}</span>
            </button>
        {/each}
    </div>
</div>