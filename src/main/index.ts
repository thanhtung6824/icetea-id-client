import { UsersModule } from '../modules/users';
import { OauthModule } from '../modules/oauth';
import { CryptoModule } from '../modules/crypto';
import { AWSModule } from '../modules/aws';

export default class IceteaId {
    public readonly users: UsersModule;
    public readonly oauth: OauthModule
    public readonly crypto: CryptoModule;
    public readonly aws: AWSModule;
    public readonly endpoint: string = 'http://localhost:3001';

    constructor(public readonly secretApiKey?: string) {
        // Assign API Modules
        this.users = new UsersModule(this);
        this.oauth = new OauthModule(this);
        this.crypto = new CryptoModule(this);
        this.aws = new AWSModule(this);
    }
}