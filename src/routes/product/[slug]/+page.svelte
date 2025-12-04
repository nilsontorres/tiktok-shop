<script>
    import ShopPage from '$component/shop/ShopPage.svelte';

    let { data } = $props();
</script>

<ShopPage slug={data?.slug}/>