export function validateCpf(cpf: string) {
  if (!cpf) return;
  cpf = cpf?.replace(/[^\d]+/g, "");

  if (cpf.match(/(\d)\1{10}/)) {
    return false;
  }

  let sum = 0;
  let rest = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  rest = 11 - (sum % 11);
  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  rest = 11 - (sum % 11);
  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.charAt(10))) return false;
  return true;
}
