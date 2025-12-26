<script>
    import { onMount } from "svelte";

    import CitiesView from "$component/location/views/CitiesView.svelte";
    import RegionsView from "$component/location/views/RegionsView.svelte";
    import SearchField from "$component/location/fields/SearchField.svelte";

    let {
        location={},
        updateLocation=()=>{},
        searchField=false
    } = $props();

    let container = $state(null);
    let open = $state(false);
    let view = $state("regions");
    let tab = $state("regions");

    let dragging = $state(false);
    let city = $state(location?.city);
    let region = $state(location?.region)

    const updateView = (value, animated=true) => {
        dragging = true;

        tab = value;
        view = value;
        
        const width = window.innerWidth;

        if(value == "regions"){
            setTimeout(() => {
                container.scrollTo({ left: 0, behavior: animated ? "smooth" : "instant" });
            }, 100);
        }
        else{
            setTimeout(() => {
                container.scrollTo({ left: width, behavior: animated ? "smooth" : "instant" });
            }, 100);
        }

        setTimeout(() => {
            dragging = false;
        }, 350);
    };
    const updateRegion = (value) => {
        region = value;
        updateLocation({ ...location, region: value });
    }
    const updateCity = (value) => {
        city = value;
        updateLocation({ ...location, city: value });
        closeDrawer();
    }
    const updateScroll = () => {
        const scroll = container.scrollLeft;
        const width = window.innerWidth;

        if(scroll >= (width / 2)){
            view = "cities";
        }
        else{
            view = "regions";
        }

        if(!dragging){
            tab = view;
        }
    }

    export const openDrawer = (value="regions") => {
        if(value == "regions"){
            updateView("regions", false);
        }
        else if(location?.region){
            updateView("cities", false);
        }
        
        document.body.classList.add("no-scroll");
        open = true;
    }
    export const closeDrawer = () => {
        open = false;
        document.body.classList.remove("no-scroll");
    }
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none no-selectable ${!open && "pointer-events-none"}`}>
    <button onclick={closeDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white no-selectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-3 right-3 p-2 z-50" onclick={closeDrawer}>
            <svg class="min-w-[0.85rem] max-w-[0.85rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[0.75rem] px-4 pt-[1.2rem] pb-[0.3rem]">
            <span class="text-black text-[1rem] font-bold leading-none">Selecionar {tab == "regions" ? "Estado/UF" : "Cidade"}</span>
        </div>
        <div class="flex absolute bottom-0 left-0 w-full h-[1rem]"></div>
        <div class="flex flex-col w-full px-4 py-5 relative">
            <div class="flex items-center gap-[0.75rem]">
                <button type="button" class="flex flex-col gap-[0.35rem]" onclick={() => { updateView("regions") }}>
                    <span class={`text-[0.9rem] font-semibold ${tab == "regions" ? "text-black" : "text-[#707070]"}`}>{location?.region ? location?.region?.name : "Estado/UF"}</span>
                    <span class={`w-full h-[0.12rem] rounded-full ${tab == "regions" ? "bg-black" : "bg-transparent"}`}></span>
                </button>
                {#if location?.region}
                    <button type="button" class="flex flex-col gap-[0.35rem]" onclick={() => { updateView("cities") }}>
                        <span class={`text-[0.9rem] font-semibold ${tab == "cities" ? "text-black" : "text-[#707070]"}`}>{location?.city ? location?.city?.name : "Cidade"}</span>
                        <span class={`w-full h-[0.12rem] rounded-full ${tab == "cities" ? "bg-black" : "bg-transparent"}`}></span>
                    </button>
                {/if}
            </div>
            {#if searchField}
                <div class="mt-[1rem]">
                    <SearchField {updateCity} {updateRegion}/>
                </div>
            {/if}
        </div>
        <div bind:this={container} onscroll={updateScroll} class="flex overflow-x-auto overscroll-y-contain h-full snap-x snap-mandatory scroll-smooth transparent-scroll">
            <div class="flex snap-start snap-always flex-none w-screen h-full relative">
                <RegionsView {view} {location} {updateView} {updateRegion}/>
            </div>
            {#if location?.region}
                <div class="flex snap-start snap-always flex-none w-screen h-full relative">
                    <CitiesView {view} {location} {updateView} {updateCity}/>
                </div>
            {/if}
        </div>
    </div>
</div>