import { CryptographyGateway } from "../business/gateways/cryptographyGateway";
import * as bcrypt from "bcryptjs";

export class BcryptService implements CryptographyGateway {
  private static BCRYPT_SALTS_ROUND = Number(process.env.SALTS_ROUND || "0");

  async encrypt(word: string): Promise<string> {
    const generatedSalt = await bcrypt.genSalt(
      BcryptService.BCRYPT_SALTS_ROUND
    );
    const result = await bcrypt.hash(word, generatedSalt);
    return result;
  }

  async compare(word: string, hash: string): Promise<boolean> {
    return bcrypt.compare(word, hash);
  }
}
