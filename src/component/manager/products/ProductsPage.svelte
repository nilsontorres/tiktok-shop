<script>
    import { onMount, untrack } from "svelte";
    import ResultItem from "./ResultItem.svelte";
    import ActionBar from "./ActionBar.svelte";
    import { goto } from "$app/navigation";

    let { total, changePage=()=>{} } = $props();

    let offset = $state(0);
    let results = $state([]);
    let selected = $derived(results?.filter(item => item.is_selected));

    const loadProducts = async () => {
        const request = await fetch(`/api/manager/product?offset=${offset}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if(request.status === 200){
            results = await request.json();
        }
    }

    const selectResult = (product) => {
        results.at(index).is_selected = !results.at(index).is_selected;
    }

    const enableProduct = (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        const index = results.findIndex(item => item.id == product.id);
        results.at(index).is_active = !results.at(index).is_active;
    }

    onMount(loadProducts);

    $inspect(total);
</script>

<div class="flex flex-col w-full min-h-dvh relative bg-[#f7f7f7] p-[30px]">
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-[30px]">
            <div class="flex flex-col gap-[5px]">
                <h2 class="text-black text-[20px] font-semibold leading-none">Produtos</h2>
                <span class="text-[#888] text-[14.4px] leading-[17px]">
                    {#if selected.length == 1}
                        1 produto selecionado
                    {:else if selected.length > 1}
                        {selected.length} produtos selecionados
                    {:else if total.products == 1}
                        1 produto cadastrado
                    {:else if total.products > 1}
                        {total.products} produtos cadastrados
                    {:else}
                        Nenhum produto cadastrado
                    {/if}
                </span>
            </div>
            {#if selected.length > 0}
                <ActionBar {selected}/>
            {/if}
        </div>
        <button type="button" class="flex justify-center items-center gap-[5px] h-[44px] rounded-full ps-[14px] pe-[14px] bg-black hover:opacity-80 cursor-pointer" onclick={() => changePage("add-product")}>
            <svg class="fill-white w-[15px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                <path d="M25 19h19v6H25v19h-6V25H0v-6h19V0h6v19Z"/>
            </svg>
            <span class="text-white text-[14px] font-semibold leading-none">Adicionar produto</span>
        </button>
    </div>
    {#if results?.length > 0}
        <div class="flex flex-col w-full mt-[30px]">
            {#each results as result}
                <ResultItem {result} {selectResult} {enableProduct}/>
            {/each}
        </div>
    {/if}
</div>