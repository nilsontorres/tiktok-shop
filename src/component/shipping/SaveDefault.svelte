<script>
    let { enabled=$bindable(false) } = $props();

    const toggleSwitch = () => {
        enabled = !enabled;
    }
</script>

<button type="button" aria-label="Definir como padrão" class={`flex w-[2.8rem] p-[0.2rem] rounded-full transition-colors duration-200 ${enabled ? "bg-[#0BE09B]" : "bg-[#E0E0E0]"}`} onclick={toggleSwitch}>
    <div class={`size-[1.3rem] rounded-full bg-white shadow-xl duration-200 ease-in-out transition-transform will-change-transform ${enabled ? "translate-x-[1.1rem]" : "translate-0"}`}></div>
</button>