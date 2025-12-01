import supabase from "$lib/supabase";

export const getVideosByProductID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
            .from("videos")
            .select("*, product:products(id), user:users(id, fullname, media:medias(id, source)), media:medias(id, source)")
            .match({
                product_id: id,
                is_active: true
            })
            .order("index", { ascending: true });
    
        if(error) throw console.log("Get videos by product ID error: ", error); 
    
        return data.map(video => {
            return {
                id: video.id,
                product: {
                    id: video.product?.id
                },
                user: {
                    id: video.user?.id,
                    fullname: video.user?.fullname,
                    media: {
                        id: video.user?.media?.id,
                        source: video.user?.media?.source,
                    }
                },
                media: {
                    id: video.media?.id,
                    source: video.media?.source
                },
                index: video.index
            }
        });
}