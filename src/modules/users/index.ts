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

    public async sendOtp(email?: string): Promise<any> {
        let emailVerify: string = email;
        if (!emailVerify) {
            const user = await this.getMetadata();
            emailVerify = user.data.email;
        }
        return await axios.post(`${this.iceteaId.endpoint}/key/sendOtp`, {
            email: emailVerify
        });
    }

    public async verifyOtp(otpCode: number, email?:string): Promise<any> {
        let emailVerify: string = email;
        if (!emailVerify) {
            const user = await this.getMetadata();
            emailVerify = user.data.email;
        }
        return await axios.post(`${this.iceteaId.endpoint}/key/verifyOtp`, {
            email: emailVerify,
            verifyCode: otpCode,
        });
    }
}