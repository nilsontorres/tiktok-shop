<script>
    import { onMount } from "svelte";

    let {
        promotions=[]
    } = $props();
</script>

<div class="flex w-full items-center relative">
    <div class="flex overflow-x-auto relative unselectable no-scrollbar">
        <button type="button" class="mt-0">
            <ul class="flex items-center gap-2">
                <div class="flex w-[0.5rem]"></div>
                {#each promotions as promotion, index}
                    <li class={`flex justify-between items-center w-[16rem] h-[3.75rem] gap-[0.4rem] border-[0.063rem] rounded-lg px-[0.7rem] relative ${promotion.theme == 'blue' ? 'bg-[#F0FBFB] border-[#C6F0F0]' : 'bg-[#FFF9FA] border-[#FFD2DA]'}`}>
                        <svg class="min-w-[0.34rem] max-w-[0.34rem] absolute -left-[0.084rem] top-[1.5rem] z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 21">
                            <path fill="#fff" d="M2.455.5C7.727.5 12 4.977 12 10.5s-4.273 10-9.545 10A9.148 9.148 0 0 1 0 20.164V.835A9.15 9.15 0 0 1 2.455.5Z"/>
                            <path fill={promotion.theme == 'blue' ? '#BAE8E8' : '#FFD2DA'} d="M2 0c3.512 0 6.224 1.293 8.05 3.295 1.813 1.986 2.7 4.61 2.7 7.205 0 2.595-.887 5.22-2.7 7.205C8.225 19.707 5.513 21 2 21v-2c2.988 0 5.15-1.082 6.574-2.643 1.438-1.576 2.176-3.702 2.176-5.857 0-2.155-.738-4.28-2.176-5.857C7.151 3.083 4.988 2 2 2V0Z"/>
                        </svg>
                        <div class="flex flex-col justify-center">
                            <span class="w-full text-start text-black text-[0.84rem] font-semibold whitespace-nowrap leading-[1.2rem]">{promotion.title}</span>
                            <span class="w-full text-start text-[#706D6E] text-[0.675rem] leading-[0.9rem]">{promotion.body}</span>
                        </div>
                        <span class={`text-white text-[0.7rem] font-bold px-[0.3rem] py-[0.4rem] rounded-sm leading-none ${promotion.theme == 'blue' ? 'bg-[#13C2C2]' : 'bg-[#FE2C55]'}`}>Resgatar</span> 
                        <svg class="min-w-[0.34rem] max-w-[0.34rem] absolute -right-[0.084rem] top-[1.5rem] z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 21">
                            <path fill="#fff" d="M10.295 20.5C5.023 20.5.75 16.023.75 10.5S5.023.5 10.295.5c.849 0 1.671.118 2.455.336v19.329a9.147 9.147 0 0 1-2.455.335Z"/>
                            <path fill={promotion.theme == 'blue' ? '#BAE8E8' : '#FFD2DA'} d="M10.75 21c-3.512 0-6.224-1.293-8.05-3.295C.886 15.72 0 13.095 0 10.5c0-2.595.887-5.22 2.7-7.205C4.525 1.293 7.237 0 10.75 0v2C7.762 2 5.6 3.082 4.176 4.643 2.738 6.219 2 8.345 2 10.5c0 2.155.738 4.28 2.176 5.857C5.599 17.917 7.762 19 10.75 19v2Z"/>
                        </svg>                                              
                    </li>
                {/each}
                <div class="flex w-[0.8rem]"></div>
            </ul>
        </button>
    </div>
</div>