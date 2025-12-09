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

export const load = async ({ url, locals }) => {
    const { pathname } = url;

    if(/\/([A-z0-9-]+)/.test(pathname)){
        // Pega o slug da url.
        const slug = pathname.match(/\/([A-z0-9-]+)/)[1];

        // Pega o ID e imagens para pré-carregamento.
        const product = await getProductID(slug);
        if(!product) throw error(404, "Page not found");
        
        return {
            id: product?.id,
            images: product?.images
        }
    }
}