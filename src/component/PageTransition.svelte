<script>
    import { onMount } from "svelte";

    let { pages=[] } = $props();

	let current = $state(0);
	let prevent = $state(0);

	const changePage = (name) => {
		const index = pages.findIndex(page => page.name == name);
		document.body.style.backgroundColor = pages[index]?.color;

		if(index !== -1){
			prevent = current;
			current = index;
		}
	}

	onMount(() => {
		window.scrollTo({ top: 0 });

		document.addEventListener('touchstart', () => {
			window.scrollTo({ top: 20, behavior: "smooth" });
		}, { once: true });
	});
</script>

<div class="grid grid-cols-1 grid-rows-1 w-full overflow-hidden bg-white" style="height: calc(100dvh + 20px)">
	{#each pages as page, index}
		<div class={`col-start-1 row-start-1 w-full min-h-[100dvh] flex flex-col min-w-full will-change-transform transition-transform ease-in-out ${index === current || index === prevent ? "duration-300" : "duration-0"} ${index === current ? "translate-x-0" : index == prevent ? current > prevent ? "-translate-x-full" : "translate-x-full" : index < current ? "-translate-x-full" : "translate-x-full"} ${index === current || index === prevent ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'} ${index === current ? 'max-h-auto' : 'max-h-[100dvh] overflow-y-scroll'}`}>
			<page.component {...page.props} {changePage}/>
		</div>
	{/each}
</div>