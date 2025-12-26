import { error } from "@sveltejs/kit";
import supabase from "$lib/supabase";

const getProductBySlug = async (slug) => {
    if(!slug) return;

    const { data, error } = await supabase
        .from("products")
        .select("id, images:images(id, source, index), prices:prices(id, regular, promotional)")
        .match({ slug, is_active: true })
        .maybeSingle();

    if(error) throw console.error("Error on getProductID:", error);
    return data;
}

export const load = async ({ url, locals, params }) => {
    // Busca os dados do produto.
    const product = await getProductBySlug(params.slug);
    if(!product) throw error(404, "Page not found");

    // Pega o envio.
    const shipping = {
        price: {
            regular: 47.00,
            promotional: 27.00
        },
        location: {
            country: {name: "Brasil", code: "BR"}
        },
        coupon: {
            discount: 20.00,
            minimum: 29.00
        },
        deadline: {
            from: 19,
            to: 28,
            month: "dez"
        }
    };

    // Pega o menor preço.
    const price = product.prices.reduce((a, b) => {
        return b.promotional < a.promotional ? b : a;
    });
    
    return { product, shipping, price };
}