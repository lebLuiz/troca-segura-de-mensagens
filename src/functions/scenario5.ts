import { CertificateAuthority } from "../classes/CertificateAuthority";
import { User } from "../classes/User";
import SecurePackage from "../types/SecurePackage.interface";

export default function scenario5() {
  console.log("\n" + "#".repeat(70));
  console.log("🧭 CENÁRIO 5: Tentativa com chave pública adulterada");
  console.log("#".repeat(70));
  console.log("\nCriando Autoridade Certificadora...");
  const ca = new CertificateAuthority();

  console.log("👧 Criando usuário Alice...");
  const alice = new User("Alice", ca);
  console.log("👦 Criando usuário Bob...");
  const bob = new User("Bob", ca);

  const message3 = "Oi bob, é a Alice!";
  console.log(`💬 Mensagem original: "${message3}"`);

  const package3: SecurePackage = alice.sendSecureMessage(
    message3,
    bob.certificate,
    ca
  );

  // Simula ataque: altera a chave pública
  console.log("🔴 ATACANTE adulterando a chave pública...");
  package3.senderCertificate.publicKey =
    "725202226e1a0a0dfb7c3cf16b53e283a22b0fdf9e19ea569f04a206c40dd5fb";

  const result3 = bob.receiveSecureMessage(package3, ca);
}
