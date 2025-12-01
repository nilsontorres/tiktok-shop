import supabase from "$lib/supabase";

export const getStoreByID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("stores")
        .select("*, media:medias(id, source), products:products(id, title, medias:medias(id, index, source), prices:prices(id, price, discount))")
        .match({
            id: id,
            is_active: true
        })
        .single();

    if(error) throw console.log("Get store by ID error: ", error); 

    return {
        id: data?.id,
        title: data?.title,
        reviews: data?.reviews,
        sales: data?.sales,
        media: {
            id: data?.media?.id,
            source: data?.media?.source
        },
        products: data?.products?.map(product => {
            return {
                id: product?.id,
                title: product?.title,
                medias: product?.medias.map(media => {
                    return {
                        id: media?.id,
                        index: media?.index,
                        source: media?.source
                    }
                }),
                prices: product?.prices?.map(price => {
                    return {
                        id: price?.id,
                        price: price?.price,
                        discount: price?.discount
                    }
                })
            }
        })
    }
}