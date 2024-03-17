import { promisify } from "util";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt, 64);
  return salt + ":" + derivedKey.toString("hex");
}
