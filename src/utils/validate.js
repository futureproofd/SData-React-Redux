/* eslint-disable import/prefer-default-export */
// Simple, best intention regEx for a 'valid' email
export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
