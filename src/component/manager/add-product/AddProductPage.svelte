<script>
    import { v4 as uuidv4 } from 'uuid';
    import { onMount, untrack } from "svelte";

    import Toggle from "../Toggle.svelte";
    import TitleField from "./TitleField.svelte";
    import CategoryField from "./CategoryField.svelte";
    import MethodsField from "./MethodsField.svelte";
    import DescriptionField from "./DescriptionField.svelte";
    import CouponsField from "./CouponsField.svelte";
    import SlugField from "./SlugField.svelte";
    import DiscountField from "./DiscountField.svelte";
    import VariationField from "./VariationField.svelte";
    import PriceField from './PriceField.svelte';

    let title = $state("");
    let slug = $state("");
    let description = $state("");
    let enabled = $state(true);
    let variations = $state([{ name: "", options: [] }]);
    let prices = $state([]);
    let coupons = $state([]);
    let images = $state([]);

    let categories = $state([
        { name: "electronics", label: "Eletrônicos", is_selected: false },
        { name: "computers", label: "Informática", is_selected: false },
        { name: "phones", label: "Celulares", is_selected: false },
        { name: "audio", label: "Áudio", is_selected: false },
        { name: "tv", label: "TV", is_selected: false },
        { name: "gaming", label: "Games", is_selected: false },
        { name: "home", label: "Casa", is_selected: false },
        { name: "home_appliances", label: "Eletrodomésticos", is_selected: false },
        { name: "furniture", label: "Móveis", is_selected: false },
        { name: "decor", label: "Decoração", is_selected: false },
        { name: "kitchen", label: "Cozinha", is_selected: false },
        { name: "fashion", label: "Moda", is_selected: false },
        { name: "mens_clothing", label: "Roupas Masculinas", is_selected: false },
        { name: "womens_clothing", label: "Roupas Femininas", is_selected: false },
        { name: "shoes", label: "Calçados", is_selected: false },
        { name: "accessories", label: "Acessórios", is_selected: false },
        { name: "beauty", label: "Beleza", is_selected: false },
        { name: "personal_care", label: "Cuidados Pessoais", is_selected: false },
        { name: "health", label: "Saúde", is_selected: false },
        { name: "sports", label: "Esportes", is_selected: false },
        { name: "fitness", label: "Fitness", is_selected: false },
        { name: "outdoor", label: "Ar Livre", is_selected: false },
        { name: "toys", label: "Brinquedos", is_selected: false },
        { name: "baby", label: "Bebês", is_selected: false },
        { name: "books", label: "Livros", is_selected: false },
        { name: "stationery", label: "Papelaria", is_selected: false },
        { name: "office", label: "Escritório", is_selected: false },
        { name: "automotive", label: "Automotivo", is_selected: false },
        { name: "tools", label: "Ferramentas", is_selected: false },
        { name: "pet", label: "Pet Shop", is_selected: false },
        { name: "food", label: "Alimentos", is_selected: false },
        { name: "beverages", label: "Bebidas", is_selected: false },
        { name: "groceries", label: "Supermercado", is_selected: false },
        { name: "cleaning", label: "Limpeza", is_selected: false },
        { name: "garden", label: "Jardim", is_selected: false },
        { name: "construction", label: "Construção", is_selected: false },
        { name: "industrial", label: "Industrial", is_selected: false },
        { name: "security", label: "Segurança", is_selected: false },
        { name: "lighting", label: "Iluminação", is_selected: false },
        { name: "travel", label: "Viagem", is_selected: false },
        { name: "luggage", label: "Malas e Mochilas", is_selected: false },
        { name: "jewelry", label: "Joias", is_selected: false },
        { name: "watches", label: "Relógios", is_selected: false },
        { name: "digital", label: "Produtos Digitais", is_selected: false },
        { name: "services", label: "Serviços", is_selected: false },
        { name: "subscriptions", label: "Assinaturas", is_selected: false },
        { name: "collectibles", label: "Colecionáveis", is_selected: false },
        { name: "music", label: "Música", is_selected: false },
        { name: "movies", label: "Filmes", is_selected: false },
    ]);

    let methods = $state([
        { name: "card", label: "Cartão", discount: 0, is_selected: false },
        { name: "pix", label: "Pix", discount: 0, is_selected: false },
        { name: "boleto", label: "Boleto", discount: 0, is_selected: false },
        { name: "apple", label: "Apple Pay", discount: 0, is_selected: false }
    ]);

    const selectMethod = (method) => {
        const index = methods.findIndex(item => item.name == method.name);
        methods.at(index).is_selected = !methods.at(index).is_selected;
    }

    const addCategory = (category) => {
        const index = categories.findIndex(item => item.name == category.name);
        categories.at(index).is_selected = !categories.at(index).is_selected; 
    }

    const addDiscount = (method, discount) => {
        const index = methods.findIndex(item => item.name == method.name);
        methods.at(index).discount = discount;
    }

    const updateVariation = (name, options) => {
        // 1) Atualiza/insere a variação (sem mutação silenciosa)
        const vIndex = variations.findIndex((v) => v.name === name);

        if(vIndex === -1) {
            variations = [...variations, { name, options }];
        }
        else{
            variations[vIndex] = { name, options };
            variations = [...variations];
        }

        // 2) Cria um "índice" das combinações antigas por assinatura (base64 do array options normalizado)
        const toSignature = (options) => {
            // normaliza: ordena por name e value e garante string
            const normalized = (options ?? [])
            .map((o) => ({ name: String(o.name), value: String(o.value) }))
            .sort((a, b) => (a.name === b.name ? a.value.localeCompare(b.value) : a.name.localeCompare(b.name)));

            // base64 (browser): btoa(utf8(json))
            const json = JSON.stringify(normalized);
            const utf8 = encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16)));
            return btoa(utf8);
        };

        const oldBySig = new Map((prices ?? []).map((p) => [toSignature(p.options), p]));

        // 3) Gera produto cartesiano das variações -> lista de "options" (array de {name,value})
        const sets = (variations ?? []).map((v) =>
            (v.options ?? [])
            .map((val) => String(val).trim())
            .filter(Boolean)
            .map((val) => ({ name: v.name, value: val }))
        );

        // Se alguma variação não tem valores, não há combinações completas
        if (sets.some((s) => s.length === 0)) {
            prices = [];
            return;
        }

        const combos = sets.reduce(
            (acc, set) => acc.flatMap((a) => set.map((b) => [...a, b])),
            [[]]
        );

        // 4) Reconstrói prices reaproveitando os já existentes (mesmo name/value)
        prices = combos.map((options) => {
            const sig = toSignature(options);
            const old = oldBySig.get(sig);

            if (old) {
                // reaproveita preços já definidos e mantém uuid existente
                return { ...old, options };
            }

            // nova combinação
            return {
                uuid: uuidv4(),
                options,
                regular_price: "",
                promo_price: ""
            };
        });
    };

    const addCoupon = (value) => {}

    $effect(() => {
        title = title;
        untrack(() => {
            slug = title
                .toString()
                .normalize("NFD")                   // separa acentos
                .replace(/[\u0300-\u036f]/g, "")    // remove acentos
                .toLowerCase()                      // minúsculas
                .trim()                             // remove espaços nas bordas
                .replace(/[^a-z0-9\s-]/g, "")       // remove caracteres inválidos
                .replace(/\s+/g, "-")               // espaços → hífen
                .replace(/-+/g, "-");               // remove hífens duplicados
        });
    });
</script>

<div class="flex flex-col w-full min-h-dvh relative bg-[#f7f7f7] p-[30px] pt-[25px]">
    <div class="flex items-center justify-between">
        <div class="flex flex-col gap-[5px]">
            <h2 class="text-black text-[19px] font-semibold leading-none">Adicionar produto</h2>
            <span class="text-[#999] text-[14px] leading-[16px]">Cadastrar um novo produto</span>
        </div>
        <!--
        <button type="button" class="flex items-center gap-[8px] cursor-pointer bg-[#feeaea] hover:bg-[#f8e0e0] h-[44px] rounded-full px-[15px]">
            <svg class="h-[16px] shrink-0 fill-[#e75050]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path d="M5 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 15.069 20H4.93a2 2 0 0 1-1.995-1.858L2.07 6H1a1 1 0 0 1 0-2h4V2Zm2 2h6V2H7v2ZM4.074 6l.857 12H15.07l.857-12H4.074Z"/>
            </svg>
            <span class="text-[#e75050] text-[14px] font-medium leading-none whitespace-nowrap">Apagar produto</span>
        </button>
        -->
    </div>
    <div class="flex items-start gap-[20px] mt-[25px] relative">
        <div class="flex flex-col w-full gap-[20px]">
            <div class="flex flex-col w-full gap-[20px]">
                <div class="flex flex-col w-full border-[1px] bg-white border-[#eaeaea] rounded-[10px] gap-[16px] p-[18px]">
                    <div class="flex items-center justify-start gap-[10px]">
                        <h2 class="text-[#333] text-[16px] font-semibold leading-none">Imagens</h2>
                        <span class="text-[#999] text-[13.6px] leading-none">{images.length == 1 ? `1 imagem` : `${images.length} imagens`}</span>
                    </div>
                    <div class="flex">
                        <button type="button" class="flex items-center justify-center size-[120px] bg-[#f7f7f7] hover:bg-[#f2f2f2] cursor-pointer group rounded-[10px]" aria-label="Adicionar">
                            <svg class="fill-[#999] group-hover:fill-[#777] w-[20px] shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34">
                                <path d="M19 15h15v4H19v15h-4V19H0v-4h15V0h4v15Z"/>
                            </svg>                  
                        </button>
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class={`flex flex-col bg-white border-[1px] border-[#eaeaea] ${slug != "" ? "border-b-0 rounded-t-[10px]" : "rounded-[10px]"}`}>
                        <div class={`flex flex-col w-full gap-[16px] rounded-[10px] p-[18px]`}>
                            <div class="flex items-center justify-between gap-[10px]">
                                <h2 class="text-[#333] text-[16px] font-semibold leading-none">Título</h2>
                            </div>
                            <div class="flex flex-col gap-[18px]">
                                <TitleField bind:value={title}/>
                            </div>
                        </div>
                        <span class="flex w-full h-[1px] bg-[#eaeaea]"></span>
                        <div class={`flex flex-col w-full gap-[16px] rounded-[10px] p-[18px]`}>
                            <div class="flex items-center justify-between gap-[10px]">
                                <h2 class="text-[#333] text-[16px] font-semibold leading-none">Descrição</h2>
                            </div>
                            <div class="flex flex-col gap-[18px]">
                                <DescriptionField bind:value={description}/>
                            </div>
                        </div>
                    </div>
                    {#if slug != ""}
                        <div class="flex w-full border-[1px] border-[#eaeaea] border-t-0 rounded-b-[10px] overflow-hidden">
                            <SlugField bind:value={slug}/>
                        </div>
                    {/if}
                </div>
                <div class="flex flex-col w-full border-[1px] border-[#eaeaea] bg-white rounded-[10px]">
                    <div class={`flex flex-col w-full rounded-[10px] p-[18px] gap-[16px]`}>
                        <div class="flex items-center justify-start gap-[10px]">
                            <h2 class="text-[#333] text-[16px] font-semibold leading-none">Variações</h2>
                            <span class="text-[#999] text-[13.6px] leading-none">{variations.length == 1 ? `1 variação` : `${variations.length} variações`}</span>
                        </div>
                        <div class="flex flex-col gap-[18px]">
                            {#each variations as variation, index}
                                {#if index > 0}
                                    <span class="flex w-full h-[1px] bg-[#eaeaea]"></span>
                                {/if}
                                <VariationField {variation} {variations} {updateVariation}/>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full border-[1px] border-[#eaeaea] bg-white rounded-[10px]">
                    <div class={`flex flex-col w-full rounded-[10px] p-[18px] gap-[16px]`}>
                        <div class="flex items-center justify-start gap-[10px]">
                            <h2 class="text-[#333] text-[16px] font-semibold leading-none">Preços</h2>
                            <span class="text-[#999] text-[13.6px] leading-none">{prices.length > 1 ? `${prices.length} preços` : `1 preço`}</span>
                        </div>
                        <div class="flex flex-col gap-[18px]">
                            {#if prices.length > 0}
                                {#each prices as price, index}
                                    {#if index > 0}
                                        <span class="flex w-full h-[1px] bg-[#eaeaea]"></span>
                                    {/if}
                                    <PriceField {price} {prices}/>
                                {/each}
                            {:else}
                                <PriceField {prices}/>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-[500px] bg-white border-[1px] border-[#eaeaea] rounded-[10px]">
            <div class="flex items-center justify-between p-[20px]">
                <span class="text-[#666] text-[14px] leading-none">Habilitado</span>
                <button type="button" class="cursor-pointer" onclick={() => enabled = !enabled}>
                    <Toggle {enabled}/>
                </button>
            </div>
            <span class="flex w-full h-[1px] bg-[#eaeaea]"></span>
            <div class="flex flex-col p-[20px] pt-[18px]">
                <h4 class="text-[#333] text-[16px] font-semibold leading-none">Categorias</h4>
                <div class="flex flex-col mt-[18px]">
                    <CategoryField {categories} {addCategory}/>
                </div>
            </div>
            <span class="flex w-full h-[1px] bg-[#eaeaea]"></span>
            <div class="flex flex-col p-[20px] pt-[18px]">
                <h4 class="text-[#333] text-[16px] font-semibold leading-none">Métodos de pagamento</h4>
                <div class="flex flex-col mt-[18px]">
                    <MethodsField {methods} {selectMethod}/>
                </div>
            </div>
            {#if methods.find(item => item.is_selected)}
                <span class="flex w-full h-[1px] bg-[#eaeaea]"></span>
                <div class="flex flex-col p-[20px] pt-[18px]">
                    <h4 class="text-[#333] text-[16px] font-semibold leading-none">Desconto no pagamento</h4>
                    <div class="flex flex-col gap-[20px] mt-[18px]">
                        {#each methods.filter(item => item.is_selected) as method, index}
                            <DiscountField {method} {addDiscount}/>
                        {/each}
                    </div>
                </div>
            {/if}
            <span class="flex w-full h-[1px] bg-[#eaeaea]"></span>
            <div class="flex flex-col p-[20px] pt-[18px]">
                <h4 class="text-[#333] text-[16px] font-semibold leading-none">Cupons de desconto</h4>
                <div class="flex flex-col mt-[18px]">
                    <CouponsField {coupons} {addCoupon}/>
                </div>
            </div>
        </div>
    </div>
</div>