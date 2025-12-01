import supabase from "$lib/supabase";

export const getPromotionsByProductID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .match({
            product_id: id,
            is_active: true
        });

    if(error) throw console.log("Get promotions by product ID error: ", error); 

    return data.map(promotion => {
        return {
            id: promotion?.id,
            title: promotion?.title,
            body: promotion?.body,
            theme: promotion?.theme
        }
    });
}