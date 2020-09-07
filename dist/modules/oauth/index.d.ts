import { BaseModule } from '../base.module';
import { oauthLogin } from '../../types';
export declare class OauthModule extends BaseModule {
    login(payload: oauthLogin): Promise<void>;
    private getSecureToken;
}
