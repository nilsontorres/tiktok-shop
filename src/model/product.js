import supabase from "$lib/supabase";

export const getProductBySlug = async (slug) => {
    if(!slug) return;

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
            store_id,
            images:images(id, source, index),
            coupons:coupons(id, type, discount, target, limit, minimum),
            prices:prices(id, regular, promotional),
            tags:tags(id, label)
        `)
        .match({ slug, is_active: true })
        .maybeSingle();

    if(error) throw console.log(`Get product by slug error: `, error);
    return data;
}

export const getProductReviews = async (id, limit=null) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("reviews")
        .select(`
            id,
            content,
            rating,
            item,
            user:users(id, fullname, image:images(id, source))
            images:images(id, source, index)
        `)
        .match({ product_id: id, is_active: true })
        .limit(limit);

    if(error) throw console.log(`Get product reviews error: `, error);
    return data;
}