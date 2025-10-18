import PropsFnScenario from "../types/PropsFnScenario.interface";
import SecurePackage from "../types/SecurePackage.interface";

export default function scenario2({ alice, bob, ca }: PropsFnScenario): void {
  console.log("\n" + "#".repeat(70));
  console.log("🧭 CENÁRIO 2: Tentativa de adulteração da mensagem");
  console.log("#".repeat(70));

  const message2 = "Esta mensagem será adulterada!";
  console.log(`💬 Mensagem original: "${message2}"`);

  const package2: SecurePackage = alice.sendSecureMessage(
    message2,
    bob.certificate,
    ca
  );

  // Simula ataque: altera a mensagem criptografada
  console.log("🔴 ATACANTE adulterando a mensagem criptografada...");
  package2.encryptedMessage = Buffer.from("mensagem_adulterada").toString(
    "base64"
  );

  // Tenta receber a mensagem
  const result2 = bob.receiveSecureMessage(package2, ca);
}
