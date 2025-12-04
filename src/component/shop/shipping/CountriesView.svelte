<script>
    import { removeAccent } from "$lib/formating";
    import { onMount } from "svelte";

    import Loading from "$component/loadings/Loading.svelte";

    let {
        view="countries",
        location={},
        onChangeCountry=()=>{},
        onChangeView=()=>{}
    } = $props();

    let is_loading = $state(true);
    let container = $state(null);
    let scroll = $state(0);
    let letter = $state("A");
    let childs = $state({});
    let countries = $state({});
    let country = $state({});

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
    const updateCountries = async () => {
        is_loading = true;

        const request = await fetch("/api/countries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(request.status == 200){
            const response = await request.json();
            if(response.success){
                const results = response.results;

                countries = [];
                results.forEach(item => {
                    const letter = removeAccent(item.name[0]).toUpperCase();
                    if(!Object.keys(countries).includes(letter)){
                        countries[letter] = [];
                    }
                    countries[letter].push(item);
                });

                is_loading = false;
            }
        }
    }

    onMount(async () => {
        await updateCountries();
    });
</script>

<div class="flex w-full h-full relative">
    {#if is_loading}
        <div class="flex justify-center items-center absolute -top-[2rem] left-0 w-full h-full z-20 pointer-events-none">
            <div class="flex justify-center items-center bg-[#494646] min-w-[5rem] min-h-[5rem] max-w-[5rem] max-h-[5rem] rounded-sm relative">
                <Loading/>
            </div>
        </div>
    {:else}
        <div class="flex flex-col w-full overflow-y-auto overscroll-y-contain relative bg-amber-500 no-scrollbar no-selectable" onscroll={onScroll} bind:this={container}>
            <div class="flex w-full relative">
                <div class="flex flex-col w-full">
                    {#each Object.keys(countries) as key, index}
                        {#each countries[key] as item}
                            <button onclick={() => { onChangeCountry(item); onChangeView("regions"); }} type="button" class="w-full bg-white a">
                                <span class={`flex items-center text-[0.9rem] px-4 h-[2.8rem] ${location?.country && location?.country.name == item.name ? "text-[#FE2C55]" : "text-black"} leading-none`}>{item.name}</span>
                            </button>
                            <div class="flex ps-4">
                                <span class="block w-full h-[0.05rem] bg-[#efefef]"></span>
                            </div>
                        {/each}
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>