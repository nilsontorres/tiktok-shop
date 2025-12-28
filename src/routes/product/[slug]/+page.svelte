<script>
    import { onMount } from 'svelte';
    import { addHoursToDate } from '$lib/datetime.js';
    import { PUBLIC_UPLOAD_BASE } from '$env/static/public';

    import PageTransition from "$component/PageTransition.svelte";
    import FinalizationPage from "$component/FinalizationPage.svelte";
    import ShippingPage from "$component/ShippingPage.svelte";
    import ProductPage from '$component/ProductPage.svelte';
    import ProductSkeleton from '$component/product/ProductSkeleton.svelte';
    import OrderPage from '$component/PaymentPage.svelte';

    let { data } = $props();

    let shipping = $state(data.shipping);
    let product = $state(data.product);
    let price = $state(data.price);

    let ready = $state(false);
    let saved = $state(false);
    let quantity = $state(1);

    const updateShipping = (value) => {
        shipping = value;
    }
    const updateQuantity = (value) => {
        quantity = Math.max(1, Math.min(10, value));
    }
    const saveProduct = () => {
        saved = !saved;
    }
    const loadProduct = async () => {
        const request = await fetch("/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: product?.id })
        });

        if(request.status === 200){
            product = await request.json();
            ready = true;
        }
    }

    onMount(loadProduct);
</script>

<svelte:head>
    {#each product?.images as image}
        {#if image.index == 0}
            <link rel="preload" as="image" href={`${PUBLIC_UPLOAD_BASE}/${image.source}`}/>
        {/if}
    {/each}
</svelte:head>

{#if ready}
    <PageTransition pages={[
        {name: "product", color: "#FFFFFF", component: ProductPage, props: {
            product,
            shipping,
            price,
            saved,
            quantity,
            updateShipping,
            updateQuantity,
            saveProduct
        }},
        {name: "finalization", color: "#FFFFFF", component: FinalizationPage, props: {
            product,
            shipping,
            price,
            quantity,
            updateShipping,
            updateQuantity
        }},
        {name: "shipping", color: "#F5F5F5", component: ShippingPage, props: {
            shipping,
            updateShipping
        }},
        {name: "payment", color: "#FFFFFF", component: OrderPage, props: {
            order: {method: "pix", total: 47.70, expiration: addHoursToDate(Date.now(), 23)}
        }}
    ]}/>
{:else}
    <ProductSkeleton/>
{/if}