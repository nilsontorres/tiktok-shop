<script>
    let { value=$bindable("") } = $props();

    let focus = $state(false);

    const handleFocus = () => {
        focus = true;
    }

    const handleBlur = () => {
        focus = false;
    }
</script>

<div class={`flex w-full rounded-[6px] ${focus ? "bg-[#f2f2f2]" : "bg-[#f7f7f7] hover:bg-[#f2f2f2]"}`}>
    <textarea placeholder="Descrição do produto (max 1000 caractéres)" class="flex w-full px-[14px] py-[10px] min-h-[100px] max-h-[300px] placeholder:text-[#AAA] text-[#333] text-[14px]" bind:value={value} onfocus={handleFocus} onblur={handleBlur}></textarea>
</div>