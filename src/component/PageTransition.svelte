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
			document.body.style.overflow = "hidden";
        }
	}

	$inspect(scroll);
</script>

<svelte:window onscroll={handleScroll}/>

<div class="w-full min-h-[120vh] text-black relative">
    <div class="flex flex-col w-full max-h-[100dvh] fixed top-0 left-0 overflow-y-scroll">
		<p>O dia começou com um céu claro e uma brisa leve, criando um clima agradável para quem precisava sair cedo e organizar as tarefas pendentes da semana.</p>
		<p>Em meio à rotina, pequenas pausas fazem diferença, seja para tomar um café, respirar fundo ou simplesmente observar o movimento ao redor.</p>
		<p>A tecnologia tem transformado a forma como as pessoas se comunicam, tornando as interações mais rápidas, mas também exigindo mais atenção e equilíbrio.</p>
		<p>Aprender algo novo diariamente ajuda a manter a mente ativa e estimula a curiosidade, independentemente da idade ou da área de interesse.</p>
		<p>Momentos simples, como uma conversa tranquila ou uma caminhada curta, podem trazer uma sensação inesperada de bem-estar.</p>
		<p>Organizar ideias no papel ou na tela facilita a tomada de decisões e ajuda a enxergar soluções que antes pareciam distantes.</p>
		<p>A criatividade surge muitas vezes de situações comuns, quando se permite olhar para o cotidiano com uma perspectiva diferente.</p>
		<p>Trabalhar com consistência, mesmo em pequenos passos, costuma gerar resultados mais sólidos ao longo do tempo.</p>
		<p>O ambiente ao redor influencia diretamente no foco e na produtividade, tornando importante cuidar dos detalhes do espaço.</p>
		<p>No fim do dia, refletir sobre o que foi aprendido ajuda a encerrar o ciclo com mais clareza e preparação para o próximo desafio.</p>
		<p>O dia começou com um céu claro e uma brisa leve, criando um clima agradável para quem precisava sair cedo e organizar as tarefas pendentes da semana.</p>
		<p>Em meio à rotina, pequenas pausas fazem diferença, seja para tomar um café, respirar fundo ou simplesmente observar o movimento ao redor.</p>
		<p>A tecnologia tem transformado a forma como as pessoas se comunicam, tornando as interações mais rápidas, mas também exigindo mais atenção e equilíbrio.</p>
		<p>Aprender algo novo diariamente ajuda a manter a mente ativa e estimula a curiosidade, independentemente da idade ou da área de interesse.</p>
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