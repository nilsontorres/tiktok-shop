<script>
    let { enabled } = $props();
</script>

<div class={`flex w-[38px] h-[22px] p-[2px] rounded-full cursor-pointer transition-all duration-150 ${enabled ? "bg-black ps-[18px]" : "bg-[#eaeaea]"}`}>
    <span class="flex size-[18px] rounded-full bg-white shadow-md transition-all duration-150"></span>
</div>