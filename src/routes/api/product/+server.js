import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

export const POST = async ({ request }) => {
    const { id } = await request.json();
    if(!id) return error(400);

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
            reviews:reviews(id, content, rating, item, user:users(id, fullname, image:images(id, source)), images:images(id, source, index)),
            images:images(id, source, index),
            coupons:coupons(id, type, discount, target, limit, minimum, origin),
            variations:variations(id, type, index, label, variants:variants(id, value, image:images(id, source))),
            prices:prices(id, regular, promotional),
            tags:tags(id, label)
        `)
        .match({ id, is_active: true })
        .limit(3, { foreignTable: "reviews" })
        .maybeSingle();
    
    if(error) throw console.log(`Get product by id error: `, error);
    return json(data);
}