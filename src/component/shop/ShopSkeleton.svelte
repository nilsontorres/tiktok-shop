<script>
    let { show=false } = $props();
</script>

<div class={`w-full h-full fixed top-0 left-0 bg-white z-50 ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
    <span class="flex w-full pb-[100vw] relative overflow-hidden skeleton"></span>
    <div class="flex flex-col p-4">
        <span class="w-[32%] h-[1.8rem] rounded-sm skeleton"></span>
        <div class="flex gap-[0.3rem] mt-[0.75rem]">
            <span class="w-[25%] h-[1.5rem] rounded-sm skeleton"></span>
            <span class="w-[25%] h-[1.5rem] rounded-sm skeleton"></span>
            <span class="w-[25%] h-[1.5rem] rounded-sm skeleton"></span>
        </div>
        <span class="w-[90%] h-[1rem] mt-[0.75rem] rounded-sm skeleton"></span>
        <span class="w-[65%] h-[1rem] mt-[0.25rem] rounded-sm skeleton"></span>
        <span class="w-[25%] h-[1rem] mt-[0.5rem] rounded-sm skeleton"></span>
        <div class="flex gap-[0.3rem] mt-[0.8rem]">
            <span class="w-[1rem] h-[1rem] mt-[0.75rem] rounded-sm skeleton"></span>
            <span class="w-[70%] h-[1rem] mt-[0.75rem] rounded-sm skeleton"></span>
        </div>
        <div class="flex gap-[0.3rem] mt-[0.8rem]">
            <span class="w-[1rem] h-[1rem] mt-[0.75rem] rounded-sm skeleton"></span>
            <span class="w-[35%] h-[1rem] mt-[0.75rem] rounded-sm skeleton"></span>
        </div>
    </div>
</div>