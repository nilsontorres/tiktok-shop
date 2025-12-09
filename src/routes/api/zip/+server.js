import supabase from '$lib/supabase.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const body = await request.json();

    const { data, error } = await supabase
        .from("postals")
        .select("*, city:cities(id, name), region:regions(id, name, code), country:countries(id, name, code)")
        .eq("code", body.code) //.ilike("code", `${body.code}%`)
        .limit(20);

    if(error) return json({
        success: false
    });

    return json({
        success: true,
        results: data.map(result => {
            return {
                id: result.id,
                code: result.code,
                city: {
                    id: result.city?.id,
                    name: result.city?.name,
                },
                region: {
                    id: result.region?.id,
                    name: result.region?.name,
                    code: result.region?.code
                },
                country: {
                    id: result.country?.id,
                    name: result.country?.name,
                    code: result.country?.code
                }
            }
        })
    });
}