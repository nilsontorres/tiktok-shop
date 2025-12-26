<script>
    import { PUBLIC_UPLOAD_BASE } from '$env/static/public';

    import PageTransition from "$component/PageTransition.svelte";
    import FinalizationPage from "$component/FinalizationPage.svelte";
    import AddShippingPage from "$component/ShippingPage.svelte";
    import ProductPage from '$component/ProductPage.svelte';

    let { data } = $props();

    let shipping = $state({});
    let product = $state({});
    let quantity = $state(1);
    let saved = $state(false);

    const updateShipping = (value) => {
        shipping = value;
    }
    const saveProduct = () => {
        saved = !saved;
    }
    const incrementQuantity = () => {
        quantity = Math.max(1, Math.min(10, quantity+1));
    }
    const decrementQuantity = () => {
        quantity = Math.min(10, Math.max(1, quantity-1));
    }
    const loadProduct = async () => {
        const request = await fetch("/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: data?.id })
        });

        if(request.status === 200){
            product = await request.json();
        }
    }
</script>

<svelte:head>
    {#each data?.images as image}
        {#if image.index == 0}
            <link rel="preload" as="image" href={`${PUBLIC_UPLOAD_BASE}/${image.source}`}/>
        {/if}
    {/each}
</svelte:head>

<PageTransition pages={[
    {name: "product", color: "#FFFFFF", component: ProductPage, props: { product, saved, quantity, incrementQuantity, decrementQuantity, saveProduct }},
    {name: "finalization", color: "#FFFFFF", component: FinalizationPage, props: { product, quantity, incrementQuantity, decrementQuantity }},
    {name: "add_shipping", color: "#F5F5F5", component: AddShippingPage, props: { shipping, updateShipping }}
]}/>