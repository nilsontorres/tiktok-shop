<script>
    import { removeAccent } from "$lib/formating";
    import { onMount } from "svelte";

    import Loading from "$component/Loading.svelte";
    
    let {
        view="regions",
        location={},
        onChangeCity=()=>{},
        onChangeView=()=>{}
    } = $props();

    let loading = $state(true);
    let container = $state(null);
    let scroll = $state(0);
    let letter = $state("A");
    let childs = $state({});
    let cities = $state({});
    let loading_timeout;

    let region = $derived(location?.region);
    let initial = $state(null);

    const onScroll = () => {
        const last_scroll = scroll;
        const new_scroll = container.scrollTop;

        scroll = new_scroll;
        
        Object.entries(childs).forEach(([key, value]) => {
            const child_rect = value.getBoundingClientRect();
            const container_rect = container.getBoundingClientRect();

            if (child_rect.top <= container_rect.top){
                letter = key;
            }
        });
    }
    const updateCities = async () => {
        loading = true;

        // tempo mínimo (em ms)
        const MIN_DELAY = 800;
        const start = Date.now();

        // inicia o fetch
        const request = await fetch("/api/cities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                region: region?.id
            })
        });

        // calcula quanto já passou
        const elapsed = Date.now() - start;
        const remaining = MIN_DELAY - elapsed;

        // espera o tempo mínimo, se necessário
        if (remaining > 0) {
            await new Promise(r => setTimeout(r, remaining));
        }

        if (request.status === 200) {
            const response = await request.json();

            if (response.success) {
                const results = response.results;

                cities = {};
                results.forEach(item => {
                    const letter = removeAccent(item.name[0]).toUpperCase();
                    if (!cities[letter]) {
                        cities[letter] = [];
                    }
                    cities[letter].push(item);
                });
            }
        }

        loading = false;
    };

    $effect(async () => {
        if(view == "cities"){
            container?.scrollTo({ top: 0, behavior: "instant" });

            if(region?.id != initial?.id){
                await updateCities();
                initial = region;
            }
        }
    });
</script>

<div class="flex w-full h-full relative">
    {#if loading}
        <div class="flex justify-center items-center absolute -top-[2rem] left-0 w-full h-full z-20 pointer-events-none">
            <div class="flex justify-center items-center bg-[#494646] min-w-[5rem] min-h-[5rem] max-w-[5rem] max-h-[5rem] rounded-sm relative">
                <Loading/>
            </div>
        </div>
    {:else}
        {#if scroll > 0}
            <div class={`flex absolute top-0 w-full h-[2.5rem] z-20 pt-[0.8rem] bg-white`}>
                <span class="text-black text-center text-[0.9rem] px-4 font-semibold leading-none">{letter}</span>
            </div>
        {/if}
        <div class="flex h-full flex-col justify-center absolute right-[1rem] top-0 z-20">
            <div class="flex flex-col gap-[0.12rem]">
                {#each Object.keys(cities) as key, index}
                    <button class={`flex justify-center items-center w-[0.95rem] h-[0.95rem] rounded-full ${key == letter ? "bg-[#FE2C55]" : "bg-transparent"}`} type="button">
                        <span class={`text-[0.6rem] font-semibold ${key == letter ? "text-white" : "text-[#707070]"}`}>{key}</span>
                    </button>
                {/each}
            </div>
        </div>
        <div class="flex flex-col w-full relative overflow-y-auto overscroll-y-contain transparent-scrollbar no-selectable" onscroll={onScroll} bind:this={container}>
            <div class="flex w-full relative">
                <div class="flex flex-col w-full">
                    {#each Object.keys(cities) as key, index}
                        {#if index > 0}
                            <div class="flex ps-4">
                                <span class="block w-full h-[0.05rem] bg-[#efefef]"></span>
                            </div>
                        {/if}
                        <div bind:this={childs[key]} class={`flex sticky top-0 bg-white w-full h-[2.5rem] pt-[0.8rem] ${index > 0 && "mt-[1rem]"}`}>
                            <span class="text-black text-center text-[0.9rem] px-4 font-semibold leading-none">{key}</span>
                        </div>
                        {#each cities[key] as item}
                            <div class="flex ps-4">
                                <span class="block w-full h-[0.05rem] bg-[#efefef]"></span>
                            </div>
                            <button onclick={() => onChangeCity(item)} type="button" class="w-full bg-white a">
                                <span class={`flex items-center text-[0.9rem] px-4 h-[2.8rem] ${location?.city && location?.city?.name == item.name ? "text-[#FE2C55]" : "text-black"} leading-none`}>{item.name}</span>
                            </button>
                        {/each}
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>