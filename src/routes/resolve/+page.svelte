<script>
    let { data } = $props();

    let page = $state(data?.page);
    let params = $state(data?.params);
</script>

{#if page == "product"}
    <h1>Página de produto</h1>
{/if}