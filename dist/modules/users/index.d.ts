import { BaseModule } from '../base.module';
export declare class UsersModule extends BaseModule {
    getMetadata(): Promise<void>;
    saveKey(privateKey: string, encryptionKey: string): Promise<any>;
}
