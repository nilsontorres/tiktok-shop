<script>
    import FullnameField from "$component/shipping/fields/FullnameField.svelte";
    import PhoneField from "$component/shipping/fields/PhoneField.svelte";
    import StreetField from "$component/shipping/fields/StreetField.svelte";
    import SaveDefault from "$component/shipping/SaveDefault.svelte";
    import DistrictField from "$component/shipping/fields/DistrictField.svelte";
    import EmailField from "$component/shipping/fields/EmailField.svelte";
    import NumberField from "$component/shipping/fields/NumberField.svelte";
    import UnitField from "$component/shipping/fields/UnitField.svelte";
    import PostalField from "$component/shipping/fields/PostalField.svelte";
    import RegionField from "$component/shipping/fields/RegionField.svelte";
    import CityField from "$component/shipping/fields/CityField.svelte";
    import LocationDrawer from "$component/location/LocationDrawer.svelte";
    import { validateDistrict, validateEmail, validateFullname, validatePhone, validatePostal, validateStreet } from "$lib/validation";

    let { shipping={}, updatePage=()=>{}, updateShipping=()=>{} } = $props();

    let drawer = $state(null);
    let loading = $state(false);
    let location = $state({});

    let fullname = $state("");
    let phone = $state("");
    let email = $state("");
    let postal = $state("");
    let district = $state("");
    let street = $state("");
    let number = $state("");
    let unit = $state("");

    let valid = $derived(
        validateFullname(fullname) &&
        validatePhone(phone) &&
        validateEmail(email) &&
        validatePostal(postal) &&
        location?.region &&
        location?.city &&
        validateDistrict(district) &&
        validateStreet(street)
    );
    
    const updateLocation = (value) => {
        location = value;
    }
    const saveShipping = () => {
        if(!valid) return;

        window.document.body.classList.add("no-scroll");
        loading = true;

        setTimeout(() => {
            loading = false;
            window.document.body.classList.remove("no-scroll");
            updateShipping({
                ...shipping,
                fullname: fullname.value,
                phone: phone.value,
                email: email.value,
                location: {
                    ...location,
                    postal: postal.value,
                    district: district.value,
                    street: street.value,
                    number: number.value,
                    unit: unit.value
                },
                filled: true
            });
            updatePage("finalization");
        }, 2000);
    }
</script>

<LocationDrawer bind:this={drawer} {location} {updateLocation}/>

<!--
<div class={`sticky top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none z-50 duration-300 transition-opacity ${loading ? "opacity-100" : "opacity-0"}`}>
    <div class="flex flex-col justify-center items-center w-[7.6rem] pt-[2rem] pb-[0.9rem] rounded-[0.25rem] bg-[#000000b5]">
        <div class="relative w-[1rem] h-[1rem] me-[0.5rem] z-20">
            <span class="absolute w-3 h-3 rounded-full bg-cyan-300 mix-blend-darken animate-revolve"></span>
            <span class="absolute w-3 h-3 rounded-full bg-red-500 mix-blend-darken animate-revolve [animation-delay:-0.4s]"></span>
        </div>
        <span class="w-full text-white text-center text-[0.78rem] font-semibold mt-[1.15rem]">Carregando...</span>
    </div>
</div>
-->
<div class="flex flex-col w-full overflow-hidden bg-[#F5F5F5] pt-[3rem] pb-[9.2rem]">
    <div class="flex max-w-dvw h-12 justify-between items-center z-20 bg-[#F5F5F5] fixed top-0">
        <button class="flex justify-center items-center w-[3.5rem] h-[2rem]" type="button" aria-label="Voltar" onclick={() => updatePage("finalization")}>
            <svg class="h-[1.1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
                <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
            </svg>
        </button>
        <div class="flex flex-col w-full items-center justify-center gap-[0.4rem]">
            <span class="text-black text-[1.05rem] font-bold leading-none">Adicionar novo endereço</span>
        </div>
        <div class="flex w-[3.5rem] items-center"></div>
    </div>
    <div class="flex flex-col w-full px-[0.5rem] pt-[1rem] pb-[1.5rem] overflow-y-scroll transparent-scroll relative z-10">
        <span class="text-[#6B6B6B] text-[0.8rem] font-semibold leading-none ps-[0.85rem]">Informações de contato</span>
        <div class="flex flex-col bg-white w-full rounded-[0.25rem] mt-[0.6rem] pb-[1.1rem]">
            <FullnameField bind:value={fullname}/>
            <PhoneField bind:value={phone}/>
            <EmailField bind:value={email}/>
        </div>
        <span class="text-[#6B6B6B] text-[0.8rem] font-semibold leading-none ps-[0.85rem] mt-[1.75rem]">Informações de endereço</span>
        <div class="flex flex-col bg-white w-full rounded-[0.25rem] mt-[0.6rem] pb-[1.1rem]">
            <PostalField bind:value={postal}/>
            <div class="flex items-center gap-[2rem] px-[1rem]">
                <RegionField {location} selectLocation={drawer?.openDrawer}/>
                <CityField {location} selectLocation={drawer?.openDrawer}/>
            </div>
            <DistrictField bind:value={district}/>
            <StreetField bind:value={street}/>
            <NumberField bind:value={number}/>
            <UnitField bind:value={unit}/>
        </div>
        <span class="text-[#6B6B6B] text-[0.8rem] font-semibold leading-none ps-[0.85rem] mt-[1.75rem]">Configurações</span>
        <div class="flex flex-col bg-white w-full rounded-[0.25rem] mt-[0.6rem]">
            <div class="flex w-full h-[3.5rem] justify-between items-center px-[1rem]">
                <span class="text-black text-[0.9rem]">Definir como padrão</span>
                <SaveDefault enabled={true}/>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-[0.9rem] px-[1rem] pt-[0.9rem] pb-[3.15rem] w-full border-t-[0.054rem] bg-[#F5F5F5] border-[#C8C9CB] z-20 fixed bottom-0">
        <span class="text-[#444444] text-[0.76rem] text-center leading-[0.92rem]">Leia a <b class="text-black font-semibold">Política de privacidade do Tiktok</b> para saber mais sobre como usamos suas informações pessoais.</span>
        <button type="button" title="Salvar endereço" class="flex justify-center w-full h-[2.75rem] items-center rounded-lg disabled:opacity-50 bg-[#FE2C55] hover:bg-[#E81D44] active:bg-[#E81D44] overflow-hidden" disabled={!valid} onclick={saveShipping}>
            <span class="text-white text-[1rem] font-semibold leading-none">Salvar</span>
        </button>
    </div>
</div>