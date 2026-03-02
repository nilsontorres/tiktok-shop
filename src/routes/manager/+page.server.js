import { error, json } from '@sveltejs/kit';
import supabase from "$lib/supabase";

const countProducts = async () => {
    const { count, error } = await supabase.from("products").select("*", { count: "exact", head: true });
    return count;
}

const countStores = async () => {
    const { count, error } = await supabase.from("stores").select("*", { count: "exact", head: true });
    return count;
}

const countOrders = async () => {
    const { count, error } = await supabase.from("orders").select("*", { count: "exact", head: true });
    return count;
}

const countImages = async () => {
    const { count, error } = await supabase.from("images").select("*", { count: "exact", head: true });
    return count;
}

const countVideos = async () => {
    const { count, error } = await supabase.from("videos").select("*", { count: "exact", head: true });
    return count;
}

const countReviews = async () => {
    const { count, error } = await supabase.from("reviews").select("*", { count: "exact", head: true });
    return count;
}

const countUsers = async () => {
    const { count, error } = await supabase.from("customers").select("*", { count: "exact", head: true });
    return count;
}

const countSessions = async () => {
    const { count, error } = await supabase.from("sessions").select("*", { count: "exact", head: true });
    return count;
}

export const load = async ({ url }) => {
    const [
        products,
        stores,
        orders,
        images,
        videos,
        reviews,
        customers,
        sessions
    ] = await Promise.all([
        countProducts(),
        countStores(),
        countOrders(),
        countImages(),
        countVideos(),
        countReviews(),
        countUsers(),
        countSessions()
    ]);

    const pathname = url.pathname;
    return { products, stores, orders, images, videos, reviews, customers, sessions, pathname };
}