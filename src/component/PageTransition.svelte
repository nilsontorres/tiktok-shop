<script>
	let { pages=[] } = $props();

	let current = $state(0);
	let prevent = $state(null);

	const changePage = (name) => {
		prevent = current;
		const index = pages.findIndex(page => page.name == name);
		if(index !== -1) current = index;
	}
</script>

<div class="grid w-full overflow-x-hidden">
	{#each pages as page, index}
		{@const position = index === current ? "left-0" : (index < current ? "-left-full" : "left-full")}
		<div class={`row-start-1 col-start-1 w-full relative transition-[left] duration-300 ease-in-out ${index == current || index == prevent ? "opacity-100" : "opacity-0"} ${index == current ? "max-h-auto z-20" : "max-h-dvh overflow-hidden z-10"} ${position}`}>
			<page.component {...page.props} {changePage} {position} />
		</div>
	{/each}
</div>

<!--
<script>
    let { pages=[] } = $props();

	let current = $state(0);
	let prevent = $state(0);

	const changePage = (name) => {
		const index = pages.findIndex(page => page.name == name);
		if(index !== -1){
			prevent = current;
			current = index;
		}
	}
</script>

<div class="grid grid-cols-1 grid-rows-1 w-full overflow-x-hidden bg-white">
	{#each pages as page, index}
		<div class={`col-start-1 row-start-1 w-full min-h-[100dvh] text-white flex flex-col min-w-full will-change-transform transition-transform ease-in-out ${index === current || index === prevent ? "duration-300" : "duration-0"} ${index === current ? "translate-x-0" : index == prevent ? current > prevent ? "-translate-x-full" : "translate-x-full" : index < current ? "-translate-x-full" : "translate-x-full"} ${index === current || index === prevent ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'} ${index === current ? 'max-h-auto' : 'max-h-[100dvh] overflow-y-scroll'}`}>
			<page.component {...page.props} {changePage}/>
		</div>
	{/each}
</div>
-->