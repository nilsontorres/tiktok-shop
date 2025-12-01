import supabase from "$lib/supabase";

export const getImagesByProductID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("medias")
        .select("*")
        .match({
            product_id: id,
            type: "image",
            origin: "product",
            is_active: true
        })
        .order("index", { ascending: true });

    if(error) throw console.log("Get images by product ID error: ", error); 

    return data.map(media => {
        return {
            id: media?.id,
            type: media?.type,
            origin: media?.origin,
            source: media?.source,
            index: media?.index,
            default: media?.default
        }
    });
}