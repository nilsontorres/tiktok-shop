export const validateCPF = (value) => {
    if(!value) return;

    value = value.replace(/\D/g, '');

    if (value.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(value)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(value.charAt(i)) * (10 - i);
    }

    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10) firstDigit = 0;
    if (firstDigit !== parseInt(value.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(value.charAt(i)) * (11 - i);
    }

    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10) secondDigit = 0;

    return secondDigit === parseInt(value.charAt(10));
}

export const validateFullname = (value) => {
    if(!value) return;

    if(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/.test(value)){
        return true;
    }
    return false;
}

export const validatePhone = (value) => {
    if(!value) return;
    
    const digits = value.replace(/\D/g, '');
    if(digits.length == 11){
        return true;
    }
    return false;
}

export const validateEmail = (value) => {
    if(!value) return;

    if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)){
        return true;
    }
    return false;
}

export const validatePostal = (value) => {
    if(!value) return;

    if(/^[0-9]{8}$/.test(value)){
        return true;
    }
    return false;
}

export const validateDistrict = (value) => {
    if(!value) return;

    if(/([A-z]{1,})/.test(value) && value.length >= 2){
        return true;
    }
    return false;
}

export const validateStreet = (value) => {
    if(!value) return;

    if(/([A-z]{1,})/.test(value) && value.length >= 2){
        return true;
    }
    return false;
}