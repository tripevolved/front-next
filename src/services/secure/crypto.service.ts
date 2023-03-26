import { toJson } from "@/helpers/json.helpers";
import SimpleCrypto from "simple-crypto-js";

const SECRET = "trip-secret";
const simpleCrypto = new SimpleCrypto(SECRET);

export const CryptoService = {
  encrypt: (data: object) => simpleCrypto.encrypt(JSON.stringify(data)),
  decrypt: (value: string) => toJson(simpleCrypto.decrypt(value)),
}
