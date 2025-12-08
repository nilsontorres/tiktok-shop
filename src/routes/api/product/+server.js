import { json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

export const POST = async ({ request }) => {
    const { id } = await request.json();
    if(!id){
        return json({ error: true });
    }

    const { data, error } = await supabase
        .from("products")
        .select(`
            id,
            slug,
            title,
            description,
            bedge,
            rating,
            total_sales,
            total_reviews,
            flash_sale,
            store:stores(id, title, total_sales, total_reviews, image:images(id, source)),
            images:images(id, source, index),
            coupons:coupons(id, type, discount, target, limit, minimum, origin),
            variations:variations(id, type, index, label, variants:variants(id, value, image:images(id, source))),
            prices:prices(id, regular, promotional),
            tags:tags(id, label)
        `)
        .match({ id, is_active: true })
        .maybeSingle();
    
    if(error){
        console.log(`Get product by id error: `, error);
        return json({ error: true })
    }

    return json(data);
}