<script>
    let { changePage=()=>{}, locked=false } = $props();

    let scrollable = $state(null);

    export const scrollTo = (params) => {
        scrollable.scrollTo(params);
    }
</script>

<div bind:this={scrollable} class={`flex flex-col w-full min-h-dvh justify-center items-center bg-amber-500 relative ${locked ? "overflow-y-scroll" : "overflow-hidden"}`} >
    <span class="text-black text-[0.875rem]">Página de produto</span>
    <button class="text-black font-semibold mt-5" type="button" onclick={() => changePage("add_shipping")}>Adicionar endereço</button>
</div>