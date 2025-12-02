<script>
    import ProductPage from '$component/pages/ProductPage.svelte';

    let { data } = $props();
</script>

<ProductPage slug={data?.slug}/>