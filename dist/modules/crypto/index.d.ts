import { BaseModule } from '../base.module';
export declare class CryptoModule extends BaseModule {
    generateKey(): string;
    encrypt(text: string, encryptionKey: string): string;
    decrypt(cipherText: string, encryptionKey: string): string;
}
