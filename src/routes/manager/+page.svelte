<script>
    import { onMount, tick } from "svelte";
    import { afterNavigate } from '$app/navigation';
    import { pushState, replaceState } from '$app/navigation';

    import ProductsPage from "$component/manager/products/ProductsPage.svelte";
    import Sidebar from "$component/manager/Sidebar.svelte";
    import AddProductPage from "$component/manager/add-product/AddProductPage.svelte";

    let { data } = $props();

    let pages = [
        { name: "products", path: "/manager/products" },
        { name: "add-product", path: "/manager/add/product" }
    ];

    let pathname = $derived(data.pathname);
    let page = $derived({});
    let history = $state([]);

    let total = $state({
        products: data?.products,
        stores: data?.stores,
        orders: data?.orders,
        images: data?.images,
        videos: data?.videos,
        reviews: data?.reviews,
        customers: data?.customers,
        sessions: data?.sessions
    });

    const changePage = (name, params) => {
        //history.push(page);
        
        const item = pages.find(item => item.name == name);
        page = { ...item, params };
        pushState(page.path, page);
    }

    /*
    afterNavigate((navigation) => {
        //const item = pages?.find(item => item.url == navigation.to.url.pathname);
        //page = { name: item.name, url: item.url, params: [] };
        if(navigation.type === "popstate"){
            console.log('Usuário clicou em voltar ou avançar');
        }
    });
    */

    onMount(() => {
        const item = pages.find(item => item.path == pathname);
        page = { ...item, params: [] };
        tick().then(() => replaceState(page.path, page));
    });
</script>

<div class="flex w-full">
    <Sidebar {page} {total} {changePage}/>
    <div class="flex flex-col w-full min-h-dvh ps-[280px] bg-[#f7f7f7] relative">
        {#if page.name == "products"}
            <ProductsPage {total} {changePage}/>
        {:else if page.name == "add-product"}
            <AddProductPage/>
        {/if}
    </div>
</div>