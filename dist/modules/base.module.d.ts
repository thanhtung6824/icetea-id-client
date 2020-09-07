import IceteaId from '../main';
import { Exceptions } from '../main/exceptions';
export declare abstract class BaseModule {
    protected readonly iceteaId: IceteaId;
    constructor(iceteaId: IceteaId);
    checkApiKey(): Exceptions | undefined;
}
