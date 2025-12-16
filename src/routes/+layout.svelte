<script>
	import "$style/app.css";
	
	import { navigating } from "$app/stores";

    import ProductSkeleton from "$component/product/ProductSkeleton.svelte";
    import FinalizeSkeleton from "$component/finalize/FinalizeSkeleton.svelte";
	
	let { children } = $props();
</script>

{#if $navigating}
	{#if $navigating.to.route.id == "/product/[slug]"}
		<ProductSkeleton/>
	{:else if $navigating.to.route.id == "/finalize/[slug]"}
		<FinalizeSkeleton/>
	{/if}
{:else}
	{@render children()}
{/if}