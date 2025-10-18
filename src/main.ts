import { CertificateAuthority } from "./classes/CertificateAuthority";
import { User } from "./classes/User";

import scenario1 from "./functions/scenario1";
import scenario2 from "./functions/scenario2";
import scenario3 from "./functions/scenario3";
import scenario4 from "./functions/scenario4";

function main(): void {
  console.log("#".repeat(70));
  console.log("SIMULANDO SISTEMA DE TROCA SEGURA DE MENSAGENS");
  console.log("#".repeat(70));

  console.log("\nCriando Autoridade Certificadora...");
  const ca = new CertificateAuthority();

  console.log("👧 Criando usuário Alice...");
  const alice = new User("Alice", ca);
  console.log("👦 Criando usuário Bob...");
  const bob = new User("Bob", ca);

  // ✅ Caminho feliz, sem adulteração
  scenario1({ alice, bob, ca });

  // 🚨 Caminho com adulteração da mensagem
  scenario2({ alice, bob, ca });

  // 🚨 Caminho com certificado adulterado
  scenario3({ alice, bob, ca });

  // ✅ Resposta de Bob para Alice
  scenario4({ alice, bob, ca });

  console.log("\n" + "#".repeat(70));
  console.log("✅ SIMULAÇÃO CONCLUÍDA");
  console.log("#".repeat(70));
}

main();
