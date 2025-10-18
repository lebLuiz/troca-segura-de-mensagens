export default interface Certificate {
  version: string;
  serialNumber: string;
  subject: string;
  publicKey: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  signature?: string;
}
