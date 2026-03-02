<script>
    import { clickout } from "$lib/clickout";
    import Checkbox from "../Checkbox.svelte";

    let { variation, variations, updateVariation=()=>{} } = $props();

    let checked = $state(false);
    let height = $state(0);
    let open = $state(false);
    let options = $state(variation ? variation.options : []);
    let wrapper = $state(null);
    let value_name = $state(variation ? variation.name : "");
    let value_options = $state("");
    let input_name = $state(null);
    let input_options = $state(null);
    let focus_name = $state(false);
    let focus_options = $state(false);

    const capitalizeFirstOnly = (value) => {
        if(!value) return "";

        const lower = value.toLowerCase();
        return lower.charAt(0).toUpperCase() + value.slice(1);
    }

    const handleKeydown = (event) => {
        if ((event.key === "Enter" || event.key == "," || event.key == "Tab") && value_options != "") {
            event.preventDefault();

            const raw = capitalizeFirstOnly(value_options?.trim());
            if (!raw) return;

            if(!options.includes(raw)){
                options = [ ...options, raw ];
            }

            value_options = "";
        }
        else if(event.key === "Backspace" && value_options === ""){
            event.preventDefault();
            options.pop();
        }

        wrapper.scrollTo({ top: 9999, behavior: "instant" });

        if(value_name !== "" && options.length > 0){
            updateVariation(value_name, options);
            if(!variation){
                options = [];
                value_name = "";
                value_options = "";
            }
        }
    };

    const handleInput = (event) => {
        value_name = capitalizeFirstOnly(event.target.value?.trim());
    }

    const handleClickout = () => {
        open = false;
    }

    const handleNameFocus = () => {
        focus_name = true;
    }

    const handleNameBlur = () => {
        focus_name = false;
    }

    const handleOptionsFocus = () => {
        focus_options = true;
    }

    const handleOptionsBlur = () => {
        focus_options = false;
    }

    const handleClick = () => {
        checked = !checked;
    }
</script>

<div class="flex gap-[15px] relative" use:clickout={handleClickout}>
    {#if variations.length > 0}
        <div class="flex w-[18px] shrink-0">
            {#if variation}
                <button type="button" onclick={handleClick}>
                    <Checkbox {checked}/>
                </button>
            {/if}
        </div>
    {/if}
    <div class={`flex w-[200px] h-[44px] items-center ${focus_name || open || checked ? "bg-[#f2f2f2]" : "bg-[#f7f7f7] hover:bg-[#f2f2f2]"} rounded-[6px]`}>
        <input type="text" placeholder="Nome" class="w-full h-[44px] text-[#333] text-[14px] px-[15px] placeholder:text-[#AAA]" bind:this={input_name} bind:value={value_name} oninput={handleInput} onfocus={handleNameFocus} onblur={handleNameBlur}>
    </div>
    <button type="button" class={`flex w-full h-[44px] overflow-y-auto transparent-scroll px-[10px] gap-[4px] rounded-[6px] ${focus_options || checked ? "bg-[#f2f2f2]" : "bg-[#f7f7f7] hover:bg-[#f2f2f2]"} ${variations.length > 0 ? "" : "hover:bg-[#f2f2f2]"} cursor-text`} bind:this={wrapper} onclick={() => input_options?.focus()}>
        {#each options as option}
            <div class="flex items-center">
                <span class="text-white text-[12px] font-medium leading-none bg-black rounded-full px-[6px] py-[4px]">{option}</span>
            </div>
        {/each}
        <input type="text" placeholder="Opções" class="text-[#333] text-[14px] w-[140px] px-[4px] h-[42px] placeholder:text-[#AAA]" bind:this={input_options} bind:value={value_options} onkeydown={handleKeydown} onfocus={handleOptionsFocus} onblur={handleOptionsBlur}>
    </button>
</div>