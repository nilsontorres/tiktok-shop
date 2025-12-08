import { json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

export const POST = async ({ request }) => {
    const { id } = await request.json();

    if(!id){
        return json({ error: true });
    }

    const { data, error } = await supabase
        .from("products")
        .select("id, title, rating, total_sales, total_reviews, flash_sale, images:images(id, index, source), prices:prices(id, regular, promotional), coupons:coupons(id, type, target, minimum, limit, origin, discount)")
        .match({
            store_id: id,
            is_active: true
        });

    if(error){
        console.log(`Get products by store error: `, error);
        return json({ error: true })
    }

    return json(data);
}