<script>
    let { value = $bindable(""), error, onChangeValue=()=>{} } = $props();
    let focus = $state(false);

    const handleInput = (e) => {
        error = null;
        value = e.target.value;
    };

    const handleFocus = () => {
        focus = true;
    };

    const handleBlur = () => {
        focus = false;
        value = value.trim();
        validate();
        onChangeValue(value);
    };

    const clearInput = () => {
        value = "";
        error = null;
    };

    export const validate = () => {
        if (value.length < 11) {
            error = "Insira um número válido com DDD";
            return false;
        }
        return true;
    };
    export { value };
</script>

<div class="flex flex-col w-full">
    <div class="flex gap-[1rem] px-[1rem] relative">
        <div class="flex justify-center items-center h-[3rem] text-[#858585] text-[0.9rem] whitespace-nowrap">BR +55</div>
        <input class="w-full h-[3rem] text-[0.84rem] text-black outline-none placeholder:text-[#A8A8A8] caret-[#FE2C55]" placeholder="Número de telefone" bind:value={value} oninput={handleInput} onfocus={handleFocus} onblur={handleBlur} type="text" inputmode="numeric" autocomplete="off" spellcheck="false" maxlength="11" name="phone"/>
        {#if value !== "" && focus}
            <button class="flex items-center justify-center w-[3rem] h-[3rem] absolute top-0 right-0" type="button" aria-label="Limpar" onclick={clearInput}>
                <svg class="min-w-[1rem] max-w-[1rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44">
                    <path fill="#CCCCCC" d="M22 0c12.15 0 22 9.85 22 22s-9.85 22-22 22S0 34.15 0 22 9.85 0 22 0Zm8.556 13.586a2 2 0 0 0-2.829 0l-5.656 5.657-5.657-5.655a2 2 0 0 0-2.828 2.828l5.657 5.656-5.655 5.659a2 2 0 1 0 2.828 2.827l5.656-5.658 5.659 5.657a2 2 0 0 0 2.828-2.83L24.9 22.072l5.657-5.657a2 2 0 0 0-.001-2.828Z"/>
                </svg>
            </button>
        {/if}
    </div>
    <div class="flex w-full px-[1rem]">
        <span class="w-full h-[0.054rem] {error ? 'bg-[#FF4C3A]' : 'bg-[#f1f1f1]'}"></span>
    </div>
    {#if error}
        <div class="flex px-[1rem] pt-[0.5rem] gap-[0.35rem] items-center">
            <svg class="w-[0.88rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 33">
                <path fill="#FF4C3A" d="M12.5 2.25c1.503-3 6.503-3 8 0 1.497 3 10.5 19.5 12 22s-1.5 8-4.5 8H5c-4 0-6.003-5-4.5-8 1.503-3 10.496-19 12-22Zm4 20.75a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM15.496 9.25a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-2Z"/>
            </svg>
            <span class="text-[0.82rem] text-[#FF4C3A]">{error}</span>
        </div>
    {/if}
</div>