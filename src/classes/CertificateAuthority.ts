import crypto, { KeyObject } from "crypto";
import Certificate from "../types/Certificate.interface";

// Classe para gerenciar certificados digitais
export class CertificateAuthority {
  private caPrivateKey: KeyObject;
  private caPublicKey: KeyObject;

  constructor() {
    /**
     * @description Chave privada da Autoridade Certificadora (CA)
     * @method generateKeyPairSync - Gera um par de chaves com Criptografia Assimétrica (RSA)
     */
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });
    this.caPrivateKey = privateKey;
    this.caPublicKey = publicKey;
  }

  /**
   * @description Emite um certificado digital para um usuário
   */
  public issueCertificate(
    userName: string,
    userPublicKey: KeyObject
  ): Certificate {
    const certificate: Omit<Certificate, "signature"> = {
      version: "1.0",
      serialNumber: crypto.randomBytes(16).toString("hex"),
      subject: userName,
      publicKey: userPublicKey.export({
        type: "spki",
        format: "pem",
      }) as string,
      issuer: "CA-SecureMessaging",
      validFrom: new Date().toISOString(),
      // Validade de 1 ano
      validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };

    // Assina o certificado com a chave privada da CA
    const certString = JSON.stringify(certificate);
    const signature = crypto.sign(
      "sha256",
      Buffer.from(certString),
      this.caPrivateKey
    );

    return {
      ...certificate,
      signature: signature.toString("base64"),
    };
  }

  /**
   * @description Valida um certificado digital
   */
  public validateCertificate(certificate: Certificate): boolean {
    try {
      const { signature, ...certData } = certificate;

      if (!signature) return false;

      const certString = JSON.stringify(certData);

      const isValid = crypto.verify(
        "sha256",
        Buffer.from(certString),
        this.caPublicKey,
        Buffer.from(signature, "base64")
      );

      // Verificando a validade temporal
      const now = new Date();
      const validFrom = new Date(certData.validFrom);
      const validTo = new Date(certData.validTo);

      return isValid && now >= validFrom && now <= validTo;
    } catch (error) {
      return false;
    }
  }
}
