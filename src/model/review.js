import supabase from "$lib/supabase";

export const getReviewsByProductID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("reviews")
        .select("*, product:products(id), user:users(id, fullname, media:medias(id, source)), medias:medias(id, index, source)")
        .match({
            product_id: id,
            is_active: true
        });

    if(error) throw console.log("Get reviews by product ID error: ", error); 

    return data.map(review => {
        return {
            id: review?.id,
            rating: review?.rating,
            body: review?.body,
            item: review?.item,
            user: {
                id: review?.user?.id,
                fullname: review?.user?.fullname,
                media: {
                    id: review?.user?.media?.id,
                    source: review?.user?.media?.source
                }
            },
            medias: review?.medias?.map(media => {
                return {
                    id: media?.id,
                    index: media?.index,
                    source: media?.source
                }
            }),
            product: {
                id: review?.product?.id,
            }
        }
    });
}