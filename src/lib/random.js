export const getRandomNumber = (length) => {
    if (!Number.isInteger(length) || length <= 0) return "";
  
    let result = "";
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
  
    return result;
}