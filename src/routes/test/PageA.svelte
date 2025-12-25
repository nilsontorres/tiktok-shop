<script>
    let { changePage=()=>{}, locked=false } = $props();

    let scrollable = $state(null);

    export const scrollTo = (params) => {
        scrollable.scrollTo(params);
    }
</script>

<div bind:this={scrollable} class={`flex flex-col w-full min-h-dvh justify-center items-center bg-red-300 relative py-12 text-black ${locked ? "overflow-y-scroll" : "overflow-hidden"}`}>
    <div class="h-12 w-full flex items-center px-4 bg-white z-50 fixed top-0 transition-[left] duration-300 ease-in-out">
        <span class="text-black">teste página A</span>
    </div>
    <p>Página de A</p>
    <button class="text-black font-semibold mt-5" type="button" onclick={() => changePage("finalization")}>Adicionar endereço</button>
    <button class="text-black font-semibold mt-5" type="button" onclick={() => changePage("product")}>Adicionar produto</button>
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
    <div class="fixed bottom-0 h-12 w-full flex items-center px-4 bg-white z-50 transition-[left] duration-300 ease-in-out">
        <span class="text-black">teste página A</span>
    </div>
</div>