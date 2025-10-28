import { CertificateAuthority } from "../classes/CertificateAuthority";
import { User } from "../classes/User";
import SecurePackage from "../types/SecurePackage.interface";

export default function scenario3() {
  console.log("\n" + "#".repeat(70));
  console.log("🧭 CENÁRIO 3: Tentativa com certificado adulterado");
  console.log("#".repeat(70));
  console.log("\nCriando Autoridade Certificadora...");
  const ca = new CertificateAuthority();

  console.log("👧 Criando usuário Alice...");
  const alice = new User("Alice", ca);
  console.log("👦 Criando usuário Bob...");
  const bob = new User("Bob", ca);

  const message3 = "Mensagem com certificado inválido";
  console.log(`💬 Mensagem original: "${message3}"`);

  const package3: SecurePackage = alice.sendSecureMessage(
    message3,
    bob.certificate,
    ca
  );

  // Simula ataque: altera o certificado
  console.log("🔴 ATACANTE adulterando o certificado digital...");
  package3.senderCertificate.subject = "Eve (Impostor)";

  const result3 = bob.receiveSecureMessage(package3, ca);
}
