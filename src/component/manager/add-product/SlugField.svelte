<script>
    import { copyText } from "$lib/clipboard";

    let { value=$bindable("") } = $props();

    let copied = $state(false);

    const copySlug = async () => {
        await copyText(value);
        copied = true;

        setTimeout(() => {
            copied = false;
        }, 3000);
    }
</script>

<div class="flex items-center justify-between gap-[20px] w-full ps-[20px] pe-[10px] h-[54px] bg-white border-t-[1px] border-t-[#eaeaea]">
    <span class="text-[#666] text-[14px] leading-[16px] pb-[2px]"><b class="font-semibold">Slug do produto:</b> {value}</span>
    <button type="button" class="flex items-center gap-[8px] cursor-pointer hover:bg-[#f7f7f7] rounded-[6px] h-[32px] px-[10px] group" onclick={copySlug}>
        <svg class="h-[14px] shrink-0 fill-[#888] group-hover:fill-[#666]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path d="M0 2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4H2a2 2 0 0 1-2-2V2Zm8 12v4h10V8h-4v4a2 2 0 0 1-2 2H8Zm4-2V2H2v10h10Z"/>
        </svg>
        <span class="text-[#888] group-hover:text-[#666] text-[14px] font-medium leading-none">{copied ? "Copiado" : "Copiar"}</span>
    </button>
</div>