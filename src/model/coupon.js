import supabase from "$lib/supabase";

export const getCouponsByProductID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .match({
            product_id: id,
            is_active: true
        })
        .order("target", { ascending: false });

    if(error) throw console.log("Get coupons by product ID error: ", error); 

    return data.map(coupon => {
        return {
            id: coupon?.id,
            type: coupon?.type,
            target: coupon?.target,
            minimum: coupon?.minimum,
            limit: coupon?.limit,
            origin: coupon?.origin,
            discount: coupon?.discount
        }
    });
}