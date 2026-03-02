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

<div class={`flex w-full h-[42px] rounded-[6px] ${focus ? "bg-[#f2f2f2]" : "bg-[#f7f7f7] hover:bg-[#f2f2f2]"}`}>
    <input type="text" placeholder="Título do produto (max 200 caractéres)" class="flex w-full px-[14px] h-[42px] placeholder:text-[#AAA] text-[#333] text-[14px]" bind:value={value} onfocus={handleFocus} onblur={handleBlur}>
</div>