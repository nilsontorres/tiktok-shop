import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

export const POST = async ({ request }) => {
  const { id } = await request.json();
  if(!id) return error(400);

  const { data, error } = await supabase
  .from("products")
  .select(`
    id,
    slug,
    title,
    description,
    badge,
    rating,
    search,
    public_orders,
    public_reviews,
    total_orders,
    total_reviews,
    flash_sale,
    pix_method,
    card_method,
    apple_method,
    boleto_method,
    free_installments,
    pix_discount,
    in_cart,
    recently_viewed,
    store:stores( id, title, public_orders, public_reviews, repurchases, image:images(id, source)),
    shipping:shippings(id, name, deadline, price:prices(id, regular, promotional)),
    prices:prices(id, variants, regular, promotional, image:images(id, source, index), is_selected, is_lowest, is_highest),
    images:images(id, source, index),
    coupons:coupons(id, type, discount, category, limit, minimum, origin, is_applied, is_redeemed),
    variations:variations(id, type, index, name, variants:variants(id, name, image:images(id, source), is_selected)),
    videos:videos(id, customer:customers(id, fullname, phone, email, document, image:images(id, source)), image:images(id, source)),
    tags:tags(id, label)
  `)
  .match({ id, is_active: true })
  .order("index", { foreignTable: "images", ascending: true })
  .maybeSingle();

  if(error) throw console.log(`Get product by id error: `, error);
  return json(data);
}