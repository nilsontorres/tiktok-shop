import { error as _error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";
import { validateInteger, validateReviewFilter, validateUUID } from '$lib/validation.js';

const filters = {
    all: {gte: 0, lte: 5},
    images: {gte: 0, lte: 5},
    five: {gte: 4.51, lte: 5},
    four: {gte: 3.51, lte: 4},
    three: {gte: 2.51, lte: 3},
    two: {gte: 1.51, lte: 2},
    one: {gte: 0.51, lte: 1}
}

export const POST = async ({ request }) => {
    const { id, filter, page, limit } = await request.json();
    
    if(!validateUUID(id)) return _error(400);
    if(!validateReviewFilter(filter)) return _error(400);
    if(!validateInteger(page)) return _error(400);
    if(!validateInteger(limit) || limit <= 0) return _error(400);

    const { data, count, error } = await supabase
        .from("reviews")
        .select(`
            id,
            content,
            rating,
            item,
            likes,
            is_liked,
            user:users(id, fullname, image:images(id, source)),
            ${filter == "images" ? "images:images!inner" : "images:images"}(id, source, index, review_id))`)
        .gte("rating", filter ? filters[filter].gte : 0)
        .lte("rating", filter ? filters[filter].lte : 5)
        .eq("is_active", true)
        .eq("product_id", id)
        .order("created_at", { ascending: false })
        .order("index", { foreignTable: "images", ascending: true })
        .range(page * limit, (page * limit) + limit);

    if(error) throw console.log(`Get product reviews error: `, error);
    return json(data);
}