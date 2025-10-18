import crypto, { KeyObject } from "crypto";
import Certificate from "../types/Certificate.interface";
import SecurePackage from "../types/SecurePackage.interface";
import MessageResult from "../types/MessageResult.interface";
import { CertificateAuthority } from "./CertificateAuthority";

/**
 * @description Classe para representar um usuário de trocas de mensagens seguras. Nesse caso: 'Alice' e 'Bob'
 */
export class User {
  public name: string;
  private publicKey: KeyObject;
  private privateKey: KeyObject;
  public certificate: Certificate;

  constructor(name: string, ca: CertificateAuthority) {
    this.name = name;

    // Gera par de chaves RSA (assimétrica)
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });
    this.publicKey = publicKey;
    this.privateKey = privateKey;

    // Solicita certificado digital da CA
    this.certificate = ca.issueCertificate(name, publicKey);
  }

  /**
   * @description Envia mensagem segura para outro usuário
   * @param message - Mensagem a ser enviada
   * @param recipientCertificate - Certificado digital do destinatário
   * @param ca - Autoridade Certificadora para validação de certificados
   * @returns - Pacote seguro contendo a mensagem criptografada, chave criptografada, assinatura, etc.
   */
  public sendSecureMessage(
    message: string,
    recipientCertificate: Certificate,
    ca: CertificateAuthority
  ): SecurePackage {
    console.log(
      `\n📤 ${this.name} está enviando mensagem para ${recipientCertificate.subject}...`
    );

    // 1. Valida o certificado do destinatário
    if (!ca.validateCertificate(recipientCertificate))
      throw new Error("❌ Certificado do destinatário inválido!");

    console.log("✅ Certificado do destinatário validado");

    // 2. Gera chave simétrica AES aleatória (256 bits)
    const symmetricKey = crypto.randomBytes(32);
    console.log(
      `🔑 Chave simétrica AES gerada: ${symmetricKey
        .toString("hex")
        .substring(0, 20)}...`
    );

    // 3. Criptografa a mensagem com AES (criptografia simétrica)
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", symmetricKey, iv);
    let encryptedMessage = cipher.update(message, "utf8", "base64");
    encryptedMessage += cipher.final("base64");
    console.log("🔒 Mensagem criptografada com AES");

    // 4. Calcula hash (SHA-256) da mensagem original para verificação de integridade
    const messageHash = crypto
      .createHash("sha256")
      .update(message)
      .digest("hex");
    console.log(
      `#️⃣  Hash SHA-256 calculado: ${messageHash.substring(0, 20)}...`
    );

    // 5. Cria assinatura digital (assina o hash com chave privada do remetente)
    const signature = crypto.sign(
      "sha256",
      Buffer.from(messageHash),
      this.privateKey
    );
    console.log("✍️  Assinatura digital criada");

    // 6. Criptografa a chave simétrica com a chave pública do destinatário (RSA)
    const recipientPublicKey = crypto.createPublicKey(
      recipientCertificate.publicKey
    );
    const encryptedKey = crypto.publicEncrypt(
      {
        key: recipientPublicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      symmetricKey
    );
    console.log("🔐 Chave simétrica criptografada com RSA");

    // 7. Monta o pacote completo
    const securePackage: SecurePackage = {
      encryptedMessage,
      iv: iv.toString("base64"),
      encryptedKey: encryptedKey.toString("base64"),
      signature: signature.toString("base64"),
      messageHash,
      senderCertificate: this.certificate,
    };

    console.log("📦 Pacote seguro montado e pronto para envio\n");
    return securePackage;
  }

  /**
   * @description Recebe e descriptografa mensagem segura
   * @param securePackage - Pacote seguro contendo a mensagem criptografada, chave criptografada, assinatura, etc.
   * @param ca - Autoridade Certificadora para validação de certificados
   * @returns - Resultado da operação de recebimento da mensagem
   */
  public receiveSecureMessage(
    securePackage: SecurePackage,
    ca: CertificateAuthority
  ): MessageResult {
    console.log(
      `\n📥 ${this.name} recebendo mensagem de ${securePackage.senderCertificate.subject}...`
    );

    try {
      // 1. Valida o certificado do remetente
      if (!ca.validateCertificate(securePackage.senderCertificate))
        throw new Error("❌ Certificado do remetente inválido!");

      console.log("✅ Certificado do remetente validado");

      // 2. Descriptografa a chave simétrica com chave privada do destinatário (RSA)
      const encryptedKey = Buffer.from(securePackage.encryptedKey, "base64");
      const symmetricKey = crypto.privateDecrypt(
        {
          key: this.privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        encryptedKey
      );
      console.log("🔓 Chave simétrica descriptografada com RSA");

      // 3. Descriptografa a mensagem com AES
      const iv = Buffer.from(securePackage.iv, "base64");
      const decipher = crypto.createDecipheriv("aes-256-cbc", symmetricKey, iv);
      let decryptedMessage = decipher.update(
        securePackage.encryptedMessage,
        "base64",
        "utf8"
      );
      decryptedMessage += decipher.final("utf8");
      console.log("🔓 Mensagem descriptografada com AES");

      // 4. Verifica a integridade (recalcula o hash)
      const calculatedHash = crypto
        .createHash("sha256")
        .update(decryptedMessage)
        .digest("hex");
      if (calculatedHash !== securePackage.messageHash)
        throw new Error("❌ Integridade comprometida! Hash não corresponde.");

      console.log("✅ Integridade verificada (hash corresponde)");

      // 5. Verifica a assinatura digital
      const senderPublicKey = crypto.createPublicKey(
        securePackage.senderCertificate.publicKey
      );
      const signatureValid = crypto.verify(
        "sha256",
        Buffer.from(securePackage.messageHash),
        senderPublicKey,
        Buffer.from(securePackage.signature, "base64")
      );

      if (!signatureValid) throw new Error("❌ Assinatura digital inválida!");

      console.log("✅ Assinatura digital verificada");
      console.log("\n🎉 MENSAGEM RECEBIDA COM SUCESSO!\n");
      return {
        success: true,
        message: decryptedMessage,
        sender: securePackage.senderCertificate.subject,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.log(`\n❌ ERRO: ${errorMessage}\n`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}
