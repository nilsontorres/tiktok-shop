<script>
    import { initPageState } from "$state/page.svelte";

    import ProductPage from '$component/product/ProductPage.svelte';

    let { data } = $props();

    const page = initPageState();
    page.changePage(data?.page, data?.data);
</script>

{#if page?.name == "product"}
    <ProductPage/>
{/if}