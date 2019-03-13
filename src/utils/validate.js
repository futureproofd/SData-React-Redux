
//Simple, best intention regEx for a 'valid' email
export function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}