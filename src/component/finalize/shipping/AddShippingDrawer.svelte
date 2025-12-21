<script>
    import FullnameField from "$component/finalize/shipping/fields/FullnameField.svelte";
    import PhoneField from "$component/finalize/shipping/fields/PhoneField.svelte";
    import AddressField from "$component/finalize/shipping/fields/AddressField.svelte";
    import SaveShippingDefault from "$component/finalize/shipping/SaveShippingDefault.svelte";
    import DistrictField from "$component/finalize/shipping/fields/DistrictField.svelte";
    import EmailField from "$component/finalize/shipping/fields/EmailField.svelte";
    import NumberField from "$component/finalize/shipping/fields/NumberField.svelte";
    import UnitField from "$component/finalize/shipping/fields/UnitField.svelte";
    import ZipCodeField from "$component/finalize/shipping/fields/ZipCodeField.svelte";
    import RegionField from "$component/finalize/shipping/fields/RegionField.svelte";
    import CityField from "$component/finalize/shipping/fields/CityField.svelte";
    import LocationDrawer from "$component/location/LocationDrawer.svelte";
    import AddShippingPopup from "$component/finalize/shipping/AddShippingPopup.svelte";

    let { shipping={}, onChangeShipping=()=>{} } = $props();

    let open = $state(false);
    let container = $state(null);
    let drawer = $state(null);
    let popup = $state(null);

    const updateLocation = (location) => {
        onChangeShipping({...shipping, location});
    }

    export const openDrawer = () => {
        container.scrollTo({ top: 0, behavior: "instant" });
        document.body.classList.add("no-scrollbar");
        open = true;
    }
    export const closeDrawer = () => {
        open = false;
        document.body.classList.remove("no-scrollbar");
    }

    export { open };
</script>

<LocationDrawer bind:this={drawer} location={shipping?.location} onChangeLocation={updateLocation}/>
<AddShippingPopup bind:this={popup} {shipping} openShippingDrawer={() => drawer.openDrawer()}/>

<div class="flex flex-col w-screen">
    <div class="flex w-full h-12 justify-between items-center fixed top-0 left-0  z-20 bg-[#F5F5F5]">
        <button class="flex justify-center items-center w-[3.5rem] h-[2rem]" type="button" aria-label="Voltar" onclick={closeDrawer}>
            <svg class="h-[1.1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 53">
                <path fill="#181818" d="M0 25.5 26.5 0 31 4.5l-21.5 21 21.5 22-4.5 5L0 25.5Z"/>
            </svg>
        </button>
        <div class="flex flex-col w-full items-center justify-center gap-[0.4rem]">
            <span class="text-black text-[1.05rem] font-bold leading-none">Adicionar novo endereço</span>
        </div>
        <div class="flex w-[3.5rem] items-center"></div>
    </div>
    <div bind:this={container} class="flex flex-col w-full h-[100vh] overflow-y-auto px-[0.5rem] pt-[3rem] pb-[13.8rem] relative  z-10">
        <span class="text-[#6B6B6B] text-[0.8rem] font-semibold leading-none ps-[0.85rem] mt-[1rem]">Informações de contato</span>
        <div class="flex flex-col bg-white w-full rounded-[0.25rem] mt-[0.6rem] pb-[1.1rem]">
            <FullnameField/>
            <PhoneField/>
            <EmailField/>
        </div>
        <span class="text-[#6B6B6B] text-[0.8rem] font-semibold leading-none ps-[0.85rem] mt-[1.75rem]">Informações de endereço</span>
        <div class="flex flex-col bg-white w-full rounded-[0.25rem] mt-[0.6rem] pb-[1.1rem]">
            <ZipCodeField/>
            <div class="flex items-center gap-[2rem] px-[1rem]">
                <RegionField location={shipping?.location} onOpenDrawer={drawer?.openDrawer}/>
                <CityField location={shipping?.location} onOpenDrawer={drawer?.openDrawer}/>
            </div>
            <DistrictField/>
            <AddressField/>
            <NumberField/>
            <UnitField/>
        </div>
        <span class="text-[#6B6B6B] text-[0.8rem] font-semibold leading-none ps-[0.85rem] mt-[1.75rem]">Configurações</span>
        <div class="flex flex-col bg-white w-full rounded-[0.25rem] mt-[0.6rem]">
            <div class="flex w-full h-[3.5rem] justify-between items-center px-[1rem]">
                <span class="text-black text-[0.9rem]">Definir como padrão</span>
                <SaveShippingDefault enabled={true}/>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-[0.8rem] p-[1rem] pt-[0.8rem] w-full border-t-[0.054rem] bg-[#F5F5F5] border-[#C8C9CB] fixed bottom-0 left-0 z-20">
        <span class="text-[#444444] text-[0.76rem] text-center leading-[1.1rem]">Leia a <b class="text-black font-semibold">Política de privacidade do Tiktok</b> para saber mais sobre como usamos suas informações pessoais.</span>
        <button type="button" title="Salvar endereço" class="flex justify-center w-full h-[2.75rem] items-center rounded-lg disabled:opacity-50 bg-[#FE2C55] hover:bg-[#E81D44] active:bg-[#E81D44] overflow-hidden" disabled={true}>
            <span class="text-white text-[1rem] font-semibold leading-none">Salvar</span>
        </button>
    </div>
</div>