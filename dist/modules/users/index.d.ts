import { BaseModule } from '../base.module';
export declare class UsersModule extends BaseModule {
    getMetadata(): Promise<any>;
    saveKey(privateKey: string, encryptionKey: string): Promise<any>;
    sendOtp(channel: string, emailOrPhone: string): Promise<any>;
    verifyOtp(otpCode: number, emailOrPhone: string, channel: string): Promise<any>;
}
