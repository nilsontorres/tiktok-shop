
<script>
    let {
        value=$bindable(""),
        onChangeCity=()=>{},
        onChangeRegion=()=>{},
        onChangeCountry=()=>{}
    } = $props();

    let results = $state([]);

    const onInput = (e) => {
        value = e.target.value.replace(/\D/g, '');
    }
    const onClear = () => {
        value = "";
    }
    const getPostalCodes = async () => {
        try {
            const request = await fetch("/api/postals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: value
                })
            });

            if(request.status === 200){
                const response = await request.json();
                if(response.success){
                    results = response.results;
                }
            }
        }
        catch(e){
            if(e.name !== "AbortError"){
                throw e;
            }
        }
    }
    const selectResult = (result) => {
        value = "";
        results = [];

        onChangeCity(result.city);
        onChangeRegion(result.region);
        onChangeCountry(result.country);
    }

    $effect(async () => {
        if(value.length == 8){
            await getPostalCodes();
        }
        else{
            results = [];
        }
    });
</script>

<div class="w-full relative">
    <div class="flex items-center w-full h-[2.35rem] bg-[#F1F1F2] rounded-[0.15rem] ps-[0.5rem]">
        <svg class="min-w-[1.1rem] max-w-[1.1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 53 53">
            <path fill="#000" d="M23 0c12.703 0 23 10.297 23 23 0 5.497-1.283 10.043-4.5 14L53 49.5 49.5 53 37.658 40.725A22.906 22.906 0 0 1 23 46C10.297 46 0 35.703 0 23S10.297 0 23 0Zm0 5C13.059 5 5 13.059 5 23s8.059 18 18 18 18-8.059 18-18S32.941 5 23 5Z"/>
        </svg>
        <input class="flex items-center w-full h-full px-[0.4rem] outline-none text-[0.94rem] placeholder:text-[#b3b3b5] placeholder:text-[0.9rem] caret-[#FE2C55]" maxlength="8" spellcheck="false" autocomplete="false" oninput={onInput} bind:value={value} placeholder="Insira o CEP para selecionar sua cidade">
        {#if value != ""}
            <button class="p-[0.6rem]" type="button" aria-label="Limpar" onclick={onClear}>
                <svg class="min-w-[1rem] max-w-[1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                    <path fill="#C0C0C1" d="M22 0c12.15 0 22 9.85 22 22s-9.85 22-22 22S0 34.15 0 22 9.85 0 22 0Zm8.556 13.586a2 2 0 0 0-2.829 0l-5.656 5.657-5.657-5.655a2 2 0 0 0-2.828 2.828l5.657 5.656-5.655 5.659a2 2 0 1 0 2.828 2.827l5.656-5.658 5.659 5.657a2 2 0 0 0 2.828-2.83L24.9 22.072l5.657-5.657a2 2 0 0 0-.001-2.828Z"/>
                </svg>                      
            </button>
        {/if}
    </div>
    <div class={`absolute top-[2.8rem] left-0 w-full max-h-[10rem] overflow-y-auto overscroll-y-contain transparent-scroll rounded-[0.25rem] bg-white shadow-custom z-30 p-[0.4rem] ${results.length == 0 && "opacity-0 pointer-events-none"}`}>
        {#each results as result, index}
            {#if index > 0}
                <span class="flex w-full h-[0.063rem] bg-[#00000009]"></span>
            {/if}
            <button type="button" class="flex w-full items-center gap-[0.25rem] text-[0.85rem] p-[0.4rem]" onclick={() => selectResult(result) }>
                <span class="text-black">{result.code}</span>
                <span class="text-[#666]">{result.city.name} {result.region.code}</span>
            </button>
        {/each}
    </div>
</div>