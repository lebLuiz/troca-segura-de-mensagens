import PropsFnScenario from "../types/PropsFnScenario.interface";

export default function scenario4({ alice, bob, ca }: PropsFnScenario): void {
  console.log("\n" + "#".repeat(70));
  console.log("🧭 CENÁRIO 4: Bob enviando resposta para Alice");
  console.log("#".repeat(70));

  const replyMessage = "Oi Alice! Recebi sua mensagem com segurança. 👍";
  console.log(`💬 Mensagem de resposta: "${replyMessage}"`);

  const replyPackage = bob.sendSecureMessage(
    replyMessage,
    alice.certificate,
    ca
  );
  const result4 = alice.receiveSecureMessage(replyPackage, ca);

  if (result4.success) {
    console.log(`📨 Mensagem recebida: "${result4.message}"`);
    console.log(`👤 Remetente autenticado: ${result4.sender}`);
  }
}
