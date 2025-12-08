import supabase from "$lib/supabase";

export const getStoreByID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("stores")
        .select(`
            id,
            title,
            total_sales,
            total_reviews,
            image:images(id, source)
        `)
        .match({ id, is_active: true })
        .maybeSingle();

    if(error) throw console.log("Get store by id error: ", error);
    return data;
}

export const getStoreProducts = async (id, limit=null) => {
    if(!id) return;

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
        .match({ store_id: id, is_active: true })
        .limit(limit);

    if(error) throw console.log(`Get store products error: `, error);
    return data;
}