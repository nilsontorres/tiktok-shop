import supabase from "$lib/supabase";

export const getCouponsByProductID = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .match({
            product_id: id,
            is_active: true
        });

    if(error) throw console.log("Get coupons by product ID error: ", error); 

    return data.map(coupon => {
        return {
            id: coupon?.id,
            type: coupon?.type,
            title: coupon?.title,
            discount: coupon?.discount
        }
    });
}