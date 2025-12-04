export const getLowestPrice = (prices) => {
    if(!prices || prices.length == 0) return 0;
    return prices.reduce((a, b) => a.promotional < b.promotional ? a : b);
}
export const isDifferentPrices = (prices) => {
    if(!prices || prices.length == 0) return false;
    if(prices?.length == 1) return false;

    const lowest = prices.reduce((a, b) => a.promotional < b.promotional ? a : b);
    const highest = prices.reduce((a, b) => a.promotional > b.promotional ? a : b);
    if(lowest.id != highest.id) return true;
    else return false
}