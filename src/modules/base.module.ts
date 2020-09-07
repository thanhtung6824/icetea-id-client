import IceteaId from '../main';
import { Exceptions, missingApiKeyError } from '../main/exceptions';

export abstract class BaseModule {
    constructor(protected readonly iceteaId: IceteaId) {
    }
    
    public checkApiKey(): Exceptions | undefined {
        if (!this.iceteaId.secretApiKey) throw missingApiKeyError();
        return;
    }
}
