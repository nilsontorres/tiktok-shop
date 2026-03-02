<script>
    import Checkbox from "../Checkbox.svelte";

    let { methods, selectMethod=()=>{} } = $props();
</script>

<div class="flex flex-col gap-[12px] w-full">
    {#each methods as method }
        <div class="flex">
            <button type="button" class="flex items-center cursor-pointer gap-[12px]" onclick={() => selectMethod(method)}>
                <Checkbox checked={method.is_selected}/>
                <span class="text-[#666] text-[14px] leading-none">{method.label}</span>
            </button>
        </div>
    {/each}
</div>