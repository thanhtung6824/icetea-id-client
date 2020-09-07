import { BaseModule } from '../base.module';
import { CognitoIdentity, KMS } from 'aws-sdk';
export declare class AWSModule extends BaseModule {
    private readonly identityPoolId;
    private readonly cognitoProvider;
    private readonly kmsKeyId;
    private readonly encryptAlgorithm;
    exchangeSessionCredential(bearerToken: string): Promise<CognitoIdentity.Types.GetCredentialsForIdentityResponse>;
    encrypt(credentials: CognitoIdentity.Types.GetCredentialsForIdentityResponse, plainText: string): Promise<string>;
    decrypt(credentials: CognitoIdentity.Types.GetCredentialsForIdentityResponse, cipherText: KMS.Types.CiphertextType): Promise<string>;
}
