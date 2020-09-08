import { BaseModule } from '../base.module';
import { axios } from '../../helpers';

export class UsersModule extends BaseModule {
    public async getMetadata(): Promise<any> {
        this.checkApiKey();
        const cacheUser = localStorage.getItem('user');
        if (!cacheUser) {
            const user = await axios.get(`${this.iceteaId.endpoint}/users/info`);
            localStorage.setItem('user', JSON.stringify(user.data));
            return user.data;
        }
        return JSON.parse(cacheUser);
    }

    public async saveKey(privateKey: string, encryptionKey: string): Promise<any> {
        this.checkApiKey();
        return await axios.post(`${this.iceteaId.endpoint}/key/save`, {
            encryptionKey, privateKey
        });
    }

    public async sendOtp(channel: string, emailOrPhone: string): Promise<any> {
        return await axios.post(`${this.iceteaId.endpoint}/key/sendOtp`, {
            emailOrPhone,
            channel
        });
    }

    public async verifyOtp(otpCode: number, emailOrPhone:string, channel: string): Promise<any> {
        return await axios.post(`${this.iceteaId.endpoint}/key/verifyOtp`, {
            email: emailOrPhone,
            verifyCode: otpCode,
            channel,
        });
    }
}