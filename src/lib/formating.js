export const formatPrice = (value) => {
    if(!value) return;

    // Se for um número inteiro (sem casas decimais diferentes de zero)
    if (Number.isInteger(value)) {
        return new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 0, // sem casas decimais
            maximumFractionDigits: 0,
        }).format(value);
    }
  
    // Caso tenha centavos
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

export const formatNumber = (value) => {
    if(!value) return {};

    if(value >= 1000000){
        return {
            pt: (value / 1000000).toFixed(1).replace('.', ',') + " milhões",
            en: (value / 1000000).toFixed(1) + "m"
        };
    }
    else if(value >= 1000){
        return {
            pt: (value / 1000).toFixed(1).replace('.', ',') + " mil",
            en: (value / 1000).toFixed(1) + "k"
        };
    }

    return {
        pt: value.toString(),
        en: value.toString(),
    }
}

export const maskWords = (value) => {
    if(!value) return;

    return value.replace(/\p{L}+/gu, word => {
        if (word.length <= 2) return word;
        return word[0] + "*".repeat(word.length - 2) + word[word.length - 1];
    });
};

export const removeAccent = (value) =>  {
    if(!value) return;

    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}