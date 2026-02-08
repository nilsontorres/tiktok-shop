import supabase from '$lib/supabase.js';
import { json } from '@sveltejs/kit';

const validateCaptchaByDevice = async (id) => {
    if(!id) return;

    const { data, error } = await supabase
        .from("devices")
        .update({ captcha_solved: true })
        .eq("id", id);

    if(error) throw console.error("Error on validateCaptchaByDevice:", error);
    return true;
}

export const POST = async ({ request, locals }) => {
    const validate = await validateCaptchaByDevice(locals?.device?.id);
    if(validate){
        return json({
            success: true
        });
    }
    else{
        return json({
            success: false
        })
    }
}