<script>
    let { checked } = $props();
</script>

<div href="#" aria-label="checkbox" class={`flex justify-center items-center overflow-hidden size-[18px] rounded-[3px] border-[1px] ${checked ? "border-black" : "border-[#e2e2e2]"} cursor-pointer`}>
    <div class={`flex justify-center items-center size-[18px] shrink-0 rounded-[2px] bg-black ${checked ? "opacity-100" : "opacity-0"}`}>
        <svg class="w-[10px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 23">
            <path fill="#FFF" d="M0 12.5 3.5 9l6.5 7L21.5 0l4 3L12 22c-1.175.889-1.824.96-3 0l-9-9.5Z"/>
        </svg>          
    </div>
</div>