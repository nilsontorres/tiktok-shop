export const formatPrice = (value, decimals) => {
    if(!value) return;

    // Se for um número inteiro (sem casas decimais diferentes de zero)
    if (decimals == false && Number.isInteger(value)) {
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

export const maskPhone = (value) => {
    if(!value) return;

    return value.slice(0, 2) + "*".repeat(value.length - 4) + value.slice(-2);
}

export const firstAndLastName = (value) => {
    if(!value) return;

    const parts = value.split(/\s+/);
    return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1]}` : parts[0];
}

export const formatFullname = (value) => {
    if(!value) return;

    const words = value.split(/\s+/).map(p => p.toLocaleLowerCase("pt-BR"));
    return words.map((word, index) => {
        if(index === 0 || index === words.length - 1){
            return word[0].toLocaleUpperCase("pt-BR") + word.slice(1);
        }
        if(word.length <= 2){
            return word;
        }

        return word[0].toLocaleUpperCase("pt-BR") + word.slice(1);
    }).join(" ");
}

export const formatTimer = (value) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = Math.floor(value % 60);

    const pad = num => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export const removeAccent = (value) =>  {
    if(!value) return;

    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const formatCPF = (value) => {
    if(!value) return;

    value = value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    return value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
}