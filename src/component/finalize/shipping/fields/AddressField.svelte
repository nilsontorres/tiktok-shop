<script>
    let { value=$bindable("") } = $props();
</script>

<div class="flex flex-col w-full">
    <div class="flex w-full px-[1rem]">
        <input class="flex w-full h-[3rem] text-[0.86rem] text-black outline-none placeholder:text-[#A8A8A8] caret-[#FE2C55]" placeholder="Endereço" bind:value={value} type="text" name="address"/>
    </div>
    <div class="flex w-full px-[1rem] relative">
        <span class="w-full h-[0.054rem] bg-[#f1f1f1]"></span>
    </div>
</div>