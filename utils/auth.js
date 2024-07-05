import { compare, hash } from "bcryptjs";

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  const verifiedPass = await compare(password, hashedPassword);
  return verifiedPass;
}

export { hashPassword, verifyPassword };
