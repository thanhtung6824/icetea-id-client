import { BaseModule } from '../base.module';
export declare class UsersModule extends BaseModule {
    getMetadata(): Promise<any>;
    saveKey(privateKey: string, encryptionKey: string): Promise<any>;
    sendOtp(email?: string): Promise<any>;
    verifyOtp(otpCode: number, email?: string): Promise<any>;
}
