import { BaseModule } from '../base.module';
import { axios } from '../../helpers';
import { oauthLogin } from '../../types';

export class OauthModule extends BaseModule {
    public login(payload: oauthLogin): Promise<void> {
        this.checkApiKey();
        return new Promise(async (resolve, reject) => {
            const loginWin = window.open(`${this.iceteaId.endpoint}/login/${payload.provider}`, '', 'scrollbars=1,height=500,width=500,left=500,top=100');
            const timer = setInterval(async () => {
                if (loginWin.closed) {
                    clearInterval(timer);
                    const data = await this.getSecureToken();
                    const token = data.data;
                    localStorage.setItem('credentials', token);
                    resolve(token);
                    window.location.href = payload.redirectUri;
                }
            }, 1000);
        });
    }

    private async getSecureToken() : Promise<any> {
        return await axios.get(`${this.iceteaId.endpoint}/oauth/me`);
    }

}