<script>
    import { onMount } from "svelte";

    import CitiesView from "$component/shop/shipping/CitiesView.svelte";
    import CountriesView from "$component/shop/shipping/CountriesView.svelte";
    import RegionsView from "$component/shop/shipping/RegionsView.svelte";
    import SearchPostalField from "$component/shop/shipping/SearchPostalField.svelte";

    let {
        open=false,
        shipping={},
        onCloseDrawer=()=>{},
        onChangeCity=()=>{},
        onChangeRegion=()=>{},
        onChangeCountry=()=>{}
    } = $props();

    let view = $state("countries");
    let tab = $state("countries");

    let dragging = $state(false);
    let location = $state(shipping.location);
    let initial = $state.snapshot(location);

    let container;

    const changeView = (value, animated=true) => {
        dragging = true;

        tab = value;
        view = value;
        
        const width = window.innerWidth;

        if(value == "countries"){
            setTimeout(() => {
                container.scrollTo({ left: 0, behavior: animated ? "smooth" : "instant" });
            }, 100);
        }
        else if(value == "regions"){
            setTimeout(() => {
                container.scrollTo({ left: width, behavior: animated ? "smooth" : "instant" });
            }, 100);
        }
        else {
            setTimeout(() => {
                container.scrollTo({ left: (width * 2), behavior: animated ? "smooth" : "instant" });
            }, 100);
        }

        setTimeout(() => {
            dragging = false;
        }, 350);
    };
    const changeCountry = (value) => {
        location.country = value;
        onChangeCountry(value);
    }
    const changeRegion = (value) => {
        location.region = value;
        onChangeRegion(value);
    }
    const changeCity = (value) => {
        location.city = value;
        onChangeCity(value);
    }

    const onScrollX = () => {
        const scroll_x = container.scrollLeft;
        const window_width = window.innerWidth;

        if(scroll_x >= (window_width * 1.5)){
            view = "cities";
        }
        else if(scroll_x >= (window_width / 2)){
            view = "regions";
        }
        else{
            view = "countries";
        }

        if(!dragging){
            tab = view;
        }
    }

    $effect(() => {
        if(open == true){
            location = initial;
            changeView("regions", false);
        }
    });
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <button onclick={onCloseDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-3 right-3 p-2 z-50" onclick={onCloseDrawer}>
            <svg class="min-w-[0.85rem] max-w-[0.85rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[0.75rem] px-4 pt-[1.2rem] pb-[0.3rem]">
            <span class="text-black text-[1rem] font-bold leading-none">Selecionar {tab == "regions" ? "Estado/UF" : tab == "cities" ? "Cidade" : "País"}</span>
        </div>
        <div class="flex absolute bottom-0 left-0 w-full h-[1rem]"></div>
        <div class="flex flex-col w-full px-4 py-5 relative">
            <div class="flex items-center gap-[0.75rem]">
                <button type="button" class="flex flex-col gap-[0.35rem]" onclick={() => { changeView("countries"); }}>
                    <span class={`text-[0.9rem] font-semibold ${tab == "countries" ? "text-black" : "text-[#707070]"}`}>{location?.country ? location?.country?.name : "País"}</span>
                    <span class={`w-full h-[0.12rem] rounded-full ${tab == "countries" ? "bg-black" : "bg-transparent"}`}></span>
                </button>
                {#if location?.country}
                    <button type="button" class="flex flex-col gap-[0.35rem]" onclick={() => { changeView("regions") }}>
                        <span class={`text-[0.9rem] font-semibold ${tab == "regions" ? "text-black" : "text-[#707070]"}`}>{location?.region ? location?.region?.name : "Estado/UF"}</span>
                        <span class={`w-full h-[0.12rem] rounded-full ${tab == "regions" ? "bg-black" : "bg-transparent"}`}></span>
                    </button>
                {/if}
                {#if location?.region}
                    <button type="button" class="flex flex-col gap-[0.35rem]" onclick={() => { changeView("cities") }}>
                        <span class={`text-[0.9rem] font-semibold ${tab == "cities" ? "text-black" : "text-[#707070]"}`}>{location?.city ? location?.city?.name : "Cidade"}</span>
                        <span class={`w-full h-[0.12rem] rounded-full ${tab == "cities" ? "bg-black" : "bg-transparent"}`}></span>
                    </button>
                {/if}
            </div>
            <div class="mt-[1rem]">
                <SearchPostalField onChangeCity={changeCity} onChangeRegion={changeRegion} onChangeCountry={changeCountry}/>
            </div>
        </div>
        <div bind:this={container} onscroll={onScrollX} class="flex overflow-x-auto h-full snap-x snap-mandatory scroll-smooth no-scrollbar">
            <div class="flex snap-start flex-none w-screen h-full relative">
                <CountriesView {view} {location} onChangeView={changeView} onChangeCountry={changeCountry}/>
            </div>
            {#if location?.country}
                <div class="flex snap-start flex-none w-screen h-full relative">
                    <RegionsView {view} {location} onChangeView={changeView} onChangeRegion={changeRegion}/>
                </div>
            {/if}
            {#if location?.region}
                <div class="flex snap-start flex-none w-screen h-full relative">
                    <CitiesView {view} {location} onChangeView={changeView} onChangeCity={changeCity}/>
                </div>
            {/if}
        </div>
    </div>
</div>