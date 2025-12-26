<script>
    import PageTransition from "$component/PageTransition.svelte";
    import FinalizationPage from "$component/FinalizationPage.svelte";
    import AddShippingPage from "$component/AddShippingPage.svelte";
</script>

<PageTransition pages={[
    {name: "finalization", color: "#FFFFFF", component: FinalizationPage, props: {id: "ccf7dbe7-bd3a-4b56-8e1e-df51b9e67100", images: []}},
    {name: "add_shipping", color: "#F5F5F5", component: AddShippingPage}
]}/>