import { error } from "@sveltejs/kit";

import { getCountries } from "$model/location";
import { getImagesByProductID } from "$model/media";
import { getVideosByProductID } from "$model/video";
import { getVariationsByProductID } from "$model/variation";
import { getCouponsByProductID } from "$model/coupon";
import { getTagsByProductID } from "$model/tag";
import { getPromotionsByProductID } from "$model/promotion";
import { getProductBySlug } from "$model/product";
import { getReviewsByProductID } from "$model/review";
import { getStoreByID } from "$model/store";

export const load = async ({ params }) => {
    // Busca o produto.
    const product = await getProductBySlug(params?.slug);
    if(!product){
        throw error(404, "Page not found");
    }
    
    return { slug: params?.slug }
}