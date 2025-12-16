import { IPAPI_TOKEN } from "$env/static/private";

export const queryIPAddress = async (ip_address) => {
    try {
        const request = await fetch(`https://api.ipapi.is?q=${ip_address}&key=${IPAPI_TOKEN}`, {
            method: 'POST'
        });
    
        if (!request.ok) {
            throw new Error(`HTTP error! status: ${request?.status}`);
        }
    
        const response = await request.json();
        return response;
    }
    catch (error) {
        console.error('Erro ao fazer requisição:', error);
        return {};
    }
}