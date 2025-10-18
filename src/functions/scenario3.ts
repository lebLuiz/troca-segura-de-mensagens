import PropsFnScenario from "../types/PropsFnScenario.interface";
import SecurePackage from "../types/SecurePackage.interface";

export default function scenario3({ alice, bob, ca }: PropsFnScenario) {
  console.log("\n" + "#".repeat(70));
  console.log("🧭 CENÁRIO 3: Tentativa com certificado adulterado");
  console.log("#".repeat(70));

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
