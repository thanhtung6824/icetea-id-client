import { ErrorCode } from '../types';

export class Exceptions extends Error{
    constructor(public code: ErrorCode, message: string) {
        super(`IceteaId Error: [${code}] ${message}`);
        Object.setPrototypeOf(this, Exceptions.prototype);
    }
}

export function missingApiKeyError(): Exceptions {
    return new Exceptions(
        ErrorCode.ApiKeyMissing,
        'Please provide a secret key.',
    );
}

export function malformedToken(): Exceptions {
    return new Exceptions(
        ErrorCode.TokenMalformed,
        'Please provide a token.',
    );

}
