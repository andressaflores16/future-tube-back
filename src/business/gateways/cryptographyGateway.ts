export interface CryptographyGateway {
  encrypt(word: string): Promise<string>;
  compare(word: string, hash: string): Promise<boolean>;
}
