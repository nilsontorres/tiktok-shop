import { json } from '@sveltejs/kit';
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

export const POST = async ({ request }) => {
    const body = await request.json();

    // Busca o produto.
    const product = await getProductBySlug(body?.slug);
    if(!product){
        throw error(404, "Page not found");
    }

    // Pega os dados da loja.
    const store = await getStoreByID(product?.store?.id);

    // Pega a lista de paises.
    const countries = await getCountries();

    // Pega todos os dados do produto.
    const coupons = await getCouponsByProductID(product?.id);
    const tags = await getTagsByProductID(product?.id);
    const promotions = await getPromotionsByProductID(product?.id);
    const images = await getImagesByProductID(product?.id);
    const videos = await getVideosByProductID(product?.id);
    const variations = await getVariationsByProductID(product?.id);
    const reviews = await getReviewsByProductID(product?.id);

    return json({
        countries,
        coupons,
        tags,
        promotions,
        product,
        images,
        videos,
        variations,
        reviews,
        store
    });
}