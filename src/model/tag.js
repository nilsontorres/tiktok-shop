import supabase from "$lib/supabase";

export const getTagsByProductID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("tags")
        .select("*")
        .match({
            product_id: id,
            is_active: true
        });

    if(error) throw console.log("Get tags by product ID error: ", error); 

    return data.map(tag => {
        return {
            id: tag?.id,
            title: tag?.title
        }
    });
}