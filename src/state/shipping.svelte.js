let deadline = $state({
    from: 19,
    to: 28,
    month: "dez"
});

let location = $state({});

let price = $state({
    regular: 47.00,
    promotional: 27.00
});

export const updateCountry = (country) => {
    location.country = country;
}
export const updateRegion = (region) => {
    location.region = region;
}
export const updateCity = (city) => {
    location.city = city;
}