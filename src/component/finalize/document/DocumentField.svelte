<script>
    import { formatCPF } from "$lib/formating";

    let { value=$bindable(), error } = $props();

    const onInput = (event) => {
        error = null;
        value = formatCPF(event.target.value);
    }
</script>

<div class="flex flex-col mt-[0.6rem]">
    <div class={`flex w-full h-[2.5rem] bg-[#F2F2F2] rounded-[0.35rem] border-[0.16rem] ${error ? "border-[#FF4C3A]" : "border-transparent"}`}>
        <input
            class="text-black text-[0.96rem] px-[0.6rem] border-none bg-transparent w-full h-full caret-[#FE2C55] outline-none"
            type="text"
            inputmode="numeric"
            placeholder="Insira o número de CPF"
            bind:value
            oninput={onInput}
        />
    </div>
    {#if error}
        <div class="flex items-center mt-[0.75rem] gap-[0.35rem]">
            <svg class="w-[0.72rem]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 33">
                <path fill="#DA3123" d="M12.5 2.25c1.503-3 6.503-3 8 0 1.497 3 10.5 19.5 12 22s-1.5 8-4.5 8H5c-4 0-6.003-5-4.5-8 1.503-3 10.496-19 12-22Zm4 20.75a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM15.496 9.25a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-2Z"/>
            </svg>
            <span class="text-[#DA3123] text-[0.75rem] font-semibold leading-none">{error}</span>
        </div>
    {/if}
</div>