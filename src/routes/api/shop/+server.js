import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const body = await request.json();

    /*
    // Busca o produto.
    const product = await getProductBySlug(body?.slug);
    if(!product){
        throw error(404, "Page not found");
    }
    */

    return json({ slug });
}