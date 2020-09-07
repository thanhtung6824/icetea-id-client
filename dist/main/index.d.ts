import { UsersModule } from '../modules/users';
import { OauthModule } from '../modules/oauth';
import { CryptoModule } from '../modules/crypto';
import { AWSModule } from '../modules/aws';
export default class IceteaId {
    readonly secretApiKey?: string;
    readonly users: UsersModule;
    readonly oauth: OauthModule;
    readonly crypto: CryptoModule;
    readonly aws: AWSModule;
    readonly endpoint: string;
    constructor(secretApiKey?: string);
}
