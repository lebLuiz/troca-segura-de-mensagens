import { CertificateAuthority } from "../classes/CertificateAuthority";
import { User } from "../classes/User";

export default function scenario1(): void {
  console.log("\n" + "#".repeat(70));
  console.log("🧭 CENÁRIO 1: Envio normal de mensagem");
  console.log("#".repeat(70));
  console.log("\nCriando Autoridade Certificadora...");
  const ca = new CertificateAuthority();

  console.log("👧 Criando usuário Alice...");
  const alice = new User("Alice", ca);
  console.log("👦 Criando usuário Bob...");
  const bob = new User("Bob", ca);

  const originalMessage = "Olá Bob! Esta é uma mensagem ultra secreta. 🔒";
  console.log(`💬 Mensagem original: "${originalMessage}"`);

  // Alice envia mensagem segura para Bob
  const securePackage = alice.sendSecureMessage(
    originalMessage,
    bob.certificate,
    ca
  );
  const result1 = bob.receiveSecureMessage(securePackage, ca);

  if (result1.success) {
    console.log(`📨 Mensagem recebida: "${result1.message}"`);
    console.log(`👤 Remetente autenticado: ${result1.sender}`);
  }
}
