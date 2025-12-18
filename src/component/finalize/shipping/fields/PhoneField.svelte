<script>
    let { value=$bindable("") } = $props();
</script>

<div class="flex flex-col w-full">
    <div class="flex gap-[1rem] px-[1rem]">
        <div class="flex justify-center items-center h-[3rem] text-[#858585] text-[0.9rem]">BR +55</div>
        <input class="w-fill h-[3rem] text-[0.86rem] text-black outline-none placeholder:text-[#A8A8A8] caret-[#FE2C55]" placeholder="Número de telefone" bind:value={value} type="text" name="phone"/>
    </div>
    <div class="flex w-full px-[1rem] relative">
        <span class="w-full h-[0.054rem] bg-[#f1f1f1]"></span>
    </div>
</div>