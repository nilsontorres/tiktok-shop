export const validateCPF = (value) => {
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