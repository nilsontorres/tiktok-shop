import { error } from "@sveltejs/kit";
import supabase from "$lib/supabase";

const getProductBySlug = async (slug) => {
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
    const product = await getProductBySlug("ccf7dbe7-bd3a-4b56-8e1e-df51b9e67100");
    if(!product) throw error(404, "Page not found");
    
    return {
        id: product?.id,
        images: product?.images
    }
}