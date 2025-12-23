<script>
    import PageTransition from "$component/PageTransition.svelte";
    import FinalizationPage from "$component/FinalizationPage.svelte";
    import AddShippingPage from "$component/AddShippingPage.svelte";
    import PageA from "./PageA.svelte";
    import PageB from "./PageB.svelte";
</script>

<PageTransition pages={[
    {name: "finalization", component: FinalizationPage},
    {name: "add_shipping", component: AddShippingPage}
]}/>