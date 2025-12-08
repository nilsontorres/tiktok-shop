import { error } from "@sveltejs/kit";
import supabase from "$lib/supabase";

const getProductID = async (slug) => {
    if(!slug) return;

    const { data, error } = await supabase
        .from("products")
        .select("id, images:images(id, source, index)")
        .match({ slug, is_active: true })
        .maybeSingle();

    if(error) throw console.error("Error on getProductID:", error);
    return data;
}

export const load = async ({ params }) => {
    // Verifica se o produto existe.
    const product = await getProductID(params.slug);
    if(!product) throw error(404, "Page not found");

    // Retorna os dados.
    return { product }
}