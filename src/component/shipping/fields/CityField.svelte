<script>
    let { location={}, selectLocation=()=>{} } = $props();

    export const validate = () => {
        if(location?.city){
            return true;
        }
        else{
            return false;
        }
    }
</script>

<button type="button" class="flex flex-col w-full" onclick={() => selectLocation("cities")}>
    <div class="flex justify-between items-center w-full h-[3rem]">
        {#if location?.city}
            <span class="text-black text-[0.84rem]">{location?.city?.name}</span>
        {:else}
            <span class="text-[#A8A8A8] text-[0.84rem]">Cidade</span>
        {/if}
        <svg class="w-[0.75rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 22">
            <path fill="#707070" d="M0 3.5 3.5 0 18 14.5 32.5 0 36 3.5l-18 18-18-18Z"/>
        </svg>
    </div>
    <div class="flex w-full relative">
        <span class="w-full h-[0.054rem] bg-[#f1f1f1]"></span>
    </div>
</button>