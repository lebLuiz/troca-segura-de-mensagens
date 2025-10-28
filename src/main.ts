import scenario1 from "./functions/scenario1";
import scenario2 from "./functions/scenario2";
import scenario3 from "./functions/scenario3";
import scenario4 from "./functions/scenario4";

function main(): void {
  console.log("#".repeat(70));
  console.log("SIMULANDO SISTEMA DE TROCA SEGURA DE MENSAGENS");
  console.log("#".repeat(70));

  // ✅ Caminho feliz, sem adulteração
  scenario1();

  // 🚨 Caminho com adulteração da mensagem
  scenario2();

  // 🚨 Caminho com certificado adulterado
  scenario3();

  // ✅ Resposta de Bob para Alice
  scenario4();

  console.log("\n" + "#".repeat(70));
  console.log("✅ SIMULAÇÃO CONCLUÍDA");
  console.log("#".repeat(70));
}

main();
