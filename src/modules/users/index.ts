import { BaseModule } from '../base.module';
import { axios } from '../../helpers';

export class UsersModule extends BaseModule {
    public async getMetadata(): Promise<void> {
        this.checkApiKey();
        return await axios.get(`${this.iceteaId.endpoint}/users/info`);
    }

    public async saveKey(privateKey: string, encryptionKey: string): Promise<any> {
        this.checkApiKey();
        const save = await axios.post(`${this.iceteaId.endpoint}/key/save`, {
            encryptionKey, privateKey
        });
        console.log(save);
        return save;
    }
}