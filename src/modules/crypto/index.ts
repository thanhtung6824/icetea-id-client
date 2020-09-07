import { BaseModule } from '../base.module';
import CryptoES from 'crypto-es/lib';

export class CryptoModule extends BaseModule {
    public generateKey(): string {
        this.checkApiKey();
        return CryptoES.lib.WordArray.random(32).toString(CryptoES.enc.Hex);
    }

    public encrypt(text: string, encryptionKey: string): string {
        this.checkApiKey();
        return CryptoES.AES.encrypt(text, encryptionKey).toString();
    }

    public decrypt(cipherText: string, encryptionKey: string): string {
        this.checkApiKey();
        return CryptoES.AES.decrypt(cipherText, encryptionKey).toString(CryptoES.enc.Utf8);
    }
}