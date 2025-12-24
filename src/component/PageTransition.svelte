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
		if(!locked && scroll >= 100){
            locked = true;
			document.body.style.overflow = "hidden";
			/*
            document.body.style.position = "fixed";
            document.body.style.top = `-${scroll}px`;
			*/
        }
	}

	$inspect(scroll);
</script>

<svelte:window onscroll={handleScroll}/>

<div class="w-full min-h-[110vh] text-black relative">
    <div class="flex flex-col w-full h-[100dvh] fixed top-0 left-0 overflow-y-scroll">
		<span class="flex">{scroll} | {locked}</span>
	</div>
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