<script>
    import Checkbox from "../Checkbox.svelte";

    let { price, prices, updatePrice=()=>{} } = $props();

    let checked = $state(false);

    const handleClick = () => {
        checked = !checked;
    }
</script>

<div class="flex w-full items-center gap-[15px]">
    {#if prices.length > 0}
        <button type="button" onclick={handleClick}>
            {#if price}
                <Checkbox {checked}/>
            {/if}
        </button>
    {/if}
    <div class={`flex items-center justify-center size-[70px] shrink-0 ${checked ? "bg-[#f2f2f2]" : "bg-[#f7f7f7]"} hover:bg-[#f2f2f2] cursor-pointer rounded-[6px]`}>
        <svg class="fill-[#999] group-hover:fill-[#777] w-[16px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34">
            <path d="M19 15h15v4H19v15h-4V19H0v-4h15V0h4v15Z"/>
        </svg>
    </div>
    <div class="flex flex-col w-full">
        <span class="text-[#666] text-[14px] leading-none">{@html price ? price.options.map(option => `<b class="font-semibold">${option.name}:</b> ${option.value}`).join(", ") : `Padrão`}</span>
        <div class="flex w-full items-center gap-[15px]"></div>
    </div>
</div>