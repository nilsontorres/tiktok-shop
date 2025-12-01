import supabase from "$lib/supabase";

export const getCountries = async () => {
    const { data, error } = await supabase
        .from("countries")
        .select("*");

    if(error) throw console.log("Get countries error: ", error); 

    return data.map(country => {
        return {
            id: country.id,
            name: country.name,
            code: country.code
        }
    });
}