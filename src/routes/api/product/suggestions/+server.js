import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

export const POST = async ({ request }) => {
    const { id } = await request.json();
    if(!id) return error(400);

    const { data, error } = await supabase
        .from("products")
        .select("id, title, rating, total_sales, total_reviews, flash_sale, images:images(id, index, source), prices:prices(id, regular, promotional), coupons:coupons(id, type, target, minimum, limit, origin, discount)")
        .eq("is_active", true) //.neq("id", id)
        .limit(6);

    if(error) throw console.log(`Get products for suggestions error: `, error);
    return json(data);
}