/***********************
 * Types and Errors *
 ***********************/

export type HttpBody = Record<string, unknown>;

export enum DfnsAuthKind {
  ClientSide,
  ServerSide,
}

export enum ApiKind {
  Customer,
  Staff,
}

export enum RiskKind {
  NoAuth,
  AuthRequired,
  UserActionSignatureRequired,
}

export enum CredentialFactor {
  first = 'first',
  second = 'second',
  either = 'either',
}

export type CredentialTransports = string;

export type AllowCredential = {
  type: PubKeyCredType;
  id: string;
  transports?: CredentialTransports;
};

export type CreateUserLoginChallengeResponse = {
  supportedCredentialKinds: {
    kind: CredentialKind;
    factor: CredentialFactor;
    requiresSecondFactor: boolean;
  }[];
  challenge: string;
  challengeIdentifier: string;
  externalAuthenticationUrl: string;
  allowCredentials: {
    webauthn: AllowCredential[];
    key: AllowCredential[];
  };
};

export type UserCredentialOptions = {
  supportedCredentialKinds: {
    kind: CredentialKind;
    factor: CredentialFactor;
    requiresSecondFactor: boolean;
  }[];
  humanReadableChallenge: string;
  externalAuthenticationUrl: string;
  credentialData: {
    webAuthnClientData: WebAuthnChallenge;
    keyOrPasswordClientData: KeyClientData;
    allowedKeys: string[];
  };
};

export enum CredentialKind {
  Fido2 = 'Fido2',
  Key = 'Key',
  Password = 'Password',
  Totp = 'Totp',
  RecoveryKey = 'RecoveryKey',
}

export type UserActionSignatureOptions =
  | AuthenticationOptionsPassword
  | AuthenticationOptionsFido2
  | AuthenticationOptionsKey;

export type AuthenticationOptions =
  | AuthenticationOptionsPassword
  | AuthenticationOptionsFido2
  | AuthenticationOptionsKey;

export type ChallengeInfo = {
  challenge: string;
  challengeIdentifier: string;
  authenticationCode?: string;
};

export type AuthenticationOptionsPassword = ChallengeInfo & {
  kind: CredentialKind.Password;
};

export type AuthenticationOptionsKeyBase = ChallengeInfo & {
  allowCredentials: {
    type: PubKeyCredType;
    id: string;
    transports: string[];
  }[];
};

export type AuthenticationOptionsFido2 = AuthenticationOptionsKeyBase & {
  kind: CredentialKind.Fido2;
};

export type AuthenticationOptionsKey = AuthenticationOptionsKeyBase & {
  kind: CredentialKind.Key;
};

export type PubKeyCredType = string;

export type SignMessage = (
  message: Buffer,
  humanReadableMessage: string,
  keyId: string,
) => Promise<Buffer>;

export type ConfirmUserActionInput =
  | AuthenticateUserPasswordInput
  | AuthenticateUserFido2Input
  | AuthenticateUserKeyInput;

export declare type AuthenticateUserInput =
  | AuthenticateUserPasswordInput
  | AuthenticateUserFido2Input
  | AuthenticateUserKeyInput;

export type AuthenticateUserPasswordInput = {
  kind: CredentialKind.Password;
  password: string;
};

export type AuthenticateUserFido2Input = {
  kind: CredentialKind.Fido2;
  credentialAssertion: {
    credId: string;
    clientData: string;
    authenticatorData: string;
    signature: string;
    userHandle: string;
  };
};

export type AuthenticateUserKeyInput = {
  kind: CredentialKind.Key;
  credentialAssertion: {
    credId: string;
    clientData: string;
    signature: string;
  };
};

export type AuthenticateUserInitInput = {
  username: string;
  orgId: string;
};

export type AuthenticationResponse = {
  token: string;
};

export type CredentialSignature = {
  authenticatorData: ArrayBuffer;
  clientDataJson: ArrayBuffer;
  signature: ArrayBuffer;
  userHandle: ArrayBuffer;
};

export const noSignFnProvided = (message: Buffer) => {
  throw `Signature Function is not set. Unable to sign ${message.toString(
    'ascii',
  )}`;
};

export const noGetUserCredentialsFnProvided = () => {
  throw 'Get User Credentials Function is not set.';
};

export const noCreateUserCredentialsFnProvided = () => {
  throw 'Create User Credentials Function is not set.';
};

export enum WebAuthnChallengeKind {
  Create = 'create',
  Get = 'get',
}

export type WebAuthnCreateCredentialChallenge = {
  kind: WebAuthnChallengeKind.Create;
  creationOptions: CredentialCreationOptions;
};

export type WebAuthnGetCredentialChallenge = {
  kind: WebAuthnChallengeKind.Get;
  requestOptions: CredentialRequestOptions;
};

export type WebAuthnChallenge =
  | WebAuthnGetCredentialChallenge
  | WebAuthnCreateCredentialChallenge;

export type SignWebAuthnChallenge = (
  challenge: WebAuthnChallenge,
) => Promise<PublicKeyCredential>;

export type KeyClientData = {
  type: 'key.get' | 'key.create';
  challenge: string;
  origin: string;
  crossOrigin?: boolean;
};

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type UserActionSignatureInput = {
  userActionHttpMethod: string;
  userActionHttpPath: string;
  userActionPayload: string;
  userActionServerKind?: string;
};

export type UserActionResponse = {
  userAction: string;
};

export type SupportedCredentialKinds = {
  firstFactor: CredentialKind[];
  secondFactor: CredentialKind[];
};

export type UserCredentials = {
  firstFactor: {
    kind: CredentialKind.Fido2 | CredentialKind.Key | CredentialKind.Password;
    credentialId: string;
    signature: CredentialSignature;
  };
  secondFactor?:
    | {
        kind: CredentialKind.Totp;
        credentialId: string;
        otpCode: string;
      }
    | {
        kind: CredentialKind.Fido2 | CredentialKind.Key;
        credentialId: string;
        signature: CredentialSignature;
      };
};

export type CreateUserCredentialOptions = {
  supportedCredentialKinds: SupportedCredentialKinds;
  credentialData: {
    webAuthnClientData: WebAuthnChallenge;
    keyOrPasswordClientData: KeyClientData;
  };
};

export type NewCredentialSignature = {
  clientData: ArrayBuffer;
  attestationData: ArrayBuffer;
};

export type NewUserCredentials = {
  firstFactor?: {
    kind: CredentialKind.Fido2 | CredentialKind.Key | CredentialKind.Password;
    credentialId: string;
    signature: NewCredentialSignature;
  };
  secondFactor?:
    | {
        kind: CredentialKind.Totp;
        credentialId: string;
        otpCode: string;
      }
    | {
        kind: CredentialKind.Fido2 | CredentialKind.Key;
        credentialId: string;
        signature: NewCredentialSignature;
      };
};

export type GetUserCredentials = (
  supportedCredentials: UserCredentialOptions,
) => Promise<UserCredentials>;
export type CreateUserCredentials = (
  supportedCredentials: CreateUserCredentialOptions,
) => Promise<NewUserCredentials>;

export type AuthenticateUserTotpInput = {
  kind: CredentialKind.Totp;
  otpCode: string;
};

export type AuthenticateUserFirstFactorInput =
  | AuthenticateUserPasswordInput
  | AuthenticateUserFido2Input
  | AuthenticateUserKeyInput;

export type AuthenticateUserSecondFactorInput =
  | AuthenticateUserTotpInput
  | AuthenticateUserFido2Input
  | AuthenticateUserKeyInput;

export type CreateUserLoginInput = {
  challengeIdentifier: string;
  firstFactor: AuthenticateUserFirstFactorInput;
  secondFactor?: AuthenticateUserSecondFactorInput;
};

export type InitUserRegistrationInput = {
  username: string;
  registrationCode: string;
  orgId: string;
};
export type CreateUserRegistrationChallengeResponse = {
  rp: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    displayName: string;
    name: string;
  };
  temporaryAuthenticationToken: string;
  challenge: string;
  pubKeyCredParams: { type: 'public-key'; alg: number }[];
  excludeCredentials: {
    type: 'public-key';
    id: string;
    transports: CredentialTransports[];
  }[];
  authenticatorSelection: {
    authenticatorAttachment?: 'platform' | 'cross-platform';
    residentKey: 'discouraged' | 'preferred' | 'required';
    requireResidentKey: boolean;
    userVerification: 'required' | 'preferred' | 'discouraged';
  };
  attestation: Attestation;
  otpUrl: string;
  supportedCredentialKinds: {
    firstFactor: CredentialKind[];
    secondFactor: CredentialKind[];
  };
};

export enum Attestation {
  None = 'none',
  Indirect = 'indirect',
  Direct = 'direct',
  Enterprise = 'enterprise',
}

export type Fido2Options = UserRegistrationBase & {
  kind: CredentialKind.Fido2;
  challenge: string;
  pubKeyCredParams: { type: 'public-key'; alg: number }[];
  excludeCredentials: {
    type: 'public-key';
    id: string;
    transports: CredentialTransports[];
  }[];
  authenticatorSelection: {
    authenticatorAttachment?: 'platform' | 'cross-platform';
    residentKey: 'discouraged' | 'preferred' | 'required';
    requireResidentKey: boolean;
    userVerification: 'required' | 'preferred' | 'discouraged';
  };
  attestation: 'none' | 'indirect' | 'direct' | 'enterprise';
};

export type UserRegistrationBase = {
  rp: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    displayName: string;
    name: string;
  };
  temporaryAuthenticationToken: string;
};

export type PublicKeyOptions = UserRegistrationBase & {
  kind: CredentialKind.Key;
  challenge: string;
  pubKeyCredParams: { type: PubKeyCredType; alg: number }[];
  attestation: Attestation;
};

export type PasswordRegistration = UserRegistrationBase & {
  kind: CredentialKind.Password;
  otpUrl: string;
};

export type CredentialAsssertion = {
  credId: string;
  clientData: string;
  attestationData: string;
};

export type RegistrationConfirmationFido2 = {
  credentialKind: CredentialKind.Fido2;
  credentialInfo: CredentialAsssertion;
};

export type RegistrationConfirmationPublicKey = {
  credentialKind: CredentialKind.Key;
  credentialInfo: CredentialAsssertion;
};

export type RegistrationConfirmationPassword = {
  credentialKind: CredentialKind.Password;
  credentialInfo: {
    password: string;
  };
};

export type RegistrationConfirmationTotp = {
  credentialKind: CredentialKind.Totp;
  credentialInfo: {
    otpCode: string;
  };
};

export type RegistrationFirstFactor =
  | RegistrationConfirmationPassword
  | RegistrationConfirmationPublicKey
  | RegistrationConfirmationFido2;

export type RegistrationSecondFactor =
  | RegistrationConfirmationPublicKey
  | RegistrationConfirmationFido2
  | RegistrationConfirmationTotp;

export type ConfirmRegistrationInput = {
  firstFactorCredential: RegistrationFirstFactor;
  secondFactorCredential?: RegistrationSecondFactor;
};

export type UserCreationInfo = {
  credential: {
    uuid: string;
    kind: CredentialKind;
    name: string;
  };
  user: {
    id: string;
    username: string;
    orgId: string;
  };
};

export type TotpCredential = {
  temporaryAuthenticationToken: string;
  rp: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    displayName: string;
    name: string;
  };
  kind: CredentialKind.Totp;
  otpUrl: string;
};

export type PasswordCredential = {
  temporaryAuthenticationToken: string;
  rp: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    displayName: string;
    name: string;
  };
  kind: CredentialKind.Password;
};

export type CreateUserCredentialChallengeInput = {
  kind: CredentialKind;
};

export type UserCredentialChallenge =
  | Fido2Options
  | PublicKeyOptions
  | TotpCredential
  | PasswordCredential;

export type TotpCredentialInformation = {
  otpCode: string;
};

export type CreateUserCredentialTotpInput = {
  challengeIdentifier: string;
  credentialName: string;
  credentialKind: CredentialKind.Totp;
  credentialInfo: TotpCredentialInformation;
};

export type PasswordCredentialInformation = {
  password: string;
};

export type CreateUserCredentialPasswordInput = {
  credentialKind: CredentialKind.Password;
  credentialInfo: PasswordCredentialInformation;
  challengeIdentifier: string;
  credentialName: string;
};

export type CredentialAssertion = {
  credId: string;
  clientData: string;
  attestationData: string;
};

export type CreateUserCredentialPublicKeyInput = {
  challengeIdentifier: string;
  credentialName: string;
  credentialKind: CredentialKind.Key;
  credentialInfo: CredentialAssertion;
};

export type CreateUserCredentialFido2Input = {
  credentialKind: CredentialKind.Fido2;
  credentialInfo: CredentialAssertion;
  challengeIdentifier: string;
  credentialName: string;
};

export type CreateUserCredentialInput =
  | CreateUserCredentialTotpInput
  | CreateUserCredentialPasswordInput
  | CreateUserCredentialPublicKeyInput
  | CreateUserCredentialFido2Input;

export type CredentialInfo = {
  credentialId: string;
  credentialUuid: string;
  dateCreated: string;
  isActive: boolean;
  kind: CredentialKind;
  name: string;
  publicKey?: string;
  relyingPartyId: string;
  origin: string;
};

export enum AuthenticatorRequirementOptions {
  required = 'required',
  preferred = 'preferred',
  discouraged = 'discouraged',
}

export enum AuthenticatorAttestationOptions {
  none = 'none',
  indirect = 'indirect',
  direct = 'direct',
  enterprise = 'enterprise',
}

export type AuthenticatorSelection = {
  authenticatorAttachment?: string;
  residentKey: AuthenticatorRequirementOptions;
  requireResidentKey: boolean;
  userVerification: AuthenticatorRequirementOptions;
};

export type PubKeyCredParams = {
  type: string;
  alg: number;
};

export type UserRegistrationChallenge = {
  temporaryAuthenticationToken: string;
  rp: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    displayName: string;
    name: string;
  };
  supportedCredentialKinds: SupportedCredentialKinds;
  otpUrl: string;
  challenge: string;
  authenticatorSelection: AuthenticatorSelection;
  attestation: AuthenticatorAttestationOptions;
  pubKeyCredParams: PubKeyCredParams[];
  excludeCredentials: AllowCredential[];
};
