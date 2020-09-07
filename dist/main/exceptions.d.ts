import { ErrorCode } from '../types';
export declare class Exceptions extends Error {
    code: ErrorCode;
    constructor(code: ErrorCode, message: string);
}
export declare function missingApiKeyError(): Exceptions;
export declare function malformedToken(): Exceptions;
