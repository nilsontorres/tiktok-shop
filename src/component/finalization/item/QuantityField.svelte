<script>
    let { quantity=1, updateQuantity=()=>{} } = $props();
</script>

<div class="flex items-center">
    <button class="flex w-[1.6rem] h-[1.6rem] justify-center items-center bg-[#F2F2F2] active:bg-[#e0e0e0] rounded-s-md" type="button" aria-label="Diminuir" onclick={() => updateQuantity(quantity-1)}>
        <svg class="min-w-[0.58rem] max-w-[0.58rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 4">
            <path fill={quantity == 1 ? "#919191" : "#000"} d="M0 0h36v4H0z"/>
        </svg>
    </button>
    <div class="flex justify-center items-center w-[1.8rem] h-[1.6rem] bg-[#F2F2F2]">
        <span class="flex justify-center items-center w-full h-[0.9rem] text-[0.975rem] border-x-[0.063rem] border-x-[#e0e0e0] text-black font-medium">{quantity}</span>
    </div>
    <button class="flex w-[1.6rem] h-[1.6rem] justify-center items-center bg-[#F2F2F2] active:bg-[#e0e0e0] rounded-e-md" type="button" aria-label="Aumentar" onclick={() => updateQuantity(quantity+1)}>
        <svg class="min-w-[0.58rem] max-w-[0.58rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
            <path fill={quantity == 10 ? "#919191" : "#000"} d="M20 16h16v4H20v16h-4V20H0v-4h16V0h4v16Z"/>
        </svg>
    </button>      
</div>