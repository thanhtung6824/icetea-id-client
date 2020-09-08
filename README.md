# Icetea Id Client


# Install
    npm install icetea-id-client --save

# Usage
```
import { IceteaId } from 'icetea-id-client';

const iceteaId = new IceteaId('SECRET_KEY'); 
```

# API
 ### Oauth
 ##### `login({provider: string, redirectUri: string})`
 Login with oauth2
```
<ButtonGoogle
    className="alreadyAcc"
    fullWidth
    onClick={() => iceteaId.oauth.login({
    provider: 'google', //for now just support only google, will update later
    redirectUri: redirectUrl
    })}
>
    Continue with Google
</ButtonGoogle>
=
```
 ### Crypto
 ##### `generateKey()`
 Generate random 256bit encryption key
```
 const encryptionKey = iceteaId.crypto.generateKey();
```
 ##### `encrypt(text: string, encryptionKey: string)`
 Encrypt a plain text with encryption key given
 ```
 const encryptedPrivateKey = iceteaId.crypto.encrypt(privateKey, encryptionKey);
```
 ##### `decrypt(cipherText: string, encryptionKey: string)`
  Decrypt a secret key to plain text with encryption key given
 ```
 const decryptedPrivateKey = iceteaId.crypto.decrypt(privateKey, decryptedEncryptionKey)
```
 ### AWS
 ##### `exchangeSessionCredential(bearerToken: string)`
 Exchange token get from `iceteaId.oauth.login` to get session credential to access kms
 ```
 const token = localStorage.getItem('credentials');
 const cognitoCredentials = await iceteaId.aws.exchangeSessionCredential(token)
```
 ##### `encrypt(credentials: CognitoIdentity.Types.GetCredentialsForIdentityResponse, plainText: string)`
 Encrypt a plain text with AWS KMS
 ```
 const encryptedEncryptionKey = await iceteaId.aws.encrypt(cognitoCredentials, encryptionKey);
 ```
 ##### `decrypt(credentials: CognitoIdentity.Types.GetCredentialsForIdentityResponse, cipherText: KMS.Types.CiphertextType)`
 Decrypt a secret text with AWS KMS
 ```
 const token = localStorage.getItem('credentials');
 const cognitoCredentials = await iceteaId.aws.exchangeSessionCredential(token)
 const decryptedEncryptionKey = await iceteaId.aws.decrypt(
 cognitoCredentials, response.data.encryptionKey
 )

 ```
 ### User
 ##### `getMetadata()`
 Return a current authenticate user (email, displayname,...)
 ```
 const user = await iceteaId.users.getMetadata();
```

 ##### `saveKey(privateKey: string, encryptionKey: string)`
 Save key to IceteaId after authenticate
 ```
 const saveKey = await iceteaId.users.saveKey(encryptedPrivateKey, encryptedEncryptionKey)
```

 ##### `sendOtp(channel: string, emailOrPhone: string)` 
 Send Otp to retrive encrypted privatekey and encrypted encryption key
 ```
 const response = await iceteaId.users.sendOtp('sms', phoneNumber); //for now just use sms for better performance
```
 ##### `verifyOtp(channel: string, emailOrPhone: string)` 
 Verify Otp to retrive encrypted privatekey and encrypted encryption key
 ```
   const response = await iceteaId.users.verifyOtp(otp, phoneNumber, 'sms');
   console.log(response.data.privateKey) //encrytped private key
   console.log(response.data.encryptionKey) // encrypted encryption key
```