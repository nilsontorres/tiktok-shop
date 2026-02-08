<script>
    import { onMount, untrack } from 'svelte';
    import { addHoursToDate } from '$lib/datetime';
    import { getCardInstallments } from '$lib/card.js';

    import { PUBLIC_UPLOAD_BASE } from '$env/static/public';

    import PageTransition from "$component/shop/PageTransition.svelte";
    import FinalizationPage from "$component/shop/finalization/FinalizationPage.svelte";
    import AddressPage from "$component/shop/address/AddressPage.svelte";
    import ProductPage from '$component/shop/product/ProductPage.svelte';
    import ProductSkeleton from '$component/shop/product/ProductSkeleton.svelte';
    import PaymentPage from '$component/shop/payment/PaymentPage.svelte';
    import ReviewsPage from '$component/shop/reviews/ReviewsPage.svelte';
    import CardPage from '$component/shop/card/CardPage.svelte';
    import InstallmentsPage from '$component/shop/installments/InstallmentsPage.svelte';
    import OrderPage from '$component/shop/order/OrderPage.svelte';
    import ToastNotification from '$component/shop/ToastNotification.svelte';

    let { data } = $props();

    let toast = $state(null);

    let product = $state(data.product);
    let customer = $state(data.customer);
    let address = $state(data.address);

    let variations = $derived(product?.variations);
    let prices = $derived(product?.prices);
    let shipping = $derived(product?.shipping);

    let quantity = $state(1);
    let saved = $state(false);
    let ready = $state(false);
    let method = $state(null);

    let price = $derived(prices?.find(item => item.is_selected) || prices?.reduce((a, b) => a.promotional < b.promotional ? a : b));
    let image = $derived(variations?.find(item => item.type == "image")?.variants?.find(item => item.is_selected)?.image || product?.images?.find(item => item.index == 0));

    let coupons = $derived(product?.coupons);
    $effect(() => {
        let product_coupon;
        let shipping_coupon;

        coupons?.map((item, index) => {
            if(item.category == "product"){
                const is_applied = item.is_redeemed && (item.minimum ? price?.promotional >= item.minimum : true);
                const amount = item.type == "variable" ? price?.promotional * item.discount : item.discount;
                if(is_applied && product_coupon){
                    const prevent = product_coupon.type == "variable" ? price?.promotional * product_coupon.discount : product_coupon.discount;
                    if(amount > prevent){
                        product_coupon = item;
                    }
                }
                else if(is_applied){
                    product_coupon = item;
                }
            }
            if(item.category == "shipping"){
                const is_applied = item.is_redeemed && (item.minimum ? shipping?.price?.regular >= item.minimum : true);
                const amount = item.type == "variable" ? shipping?.price?.regular * item.discount : item.discount;
                if(is_applied && shipping_coupon){
                    const prevent = shipping_coupon.type == "variable" ? shipping?.price?.regular * shipping_coupon.discount : shipping_coupon.discount;
                    if(amount > prevent){
                        shipping_coupon = item;
                    }
                }
                else if(is_applied){
                    shipping_coupon = item;
                }
            }
        });

        coupons?.map((item, index) => {
            if(product_coupon && item.id == product_coupon.id){
                coupons.at(index).is_applied = true;
            }
            else if(shipping_coupon && item.id == shipping_coupon.id){
                coupons.at(index).is_applied = true;
            }
            else{
                coupons.at(index).is_applied = false;
            }
        });
    });

    let installments = $derived(price?.promotional ? getCardInstallments("mastercard", price?.promotional) : null);
    let variants = $derived(variations?.flatMap(variation => variation.variants)?.filter(variant => variant.is_selected));

    let costs = $derived({product: price?.regular * quantity, shipping: shipping?.price?.regular});
    let discounts = $derived.by(() => {
        let discounts = {
            product: { total: 0, offer: 0, coupons: 0 },
            shipping: { total: 0, offer: 0, coupons: 0 },
            payment: 0
        };

        if(price?.regular != price?.promotional && price?.promotional > 0){
            const amount = (price?.regular - price?.promotional) * quantity;
            discounts.product.offer = amount;
            discounts.product.total += amount;
        }
        if(shipping?.price?.regular != shipping?.price?.promotional && shipping?.price?.promotional > 0){
            const amount = shipping?.price?.regular - shipping?.price?.promotional;
            discounts.shipping.offer = amount;
            discounts.shipping.total += amount;
        }

        coupons?.map(item => {
            if(item.is_applied){
                if(item.category == "product"){
                    const amount = item.type == "variable" ? item.discount * price.promotional : item.discount;
                    discounts.product.coupons += amount;
                    discounts.product.total += amount;
                }
                else if(item.category == "shipping"){
                    const amount = item.type == "variable" ? item.discount * shipping?.price?.regular : item.discount;
                    discounts.shipping.coupons += amount;
                    discounts.shipping.total += amount;
                }
            }
        });

        if(method == "pix" && product?.pix_discount > 0){
            if(product?.pix_discount < 1){
                discounts.payment = product?.pix_discount * (costs.product + costs.shipping - discounts.product.total - discounts.shipping.total);
            }
            else{
                discounts.payment = product?.pix_discount;
            }
        }

        if((costs.shipping - discounts.shipping.total) < 0){
            discounts.shipping.coupons -= (costs.shipping - discounts.shipping.total) * -1;
            discounts.shipping.total = discounts.shipping.offer + discounts.shipping.coupons;
        }
        if((costs.product - discounts.product.total) < 0){
            discounts.product.coupons -= (costs.product - discounts.product.total) * -1;
            discounts.product.total = discounts.product.offer + discounts.product.coupons;
        }

        return discounts;
    });

    let total = $derived(costs.product + costs.shipping - discounts.product.total - discounts.shipping.total - discounts.payment);

    let order = $state(null);
    let cards = $state([]);

    const updateAddress = (value) => {
        address = value;
    }
    const updateQuantity = (value) => {
        quantity = Math.max(1, Math.min(10, value));
    }
    const updateCustomer = (value) => {
        customer = value;
    }
    const updateOrder = (value) => {
        order = value;
    }
    const updateMethod = (value, card) => {
        method = value;

        if(card){
            cards.map((item, index) => {
                if(item.number == card.number){
                    cards[index].is_selected = true;
                }
                else{
                    cards[index].is_selected = false;
                }
            });
        }
    }
    const updateCards = (value) => {
        cards = value;
    }
    const applyCoupon = (id) => {
        toast.showMessage("Melhor oferta aplicada");
    }
    const redeemCoupon = (id) => {
        const index = coupons.findIndex(item => item.id == id);
        coupons[index].is_redeemed = true;
        toast.showMessage("Cupom reivindicado");
    }
    const updateVariation = (id) => {
        variations.map((variation, i) => {
            variation.variants.map((variant, j) => {
                if(variant.id == id){
                    variations[i].variants[j].is_selected = true;
                }
                else{
                    variations[i].variants[j].is_selected = false;
                }
            });
        });

        prices.map((item, index) => {
            if(JSON.stringify(item.variants) == JSON.stringify(variants.map(item => item.id))){
                prices[index].is_selected = true;
            }
            else{
                prices[index].is_selected = false;
            }
        });
    }
    const saveProduct = () => {
        saved = !saved;
    }
    const loadProduct = async () => {
        const request = await fetch("/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: product?.id })
        });

        if(request.status === 200){
            product = await request.json();
            ready = true;
        }
    }

    onMount(() => {
        loadProduct();

        //method = "pix";
        customer = { fullname: "Nilson Douglas Olimpio Torres", phone: "66992304836", email: "nilsontorres21@outlook.com", document: "06223439121", filled: true };
        address = { postal: "78575000", district: "Aeroporto", street: "Rua Goias", number: "502N", city: {name: "Juara"}, region: {name: "Mato Grosso", code: "MT"}, unit: null, filled: true };
        //total = 90.12;
        //variations = [{ name: "Cor", type: "image", variants: [{ name: "Preto", is_selected: false }, { name: "Branco", is_selected: true }] }];
    });
</script>

<svelte:head>
    {#each product?.images as image}
        {#if image.index == 0}
            <link rel="preload" as="image" href={`${PUBLIC_UPLOAD_BASE}/${image.source}`}/>
        {/if}
    {/each}
</svelte:head>

{#if ready}
    <ToastNotification bind:this={toast} top={300}/>
    <PageTransition pages={[
        {name: "product", color: "#FFFFFF", component: ProductPage, props: {
            price,
            image,
            saved,
            total,
            costs,
            prices,
            product,
            address,
            coupons,
            shipping,
            variants,
            quantity,
            discounts,
            variations,
            installments,
            saveProduct,
            applyCoupon,
            redeemCoupon,
            updateAddress,
            updateQuantity,
            updateVariation
        }},
        {name: "reviews", color: "#FFFFFF", component: ReviewsPage, props: {
            price,
            image,
            costs,
            prices,
            product,
            discounts,
            shipping,
            quantity,
            variants,
            variations,
            updateQuantity,
            updateVariation
        }},
        {name: "finalization", color: "#FFFFFF", component: FinalizationPage, props: {
            price,
            image,
            order,
            costs,
            cards,
            total,
            method,
            product,
            coupons,
            address,
            customer,
            quantity,
            shipping,
            variants,
            discounts,
            variations,
            installments,
            updateAddress,
            updateCustomer,
            updateQuantity,
            updateMethod,
            updateOrder
        }},
        {name: "add_address", color: "#F5F5F5", component: AddressPage, history: false, props: {
            address,
            customer,
            updateAddress,
            updateCustomer
        }},
        {name: "add_card", color: "#F5F5F5", component: CardPage, history: false, props: {
            price,
            cards,
            method,
            product,
            updateCards,
            updateMethod,
        }},
        {name: "installments", color: "#F5F5F5", component: InstallmentsPage, props: {
            total,
            price,
            cards,
            method,
            product,
            updateCards,
            updateMethod,
        }},
        {name: "payment", color: "#FFFFFF", component: PaymentPage, props: {
            order,
            total,
            method,
            address,
            product,
            customer,
            shipping,
            updateOrder
        }},
        {name: "order", color: "#FFFFFF", component: OrderPage, props: {
            image,
            price, 
            order,
            costs,
            total,
            cards,
            method,
            address,
            product,
            quantity,
            variants,
            customer,
            discounts,
            installments,
            updateOrder,
            updateMethod
        }}
    ]}/>
{:else}
    <ProductSkeleton/>
{/if}