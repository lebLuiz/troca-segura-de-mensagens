import Certificate from "./Certificate.interface";

export default interface SecurePackage {
  encryptedMessage: string;
  iv: string;
  encryptedKey: string;
  signature: string;
  messageHash: string;
  senderCertificate: Certificate;
}
