import { randomBytes } from "crypto";

const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz";
const ID_LENGTH = 8;

export function generateShortId(length = ID_LENGTH): string {
  const bytes = randomBytes(length);
  let output = "";

  for (let i = 0; i < length; i += 1) {
    output += ALPHABET[bytes[i] % ALPHABET.length];
  }

  return output;
}
