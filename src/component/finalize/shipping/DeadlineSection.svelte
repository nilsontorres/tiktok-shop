<script>
    import { formatPrice } from "$lib/formating";

    let { shipping={} } = $props();
</script>

<div class="flex flex-col w-full px-[1rem] py-[1.1rem] bg-[#F0FBFB]">
    <div class="flex w-full justify-between items-center text-[0.8rem]">
        <b class="text-black font-semibold leading-none">Receba até {shipping?.deadline?.from}<span class="px-[0.08rem]">-</span>{shipping?.deadline?.to} de {shipping?.deadline?.month}</b>
        <b class="text-black font-semibold leading-none">R$ {formatPrice(shipping?.price?.promotional, true)} <span class="line-through font-medium text-[#7D8383]">R$ {formatPrice(shipping?.price?.regular, true)}</span></b>
    </div>
    <span class="text-black text-[0.8rem] leading-none mt-[0.75rem]">Envio padrão</span>
</div>