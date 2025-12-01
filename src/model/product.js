import supabase from "$lib/supabase";

export const getProductByID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .match({
            id: id,
            is_active: true
        })
        .single();

    if(error) throw console.log("Get product by ID error: ", error); 

    return {
        id: data?.id,
        slug: data?.slug,
        title: data?.title,
        badge: data?.badge,
        rating: data?.rating,
        reviews: data?.reviews,
        sales: data?.sales
    }
}

export const getProductBySlug = async (slug) => {
    if(!slug) return;

    const { data, error } = await supabase
        .from("products")
        .select("*, store:stores(id, title, reviews, sales), media:medias(id, type, source), attributes:attributes(id, name, value)")
        .match({
            slug: slug,
            is_active: true
        })
        .single();

    if(error) throw console.log(`Get product by slug (${slug}) error: `, error); 

    return {
        id: data?.id,
        slug: data?.slug,
        title: data?.title,
        description: data?.description,
        badge: data?.badge,
        rating: data?.rating,
        reviews: data?.reviews,
        sales: data?.sales,
        attributes: data?.attributes?.map(attribute => {
            return {
                id: attribute.id,
                name: attribute.name,
                value: attribute.value
            }
        }),
        store: {
            id: data?.store?.id,
            title: data?.store?.title,
            reviews: data?.store?.reviews,
            sales: data?.store?.sales
        }
    }
}