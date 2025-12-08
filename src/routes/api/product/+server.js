import { json } from '@sveltejs/kit';
import supabase from "$lib/supabase";
import { getProductBySlug, getProductCoupons, getProductImages, getProductPrices, getProductReviews, getProductTags, getProductVariations } from '$model/product.js';
import { getStoreByID } from '$model/store.js';

export const POST = async ({ request }) => {
    const { slug } = await request.json();
    if(!slug){
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
            store:stores(id, title, image:images(id, source), products:products(id, title, rating, total_sales, total_reviews, flash_sale, coupons:coupons(id, type, discount, target, limit, minimum), prices:prices(id, regular, promotional))),
            images:images(id, source, index),
            coupons:coupons(id, type, discount, target, limit, minimum),
            variations:variations(id, type, index, label, variants:variants(id, value, image:images(id, source))),
            prices:prices(id, regular, promotional),
            reviews:reviews(id, content, rating, item, user:users(id, fullname, image:images(id, source)), images:images(id, source, index)),
            videos:videos(id, user:users(id, fullname, image:images(id, source)), image:images(id, source)),
            tags:tags(id, label)
        `)
        .match({ slug, is_active: true })
        .limit(3, { foreignTable: "reviews" })
        .limit(6, { foreignTable: "videos" })
        .maybeSingle();
    
    if(error) throw console.log(`Get product by slug error: `, error);
    return json(data);
}