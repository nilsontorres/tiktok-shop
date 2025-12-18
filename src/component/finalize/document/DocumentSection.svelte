<script>
    import DocumentDrawer from "$component/finalize/document/DocumentDrawer.svelte";

    let { document, onChangeDocument=()=>{}, openAddressDrawer=()=>{} } = $props();

    let drawer = $state();
</script>

<DocumentDrawer bind:this={drawer} {document} {onChangeDocument}/>

<div class="w-full overflow-hidden bg-white px-[1rem] py-[0.75rem] relative">
    {#if document}
        <button class="flex w-full h-[1.6rem] items-center" type="button">
            <div class="flex w-full gap-[0.35rem] items-center">
                <svg class="w-[0.7rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 40">
                    <path fill="#000" d="M17 23a17.002 17.002 0 0 1 17 17h-3.984a13.015 13.015 0 1 0-26.032 0H0a17.001 17.001 0 0 1 17-17Zm0-23c5.523 0 10 4.477 10 10s-4.477 10-10 10S7 15.523 7 10 11.477 0 17 0Zm0 3.96a6.04 6.04 0 1 0 0 12.08 6.04 6.04 0 0 0 0-12.08Z"/>
                </svg>
                <span class="text-black text-[0.85rem] leading-none mt-[0.1rem]"><b class="font-semibold">CPF:</b> {document}</span>
            </div>
            <svg class="h-[0.76rem] me-[0.25rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 35">
                <path fill="#858585" d="m0 3 3-3 17.5 17.5L3 35l-3-3 14-14.5L0 3Z"/>
            </svg>
        </button>
    {:else}
        <button class="flex w-full h-[2.6rem] justify-center items-center gap-[0.35rem] rounded-md bg-[#F2F2F2]" type="button" onclick={() => drawer.openDrawer()}>
            <svg class="w-[0.88rem] h-[0.87rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 46 46">
                <path fill="#000" d="M24 0a2 2 0 0 1 2 2v18h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H26v18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V26H2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h18V2a2 2 0 0 1 2-2h2Z"/>
            </svg>            
            <span class="text-black text-[0.975rem] font-semibold leading-none">Adicionar CPF</span>
        </button>     
    {/if}
    <div class="absolute bottom-0 left-0 w-[106vw] -translate-x-[3vw] h-[0.13rem] bg-white bg-contain bg-repeat-x" style={`background-image: url('/images/pattern-1.png')`}></div>
</div>