<script>
    import { formatPrice } from "$lib/formating";

    let {
        coupon={},
        variant="compact",
        onClaimPromotion=()=>{}
    } = $props();

    const getPromotionTitle = (coupon) => {
        if(coupon.target == "shipping"){
            return "Cupom de envio";
        }
        else{
            if(coupon.type == "variable"){
                return `${Math.floor(coupon.discount * 100)}% OFF`;
            }
            else{
                return `Desconto de R$ ${formatPrice(coupon.discount)}`;
            }
        }
    }

    const getPromotionDescription = (coupon, variant) => {
        if(coupon.target == "shipping"){
            if(coupon.minimum){
                return `Desconto de ${coupon.type == "variable" ? `${Math.floor(coupon.discount * 100)}%` : `R$ ${formatPrice(coupon.discount)}`} no frete em pedidos acima de R$ ${formatPrice(coupon.minimum)}`;
            }
            else{
                return `Desconto de ${coupon.type == "variable" ? `${Math.floor(coupon.discount * 100)}%` : `R$ ${formatPrice(coupon.discount)}`} no frete`;
            }
        }
        else{
            if(coupon.minimum && coupon.limit){
                if(variant == "compact"){
                    return `nos pedidos acima de R$ ${formatPrice(coupon.minimum)}`;
                }
                else{
                    return `nos pedidos acima de R$ ${formatPrice(coupon.minimum)}, máximo de R$ ${formatPrice(coupon.limit)}`;
                }
            }
            else if(coupon.minimum){
                return `nos pedidos acima de R$ ${formatPrice(coupon.minimum)}`;
            }
            else{
                return "Sem gasto mínimo";
            }
        }
    }

    const claimPromotion = (e) => {
        e.stopPropagation();
        e.preventDefault();

        onClaimPromotion();
    }
</script>

{#if variant == "compact"}
    <li class={`flex justify-between items-center w-[18rem] h-[3.75rem] gap-[0.7rem] border-[0.063rem] rounded-lg px-[0.75rem] relative ${coupon.target == 'shipping' ? 'bg-[#F0FBFB] border-[#C6F0F0]' : 'bg-[#FFF9FA] border-[#fce1e6]'}`}>
        <svg class="min-w-[0.34rem] max-w-[0.34rem] absolute -left-[0.084rem] top-[1.5rem] z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 21">
            <path fill="#fff" d="M2.455.5C7.727.5 12 4.977 12 10.5s-4.273 10-9.545 10A9.148 9.148 0 0 1 0 20.164V.835A9.15 9.15 0 0 1 2.455.5Z"/>
            <path fill={coupon.target == 'shipping' ? '#BAE8E8' : '#FFD2DA'} d="M2 0c3.512 0 6.224 1.293 8.05 3.295 1.813 1.986 2.7 4.61 2.7 7.205 0 2.595-.887 5.22-2.7 7.205C8.225 19.707 5.513 21 2 21v-2c2.988 0 5.15-1.082 6.574-2.643 1.438-1.576 2.176-3.702 2.176-5.857 0-2.155-.738-4.28-2.176-5.857C7.151 3.083 4.988 2 2 2V0Z"/>
        </svg>
        <div class="flex w-full flex-col justify-center">
            <span class="w-full text-start text-black text-[0.84rem] font-semibold whitespace-nowrap leading-[1.2rem]">{getPromotionTitle(coupon, variant)}</span>
            <span class="w-full text-start text-[#706D6E] text-[0.675rem] leading-[0.9rem]">{getPromotionDescription(coupon, variant)}</span>
        </div>
        {#if coupon.claimed}
            <button type="button" class={`text-[0.7rem] font-bold w-[5.4rem] h-[1.5rem] border-[0.063rem] active:opacity-80 rounded-sm leading-none ${coupon.target == 'shipping' ? 'text-[#13C2C2] border-[#13C2C2]' : 'text-[#FE2C55] border-[#FE2C55]'}`}>Usar</button>
        {:else}
            <button type="button" class={`text-white text-[0.7rem] font-bold w-[5.4rem] h-[1.5rem] active:opacity-80 rounded-sm leading-none ${coupon.target == 'shipping' ? 'bg-[#13C2C2]' : 'bg-[#FE2C55]'}`} onclick={claimPromotion}>Resgatar</button>
        {/if}
        <svg class="min-w-[0.34rem] max-w-[0.34rem] absolute -right-[0.084rem] top-[1.5rem] z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 21">
            <path fill="#fff" d="M10.295 20.5C5.023 20.5.75 16.023.75 10.5S5.023.5 10.295.5c.849 0 1.671.118 2.455.336v19.329a9.147 9.147 0 0 1-2.455.335Z"/>
            <path fill={coupon.target == 'shipping' ? '#BAE8E8' : '#FFD2DA'} d="M10.75 21c-3.512 0-6.224-1.293-8.05-3.295C.886 15.72 0 13.095 0 10.5c0-2.595.887-5.22 2.7-7.205C4.525 1.293 7.237 0 10.75 0v2C7.762 2 5.6 3.082 4.176 4.643 2.738 6.219 2 8.345 2 10.5c0 2.155.738 4.28 2.176 5.857C5.599 17.917 7.762 19 10.75 19v2Z"/>
        </svg>
    </li>
{:else}
    <li class={`flex flex-col w-full p-[0.75rem] border-[0.063rem] rounded-lg relative ${coupon.target == 'shipping' ? 'bg-[#F0FBFB] border-[#C6F0F0]' : 'bg-[#FFF9FA] border-[#fce1e6]'}`}>
        <svg class="min-w-[0.34rem] max-w-[0.34rem] absolute -left-[0.084rem] bottom-[1.91rem] z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 21">
            <path fill="#fff" d="M2.455.5C7.727.5 12 4.977 12 10.5s-4.273 10-9.545 10A9.148 9.148 0 0 1 0 20.164V.835A9.15 9.15 0 0 1 2.455.5Z"/>
            <path fill={coupon.target == 'shipping' ? '#BAE8E8' : '#FFD2DA'} d="M2 0c3.512 0 6.224 1.293 8.05 3.295 1.813 1.986 2.7 4.61 2.7 7.205 0 2.595-.887 5.22-2.7 7.205C8.225 19.707 5.513 21 2 21v-2c2.988 0 5.15-1.082 6.574-2.643 1.438-1.576 2.176-3.702 2.176-5.857 0-2.155-.738-4.28-2.176-5.857C7.151 3.083 4.988 2 2 2V0Z"/>
        </svg>
        <div class="flex items-center gap-[0.3rem]">
            <span class={`text-[0.62rem] font-medium leading-none px-[0.2rem] pt-[0.15rem] pb-[0.12rem] rounded-[0.2rem] ${coupon.target == "shipping" ? "bg-[#DEF6F6] text-[#007B7B]" : "bg-[#FFE6EB] text-[#E10543]"}`}>Do {coupon.origin}</span>
        </div>
        <div class="flex flex-col">
            <div class={`flex justify-between items-start gap-[1rem] border-b-[0.063rem] pb-[0.82rem] mt-[0.5rem] border-dashed ${coupon.target == 'shipping' ? "border-[#b1ebeb]" : "border-[#fce1e6]"}`}>
                <div class="flex w-full flex-col">
                    <span class="text-black text-[1.1rem] font-bold leading-none mt-[0.25rem]">{getPromotionTitle(coupon, variant)}</span>
                    <span class="text-black text-[0.85rem] leading-[1.15rem] mt-[0.5rem]">{getPromotionDescription(coupon, variant)}</span>
                    <span class="text-[#666] text-[0.7rem] leading-none mt-[0.75rem]">Válido por 1 dia após a reinvidicação</span>
                </div>
                <div class="flex">
                    {#if coupon.claimed}
                        <button type="button" class={`text-[0.7rem] font-bold w-[4rem] h-[1.6rem] border-[0.063rem] active:opacity-80 rounded-sm leading-none ${coupon.target == 'shipping' ? 'text-[#13C2C2] border-[#13C2C2]' : 'text-[#FE2C55] border-[#FE2C55]'}`}>Usar</button>
                    {:else}
                        <button type="button" class={`text-white text-[0.7rem] font-bold w-[4rem] h-[1.6rem] active:opacity-80 rounded-sm leading-none ${coupon.target == 'shipping' ? 'bg-[#13C2C2]' : 'bg-[#FE2C55]'}`} onclick={claimPromotion}>Resgatar</button>
                    {/if}
                </div>
            </div>
            <span class="text-[#666] text-[0.7rem] mt-[0.7rem] leading-none">em produtos elegíveis <b class="text-[#2B5DB9]">Termos aplicáveis</b></span>
        </div>
        <svg class="min-w-[0.34rem] max-w-[0.34rem] absolute -right-[0.084rem] bottom-[1.91rem] z-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 21">
            <path fill="#fff" d="M10.295 20.5C5.023 20.5.75 16.023.75 10.5S5.023.5 10.295.5c.849 0 1.671.118 2.455.336v19.329a9.147 9.147 0 0 1-2.455.335Z"/>
            <path fill={coupon.target == 'shipping' ? '#BAE8E8' : '#FFD2DA'} d="M10.75 21c-3.512 0-6.224-1.293-8.05-3.295C.886 15.72 0 13.095 0 10.5c0-2.595.887-5.22 2.7-7.205C4.525 1.293 7.237 0 10.75 0v2C7.762 2 5.6 3.082 4.176 4.643 2.738 6.219 2 8.345 2 10.5c0 2.155.738 4.28 2.176 5.857C5.599 17.917 7.762 19 10.75 19v2Z"/>
        </svg>
    </li>
{/if}