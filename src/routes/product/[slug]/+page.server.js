import { error } from "@sveltejs/kit";
import supabase from "$lib/supabase";
import { getLowestPrice } from "$lib/clipboard.js";

const getProductBySlug = async (slug) => {
    if(!slug) return;

    const { data, error } = await supabase
        .from("products")
        .select(`
            id,
            store_id,
            images:images(id, source, index),
            prices:prices(id, variants, regular, promotional, is_selected)
        `)
        .eq("slug", slug)
        .eq("is_active", true)
        .order("index", { foreignTable: "images", ascending: true })
        .maybeSingle();

    if(error) throw console.error("Error on getProductBySlug:", error);
    return data;
}

export const load = async ({ url, locals, params }) => {
    // Busca os dados do produto.
    const product = await getProductBySlug(params.slug);
    if(!product) throw error(404, "Page not found");

    // Pega os dados do cliente.
    const customer = {};

    // Pega os dados do endereço.
    const address = {};
    
    return { product, address, customer };
}