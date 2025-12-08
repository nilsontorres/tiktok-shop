import { json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

export const POST = async ({ request }) => {
    const body = await request.json();

    if(!body.id){
        return json({ error: true });
    }

    const { data, error } = await supabase
        .from("stores")
        .select("*, media:medias(id, source), products:products(id, title, rating, sales, lightning, medias:medias(id, index, source), prices:prices(id, regular, promotional), coupons:coupons(id, type, target, minimum, limit, origin, discount))")
        .match({
            id: id,
            is_active: true
        })
        .single();

    if(error){
        console.log("Get store by ID error: ", error);
        return json({ error: true });
    }

    return json({
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
                rating: product?.rating,
                sales: product?.sales,
                lightning: product?.lightning,
                coupons: product?.coupons.map(coupon => {
                    return {
                        id: coupon?.id,
                        type: coupon?.type,
                        target: coupon?.target,
                        minimum: coupon?.minimum,
                        limit: coupon?.limit,
                        origin: coupon?.origin,
                        discount: coupon?.discount
                    }
                }),
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
                        regular: price?.regular,
                        promotional: price?.promotional
                    }
                })
            }
        })
    });
}