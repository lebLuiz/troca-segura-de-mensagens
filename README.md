# Sistema de Troca Segura de Mensagens
Este projeto implementa um sistema de mensagens seguras utilizando criptografia assimétrica (RSA), criptografia simétrica (AES), certificados digitais e assinaturas digitais.

## Funcionalidades

### 🏛️ Autoridade Certificadora (CA)
- Emissão de certificados digitais
- Validação de certificados
- Verificação de validade temporal

### 👤 Usuários
- Geração de par de chaves RSA (2048 bits)
- Envio de mensagens seguras
- Recebimento e descriptografia de mensagens
- Verificação de integridade e autenticidade

### 🔐 Segurança Implementada
- **Hash SHA-256**: Verificação de integridade da mensagem
- **AES-256**: Criptografia simétrica da mensagem
- **RSA-2048**: Criptografia assimétrica da chave simétrica
- **Assinatura Digital**: Autenticação do remetente
- **Certificado Digital**: Validação da identidade

## Estrutura do Projeto
```
trabalho-1/
├── .nvmrc                          # Versão do Node.js (v20.*)
├── package.json                    # Dependências e scripts do projeto
├── tsconfig.json                   # Configuração do TypeScript
├── README.md                       # Documentação do projeto
│
└── src/
    ├── main.ts                     # Ponto de entrada - Executa os cenários
    │
    ├── classes/                    # Classes principais
    │   ├── CertificateAuthority.ts # Gerenciamento de certificados digitais
    │   └── User.ts                 # Classe de usuário com criptografia
    │
    ├── functions/                  # Funções de cenários
    │   ├── scenario1.ts            # Cenário 1: Envio normal
    │   ├── scenario2.ts            # Cenário 2: Mensagem adulterada
    │   ├── scenario3.ts            # Cenário 3: Certificado inválido
    │   └── scenario4.ts            # Cenário 4: Resposta bidirecional
    │
    └── types/                      # Definições de tipos TypeScript
        ├── Certificate.interface.ts      # Interface de certificado
        ├── MessageResult.interface.ts    # Interface de resultado de mensagem
        ├── PropsFnScenario.interface.ts  # Props para funções de cenário
        └── SecurePackage.interface.ts    # Interface de pacote seguro
```

## Instalação e execução

### 1. Configurar a versão correta do Node.js
Este projeto requer o Node.js **v20.*** (conforme especificado no arquivo `.nvmrc`).

#### 1.1 Instalar o NVM (Node Version Manager)
O NVM permite gerenciar múltiplas versões do Node.js no mesmo sistema.

**Para macOS/Linux:**
```bash
# Instala o NVM via curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# OU via wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Após a instalação, reinicie o terminal ou execute:

```bash
source ~/.bashrc  # Para bash
# OU
source ~/.zshrc   # Para zsh
```

**Para Windows:**
1. Baixe o [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
2. Execute o instalador `nvm-setup.exe`
3. Reinicie o terminal (CMD ou PowerShell como Administrador)

#### 1.2 Verificar instalação do NVM
```bash
nvm --version
```

#### 1.3 Instalar e usar a versão correta do Node.js
```bash
# Instala a versão especificada no .nvmrc
nvm install 20.*

# Define essa versão como ativa
nvm use v20.*

# Verifica se está usando a versão correta
node --version  # Deve exibir: v20.*
```

### 2.Instalar as dependências do projeto
```bash
npm install
```

### 3. Executar projeto
```bash
npm run dev
```

### 4. Build e Execução
```bash
npm run build
npm start
```

## Cenários de Teste
O sistema simula 4 cenários:

1. **Envio Normal (Sucesso)**: Alice envia uma mensagem segura para Bob
2. **Mensagem Adulterada (Falha)**: Tentativa de adulteração detectada pela verificação de hash
3. **Certificado Inválido (Falha)**: Tentativa de envio com certificado adulterado
4. **Resposta Bidirecional (Sucesso)**: Bob responde para Alice de forma segura

## Tecnologias
- TypeScript
- Node.js Crypto Module
- RSA-2048
- AES-256-CBC
- SHA-256

## Conceitos de Segurança
Este projeto demonstra:
- Confidencialidade (criptografia)
- Integridade (hash)
- Autenticação (assinatura digital)
- Não-repúdio (certificados digitais)
