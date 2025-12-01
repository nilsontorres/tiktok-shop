import supabase from '$lib/supabase.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const body = await request.json();

    const { data, error } = await supabase
        .from("regions")
        .select("*")
        .eq("country_id", body.country)
        .order("name", { ascending: true });

    if(error) return json({
        success: false
    });

    return json({
        success: true,
        results: data.map(result => {
            return {
                id: result.id,
                name: result.name,
                code: result.code,
                country: {
                    id: result.country?.id,
                    name: result.country?.name,
                    code: result.country?.code
                }
            }
        })
    });
}