export const generateRandomCode = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  let code = '';

  for (let i = 0; i < 3; i++) {
    code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  for (let i = 0; i < 3; i++) {
    code += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return code;
};
