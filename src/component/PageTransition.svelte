<script>
    import { onMount } from "svelte";

    let { pages=[] } = $props();

	let locked = $state(false);
	let scroll = $state(0);
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
	const handleScroll = () => {
		scroll = window.scrollY;
		if(!locked && scroll > 1){
			locked = true;
			document.body.classList.add("no-scroll");
		}
	}
</script>

<svelte:window onscroll={handleScroll}/>

<div class="w-full min-h-[200vh] overflow-hidden bg-amber-400">
	<span class="flex pt-10">{scroll} | {locked}</span>
	<!--
	<div class="fixed top-0 left-0 grid grid-cols-1 grid-rows-1 w-dvw h-dvh bg-white">
		{#each pages as page, index}
			<div class={`col-start-1 row-start-1 w-full min-h-[100dvh] flex flex-col min-w-full will-change-transform transition-transform ease-in-out ${index === current || index === prevent ? "duration-300" : "duration-0"} ${index === current ? "translate-x-0" : index == prevent ? current > prevent ? "-translate-x-full" : "translate-x-full" : index < current ? "-translate-x-full" : "translate-x-full"} ${index === current || index === prevent ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'} ${index === current ? 'max-h-auto' : 'max-h-[100dvh] overflow-y-scroll'}`}>
				<page.component {...page.props} {changePage}/>
			</div>
		{/each}
	</div>
	-->
</div>