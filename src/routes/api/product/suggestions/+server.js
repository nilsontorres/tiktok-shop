import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

export const POST = async ({ request }) => {
    const { id } = await request.json();
    if(!id) return error(400);

    const { data, error } = await supabase
        .from("suggestions")
        .select("id, title, rating, public_orders, flash_sale, image:images(id, source, index), price:prices(id, regular, promotional)")
        .eq("is_active", true)
        .eq("product_id", id)
        .limit(6);

    if(error) throw console.log(`Get suggestions error: `, error);
    return json(data);
}