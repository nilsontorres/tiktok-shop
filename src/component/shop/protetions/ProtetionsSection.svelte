<script>
    import ProtetionsDrawer from "$component/shop/protetions/ProtetionsDrawer.svelte";

    let drawer = $state();
</script>

<ProtetionsDrawer bind:this={drawer}/>

<button type="button" onclick={() => drawer.openDrawer()} class="flex w-full justify-between items-start gap-[0.3rem] px-4 py-3 bg-linear-to-b from-[#FFF8EE] to-[#FFFBF5]">
    <div class="flex items-start gap-[0.6rem]">
        <svg class="min-w-[0.8rem] max-w-[0.8rem] h-[1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 47">
            <path fill="#895109" d="M17 .794c1-.834 2.5-1.262 4.027 0 4.48 3.702 8.208 5.527 14.473 6.793C37 7.89 38 9.042 38 10.542v14.5c0 6-8.209 15.952-19 21-11.09-5.715-19-15-19-21v-14.5c0-1.5 1-2.637 3-3.055 5.799-1.211 9.51-2.946 14-6.693Zm.5 24.748-4.5-4-2.5 2.5 7.5 7 10-14-3-2-7.5 10.5Z"/>
        </svg>
        <div class="flex flex-col gap-[0.35rem] mt-[0.15rem]">
            <span class="flex w-full justify-start text-[#895109] text-[0.78rem] font-semibold leading-none">Proteção do cliente</span>
            <ul class="flex flex-wrap gap-x-4 gap-y-[0.15rem] mt-[0.25rem]">
                <li class="flex items-center gap-[0.25rem]">
                    <svg class="min-w-[0.5rem] max-w-[0.5rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                        <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                    </svg>                          
                    <span class="text-black text-[0.75rem] whitespace-nowrap">Devolução gratuita</span>
                </li>
                <li class="flex items-center gap-[0.25rem]">
                    <svg class="min-w-[0.5rem] max-w-[0.5rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                        <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                    </svg>
                    <span class="text-black text-[0.75rem] whitespace-nowrap">Reembolso automático por danos</span>
                </li>
                <li class="flex items-center gap-[0.25rem]">
                    <svg class="min-w-[0.5rem] max-w-[0.5rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                        <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                    </svg>
                    <span class="text-black text-[0.75rem] whitespace-nowrap">Pagamento seguro</span>
                </li>
                <li class="flex items-center gap-[0.25rem]">
                    <svg class="min-w-[0.5rem] max-w-[0.5rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 22">
                        <path fill="#895109" d="m0 12 2.5-2.5 6 6.5 11-16 3 2L9 21.5 0 12Z"/>
                    </svg>
                    <span class="text-black text-[0.75rem] whitespace-nowrap">Cupom por atraso na coleta</span>
                </li>
            </ul>
        </div>
    </div>
    <svg class="min-w-[0.33rem] max-w-[0.33rem] mt-[0.2rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 26">
        <path fill="#895109" d="M2.213 0 0 2.25 10.574 13 0 23.75 2.213 26 15 13 2.213 0Z"/>
    </svg>
</button>