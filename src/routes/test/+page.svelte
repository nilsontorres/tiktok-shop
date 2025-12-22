<script>
    let blocked = false;
    let scroll = $state(0);
    let current = $state(0);
    let next = $state(0);

    const changePage = (value) => {
        next = value;

        setTimeout(() => {
            current = next;
        }, 300);
    }
</script>

<svelte:window onscroll={() => scroll = window?.scrollY}/>
<div class="flex h-[100vh] bg-amber-700 relative overflow-hidden">
    <div class="flex w-full h-[100dvh] fixed top-0 left-0">
        <div class={`flex flex-col min-w-screen p-[1rem] bg-blue-900 text-white will-change-transform transition-transform ease-in-out duration-300 ${current == 0 || next == 0 ? "opacity-100" : "opacity-0 pointer-events-none"} ${next == 0 ? "max-h-auto" : "max-h-[100dvh] overflow-hidden"} ${next == 0 ? "translate-x-0" : "-translate-x-[100vw]"}`}>
            [COMECO TELA 01] {scroll}
            <button class="bg-black h-[2rem]" type="button" onclick={() => changePage(1)}>Tela 02</button>
            <button class="bg-black h-[2rem] mt-[0.5rem]" type="button" onclick={() => changePage(2)}>Tela 03</button>
            <p>O dia começou com um céu claro e uma brisa leve, criando um clima agradável para quem precisava sair cedo e organizar as tarefas pendentes da semana.</p>
            <p>Em meio à rotina, pequenas pausas fazem diferença, seja para tomar um café, respirar fundo ou simplesmente observar o movimento ao redor.</p>
            <p>A tecnologia tem transformado a forma como as pessoas se comunicam, tornando as interações mais rápidas, mas também exigindo mais atenção e equilíbrio.</p>
            <p>Aprender algo novo diariamente ajuda a manter a mente ativa e estimula a curiosidade, independentemente da idade ou da área de interesse.</p>
            <p>Momentos simples, como uma conversa tranquila ou uma caminhada curta, podem trazer uma sensação inesperada de bem-estar.</p>
            [FIM TELA 01]
        </div>
        <div class={`flex flex-col min-w-screen p-[1rem] bg-red-900 text-white will-change-transform transition-transform ease-in-out duration-300 ${current == 1 || next == 1 ? "opacity-100" : "opacity-0 pointer-events-none"} max-h-[100dvh] overflow-y-scroll ${next == 1 ? "-translate-x-[100vw]" : next < 1 ? "translate-x-0" : "-translate-x-[200vw]"}`}>
            [COMECO TELA 02] {scroll}
            <button class="bg-black h-[2rem]" type="button" onclick={() => changePage(0)}>Tela 01</button>
            <button class="bg-black h-[2rem] mt-[0.5rem]" type="button" onclick={() => changePage(2)}>Tela 03</button>
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
            <p>Momentos simples, como uma conversa tranquila ou uma caminhada curta, podem trazer uma sensação inesperada de bem-estar.</p>
            <p>Organizar ideias no papel ou na tela facilita a tomada de decisões e ajuda a enxergar soluções que antes pareciam distantes.</p>
            <p>A criatividade surge muitas vezes de situações comuns, quando se permite olhar para o cotidiano com uma perspectiva diferente.</p>
            <p>Trabalhar com consistência, mesmo em pequenos passos, costuma gerar resultados mais sólidos ao longo do tempo.</p>
            <p>O ambiente ao redor influencia diretamente no foco e na produtividade, tornando importante cuidar dos detalhes do espaço.</p>
            <p>No fim do dia, refletir sobre o que foi aprendido ajuda a encerrar o ciclo com mais clareza e preparação para o próximo desafio.</p>
            <p>Organizar ideias no papel ou na tela facilita a tomada de decisões e ajuda a enxergar soluções que antes pareciam distantes.</p>
            <p>A criatividade surge muitas vezes de situações comuns, quando se permite olhar para o cotidiano com uma perspectiva diferente.</p>
            <p>Trabalhar com consistência, mesmo em pequenos passos, costuma gerar resultados mais sólidos ao longo do tempo.</p>
            <p>O ambiente ao redor influencia diretamente no foco e na produtividade, tornando importante cuidar dos detalhes do espaço.</p>
            <p>No fim do dia, refletir sobre o que foi aprendido ajuda a encerrar o ciclo com mais clareza e preparação para o próximo desafio.</p>
            [FIM TELA 02]
        </div>
        <div class={`flex flex-col min-w-screen p-[1rem] bg-yellow-600 text-white will-change-transform transition-transform ease-in-out duration-300  ${current == 2 || next == 2 ? "opacity-100" : "opacity-0 pointer-events-none"} ${next == 2 ? "max-h-auto" : "max-h-[100dvh] overflow-hidden"} ${next == 2 ? "-translate-x-[200vw]" : "-translate-x-[100vw]"}`}>
            [COMECO TELA 03]
            <button class="bg-black h-[2rem]" type="button" onclick={() => changePage(0)}>Tela 01</button>
            <button class="bg-black h-[2rem] mt-[0.5rem]" type="button" onclick={() => changePage(1)}>Tela 02</button>
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
            [FIM TELA 03]
        </div>
    </div>
</div>