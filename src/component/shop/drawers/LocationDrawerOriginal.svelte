<script>
    import { onMount } from "svelte";

    import CitiesView from "$component/shop/shipping/CitiesView.svelte";
    import CountriesView from "$component/shop/shipping/CountriesView.svelte";
    import RegionsView from "$component/shop/shipping/RegionsView.svelte";
    import SearchPostalField from "$component/shop/shipping/SearchPostalField.svelte";
    import BlackSpace from "../shipping/BlackSpace.svelte";

    let {
        open=false,
        shipping={},
        onCloseDrawer=()=>{},
        onChangeCity=()=>{},
        onChangeRegion=()=>{},
        onChangeCountry=()=>{}
    } = $props();

    let view = $state("regions");

    let location = $state(shipping.location);
    let initial = $state.snapshot(location);

    let start_x = 0;
    let start_y = 0;
    let start_time = 0;

    let current_x = 0;
    let current_y = 0;
    let offset_x = 0;
    let offset_y = 0;

    let container;
    let dragging = $state(false);
    let direction_locked = $state(null);

    let slider_length = $state(2);
    let current_index = $state(1);

    const handleTouchStart = (e) => {
        start_x = e.touches[0].clientX;
        start_y = e.touches[0].clientY;
        start_time = Date.now();

        dragging = true;
        direction_locked = null;    
    };
    const handleTouchMove = (e) => {
        if (!dragging) return;

        current_x = e.touches[0].clientX;
        current_y = e.touches[0].clientY;

        offset_x = current_x - start_x;
        offset_y = current_y - start_y;

        // Detecta direção dominante o quanto antes
        if (!direction_locked) {
            const dx = Math.abs(offset_x);
            const dy = Math.abs(offset_y);
            if (dx > 5 || dy > 5) {
                direction_locked = dx > dy ? "horizontal" : "vertical";
            }
        }

        // Assim que detectar horizontal, trava o scroll vertical
        if (direction_locked === "horizontal") {
            offset_y = 0;
        } else if (direction_locked === "vertical") {
            offset_x = 0;
            return; // sai cedo, não move horizontalmente
        }

        // Bloqueia scroll vertical se for swipe horizontal
        if (direction_locked === 'horizontal') {
            if ((current_index === 0 && offset_x > 0) || (current_index === (slider_length-1) && offset_x < 0)) {
                offset_x = 0;
            }

            const x = Math.round(-current_index * window.innerWidth + offset_x);
            container.style.transition = "none";
            container.style.transform = `translate3d(${x}px, 0, 0)`;
        }
    };
    const handleTouchEnd = () => {
        if (!dragging) return;
        dragging = false;

        if (direction_locked !== 'horizontal') {
            // se foi scroll vertical, não faz nada
            return;
        }

        const elapsed = Date.now() - start_time;
        const threshold_distance = window.innerWidth * 0.2;
        const threshold_speed = 0.4;

        const velocity = Math.abs(offset_x / elapsed);

        if ((offset_x > threshold_distance || (velocity > threshold_speed && offset_x > 0)) && current_index > 0) {
            current_index--;
        } else if ((offset_x < -threshold_distance || (velocity > threshold_speed && offset_x < 0)) && current_index < (slider_length - 1)) {
            current_index++;
        }

        if(current_index == 0){
            view = "countries";
        }
        else if(current_index == 1){
            view = "regions";
        }
        else{
            view = "cities";
        }

        const x = Math.round(-current_index * window.innerWidth);
        container.style.transition = "transform 0.3s ease";
        container.style.transform = `translate3d(${x}px, 0, 0)`;

        offset_x = 0;
        offset_y = 0;
        direction_locked = null;
    };
    const changeView = (value, animate=true) => {
        view = value;

        if(value == "countries"){
            current_index = 0;
        }
        else if(value == "regions"){
            current_index = 1;
        }
        else {
            current_index = 2;
        }

        const x = Math.round(-current_index * window.innerWidth);

        if(animate){
            container.style.transition = "transform 0.3s ease";
        }
        else{
            container.style.transition = "";
        }

        container.style.transform = `translate3d(${x}px, 0, 0)`;
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

    onMount(() => {
        changeView(view, false);
    });

    $effect(() => {
        if(open == false){
            location = initial;
            changeView("regions", false);
        }
    });
</script>

<div class={`w-full h-full fixed top-0 left-0 z-60 touch-none unselectable ${!open && "pointer-events-none"}`}>
    <button onclick={onCloseDrawer} type="button" aria-label="background" class={`absolute top-0 left-0 w-full h-full bg-black ${open ? "opacity-60" : "opacity-0"} z-10 transition-opacity duration-300`}></button>
    <div class={`absolute bottom-0 left-0 flex flex-col w-full ${open ? "translate-y-0" : "translate-y-[100%]"} h-[75%] transition-transform duration-300 ease-in-out z-20 rounded-t-xl overflow-hidden bg-white unselectable`}>
        <button type="button" aria-label="Fechar" class="absolute top-3 right-3 p-2 z-50" onclick={onCloseDrawer}>
            <svg class="min-w-[0.85rem] max-w-[0.85rem] h-[0.9rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 38">
                <path fill="#000" d="m0 4 4-4 15 15L34 0l4 4-15 15 15 15-4 4-15-15L4 38 .5 34 15 19 0 4Z"/>
            </svg>
        </button>
        <div class="flex justify-center items-center w-full gap-[0.75rem] px-4 pt-[1.2rem] pb-[0.3rem]">
            <span class="text-black text-[1rem] font-bold leading-none">Selecionar {view == "regions" ? "Estado/UF" : view == "cities" ? "Cidade" : "País"}</span>
        </div>
        <div class="flex absolute bottom-0 left-0 w-full h-[1rem]"></div>
        <div class="flex flex-col w-full px-4 py-5 relative">
            <div class="flex items-center gap-[0.75rem]">
                <button type="button" class="flex flex-col gap-[0.35rem]" onclick={() => { changeView("countries") }}>
                    <span class={`text-[0.9rem] font-semibold ${view == "countries" ? "text-black" : "text-[#707070]"}`}>{location?.country ? location?.country?.name : "País"}</span>
                    <span class={`w-full h-[0.12rem] rounded-full ${view == "countries" ? "bg-black" : "bg-transparent"}`}></span>
                </button>
                {#if location?.country}
                    <button type="button" class="flex flex-col gap-[0.35rem]" onclick={() => { changeView("regions") }}>
                        <span class={`text-[0.9rem] font-semibold ${view == "regions" ? "text-black" : "text-[#707070]"}`}>{location?.region ? location?.region?.name : "Estado/UF"}</span>
                        <span class={`w-full h-[0.12rem] rounded-full ${view == "regions" ? "bg-black" : "bg-transparent"}`}></span>
                    </button>
                {/if}
                {#if location?.region}
                    <button type="button" class="flex flex-col gap-[0.35rem]" onclick={() => { changeView("cities") }}>
                        <span class={`text-[0.9rem] font-semibold ${view == "cities" ? "text-black" : "text-[#707070]"}`}>{location?.city ? location?.city?.name : "Cidade"}</span>
                        <span class={`w-full h-[0.12rem] rounded-full ${view == "cities" ? "bg-black" : "bg-transparent"}`}></span>
                    </button>
                {/if}
            </div>
            <div class="mt-[1rem]">
                <SearchPostalField/>
            </div>
        </div>
        <div class="w-full overflow-hidden bg-amber-600">
            <div bind:this={container} class="flex touch-none w-screen h-full relative">
                <CountriesView {view} {location} {dragging} onChangeView={changeView} onChangeCountry={changeCountry}/>
                {#if location?.country}
                    <RegionsView {view} {location} {dragging} onChangeView={changeView} onChangeRegion={changeRegion}/>
                {/if}
                {#if location?.region}
                    <CitiesView {view} {location} {dragging} onChangeView={changeView} onChangeCity={changeCity}/>
                {/if}
            </div>
        </div>
    </div>
</div>