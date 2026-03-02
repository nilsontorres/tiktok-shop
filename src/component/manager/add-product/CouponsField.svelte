<script>
    let { coupons, addCoupon=()=>{} } = $props();
</script>

<div class="flex flex-col">
    <div class="flex">
        <button type="button" class="flex items-center gap-[8px] h-[40px] ps-[11px] pe-[10px] cursor-pointer bg-white hover:bg-[#f7f7f7] group rounded-[8px]">
            <svg class="fill-[#888] group-hover:fill-[#666] w-[14px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path d="M25 19h19v6H25v19h-6V25H0v-6h19V0h6v19Z"/>
            </svg>
            <span class="text-[#888] group-hover:text-[#666] text-[14px] font-medium leading-none">Adicionar cupom</span>
        </button>
    </div>
</div>