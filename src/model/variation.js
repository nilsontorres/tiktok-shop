import supabase from "$lib/supabase";

export const getVariationsByProductID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("variations")
        .select("*, variants:variants(id, media:medias(id, source, index), label)")
        .match({
            product_id: id,
            is_active: true
        })
        .order("index", { ascending: true });

    if(error) throw console.log("Get variations by product ID error: ", error); 

    return data.map(variation => {
        return {
            id: variation?.id,
            type: variation?.type,
            title: variation?.title,
            variants: variation?.variants.map(variant => {
                return {
                    id: variant?.id,
                    variation: {
                        id: variation.id
                    },
                    label: variant?.label,
                    media: variant?.media ? {
                        id: variant?.media?.id,
                        source: variant?.media?.source,
                        index: variant?.media?.index
                    } : null,
                    selected: false
                }
            })
        }
    });
}