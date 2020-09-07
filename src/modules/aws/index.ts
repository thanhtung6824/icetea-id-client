import { BaseModule } from '../base.module';
import { config, CognitoIdentity, KMS } from 'aws-sdk';
import { malformedToken } from '../../main/exceptions';

config.region = 'us-east-1';

export class AWSModule extends BaseModule {
    private readonly identityPoolId: string = 'us-east-1:f8c321fa-4673-4bfc-8597-0256e5f56181';
    private readonly cognitoProvider: string = 'cognito-idp.us-east-1.amazonaws.com/us-east-1_JmRLSqweA';
    private readonly kmsKeyId: string = 'arn:aws:kms:us-east-1:855532593761:key/091ac5d3-f4c0-445a-a63a-c4bb60bb0dbe';
    private readonly encryptAlgorithm: string = 'RSAES_OAEP_SHA_256';

    public async exchangeSessionCredential(bearerToken: string): Promise<CognitoIdentity.Types.GetCredentialsForIdentityResponse> {
        if (!bearerToken || !bearerToken.startsWith('Bearer')) {
            throw malformedToken();
        }
        try {
            const token = bearerToken.replace('Bearer', '').trim();
            const cognitoIdentity = new CognitoIdentity;
            const cognitoId = await cognitoIdentity.getId({
                IdentityPoolId: this.identityPoolId,
                Logins: {
                    [this.cognitoProvider]: token
                },
            }).promise();

            return await cognitoIdentity.getCredentialsForIdentity({
                IdentityId: cognitoId.IdentityId,
                Logins: {
                    [this.cognitoProvider]: token
                },
            }).promise();
        } catch (err) {
            console.log(err);
        }
    }

    public async encrypt(credentials: CognitoIdentity.Types.GetCredentialsForIdentityResponse, plainText: string): Promise<string> {
        const kms = new KMS({
            accessKeyId: credentials.Credentials.AccessKeyId,
            secretAccessKey: credentials.Credentials.SecretKey,
            sessionToken: credentials.Credentials.SessionToken,
        });
        const encrypted = await kms.encrypt({
            KeyId: this.kmsKeyId, // your key alias or full ARN key
            Plaintext: plainText, // your super secret.
            EncryptionAlgorithm: this.encryptAlgorithm,
        }).promise();
        return encrypted.CiphertextBlob.toString('base64');
    }

    public async decrypt(credentials: CognitoIdentity.Types.GetCredentialsForIdentityResponse, cipherText: KMS.Types.CiphertextType): Promise<string> {
        const kms = new KMS({
            accessKeyId: credentials.Credentials.AccessKeyId,
            secretAccessKey: credentials.Credentials.SecretKey,
            sessionToken: credentials.Credentials.SessionToken,
        });
        const decrypted = await kms.decrypt({
            KeyId: this.kmsKeyId, // your key alias or full ARN key
            CiphertextBlob: new Buffer(cipherText as string, 'base64'),
            EncryptionAlgorithm: this.encryptAlgorithm,
        }).promise();
        return decrypted.Plaintext.toString('ascii');
    }
}