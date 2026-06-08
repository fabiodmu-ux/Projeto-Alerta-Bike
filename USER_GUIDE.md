# 📘 Manual do Usuário - Alerta Bike

Bem-vindo ao **Alerta Bike**! Este manual fornece instruções completas para usar a aplicação de segurança e recuperação de bicicletas.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Primeiros Passos](#primeiros-passos)
3. [Funcionalidades Principais](#funcionalidades-principais)
4. [Registro de Bicicletas](#registro-de-bicicletas)
5. [Sistema de Alertas](#sistema-de-alertas)
6. [Consulta de Procedência](#consulta-de-procedência)
7. [Perguntas Frequentes](#perguntas-frequentes)
8. [Suporte e Contato](#suporte-e-contato)

---

## 🚴 Visão Geral

O **Alerta Bike** é uma aplicação desenvolvida para proteger ciclistas e auxiliar na recuperação de bicicletas furtadas. A plataforma oferece três funcionalidades principais:

- ✅ **Registro preventivo de chassis** - Identifique sua bicicleta de forma única
- 🚨 **Alertas de emergência geolocalizados** - Receba notificações em tempo real
- 🔍 **Consulta de procedência** - Verifique o histórico de bicicletas no mercado de usados

---

## 🚀 Primeiros Passos

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/fabiodmu-ux/Projeto-Alerta-Bike.git
   cd Projeto-Alerta-Bike
   ```

2. **Siga as instruções de setup**
   - Veja [SETUP.md](./SETUP.md) para instruções detalhadas de instalação
   - Configure as dependências necessárias
   - Configure as variáveis de ambiente

3. **Inicie a aplicação**
   - Siga os passos no SETUP.md para iniciar os serviços

### Criando sua Conta

1. Acesse a aplicação
2. Clique em **"Registrar-se"**
3. Preencha seus dados pessoais:
   - Email
   - Senha segura
   - Nome completo
   - Telefone (opcional)
4. Confirme seu email através do link enviado
5. Complete seu perfil com endereço e preferências

---

## ⭐ Funcionalidades Principais

### 1. 🔐 Registro de Bicicletas

O registro de chassis é o primeiro passo para proteger sua bicicleta.

#### Como Registrar

1. Acesse o menu **"Minhas Bicicletas"**
2. Clique em **"+ Registrar Nova Bicicleta"**
3. Preencha os seguintes dados:

   **Informações Básicas:**
   - Marca e modelo
   - Cor
   - Tamanho do quadro
   - Tipo (Mountain Bike, Estrada, Urbana, etc.)

   **Identificação:**
   - Número de série/chassis
   - Número de quadro
   - Fotos (mínimo 2 ângulos diferentes)

   **Especificações:**
   - Componentes principais (freio, câmbio, etc.)
   - Acessórios permanentes
   - Características particulares

4. Revise as informações
5. Clique em **"Confirmar Registro"**
6. Receba seu **Código de Identificação Alerta Bike**

#### Dicas Importantes

- 📸 Tire fotos claras do número de série e do chassis
- 🏷️ Guarde o código de identificação com segurança
- 📝 Descreva características únicas (adesivos, danos, etc.)
- 💾 Mantenha seus registros atualizados

---

### 2. 🚨 Sistema de Alertas

Receba notificações em tempo real caso sua bicicleta seja registrada como furtada.

#### Ativando Alertas

1. Na página **"Minhas Bicicletas"**, selecione uma bicicleta
2. Clique em **"Configurar Alertas"**
3. Escolha as opções desejadas:
   - ✅ Notificações por email
   - ✅ Notificações SMS (se configurado)
   - ✅ Notificações push (aplicativo móvel)
   - ✅ Raio de abrangência do alerta (em km)

#### Disparando um Alerta

Se sua bicicleta for furtada:

1. Acesse **"Alertas"** > **"Disparar Novo Alerta"**
2. Selecione a bicicleta furtada
3. Preencha os detalhes do furto:
   - 📍 Local do furto (endereço ou coordenadas)
   - 🕐 Data e hora
   - 📝 Descrição do ocorrido
   - 📞 Número de boletim de ocorrência (se houver)
4. Descreva o que estava com a bicicleta:
   - Cadeado utilizado
   - Acessórios/componentes presentes
5. Clique em **"Disparar Alerta"**

#### Recebendo Notificações

- 📬 Você receberá notificações quando alguém consultar sua bicicleta
- 👥 Avise amigos e familiares sobre o furto
- 🔗 Compartilhe o alerta em redes sociais
- 📋 Acompanhe o status do alerta em tempo real

---

### 3. 🔍 Consulta de Procedência

Antes de comprar uma bicicleta usada, consulte seu histórico.

#### Como Consultar

1. Acesse **"Consultar Procedência"**
2. Escolha um dos métodos:

   **Por Número de Série:**
   - Insira o número de série/chassis
   - Clique em "Buscar"

   **Por Foto:**
   - Tire uma foto do chassis
   - A IA reconhecerá automaticamente o número
   - Clique em "Buscar"

   **Por Código Alerta Bike:**
   - Se o vendedor tiver o código
   - Insira o código de identificação

3. Visualize os resultados:
   - ✅ Bicicleta não registrada como furtada
   - ⚠️ Alertas ativos para essa bicicleta
   - 🚨 Bicicleta registrada como furtada

#### Interpretando os Resultados

| Status | Significado | Ação |
|--------|-------------|------|
| ✅ Verificado | Bicicleta sem registro de furto | Seguro comprar |
| ⚠️ Alerta Ativo | Bicicleta foi furtada | Contate a polícia |
| 🚨 Furtada | Bem definido como roubado | NÃO COMPRE |
| ℹ️ Sem Registro | Bicicleta não está no sistema | Sem dados disponíveis |

---

## 📋 Guia de Uso Detalhado

### Gerenciando seu Perfil

1. Acesse **"Configurações"** > **"Meu Perfil"**
2. Atualize informações pessoais
3. Altere sua senha regularmente
4. Configure preferências de privacidade

### Compartilhando Alertas

Para ajudar outros ciclistas:

1. Abra um alerta ativo
2. Clique em **"Compartilhar"**
3. Escolha o método:
   - 📱 Redes sociais (Facebook, Twitter, Instagram)
   - 📧 Email
   - 🔗 Link direto
   - 📋 Copiar código

### Histórico de Bicicletas

1. Vá para **"Histórico"**
2. Visualize registros anteriores
3. Reative registros se necessário
4. Exporte dados em PDF

---

## ❓ Perguntas Frequentes

### P: Quanto custa usar o Alerta Bike?
**R:** A aplicação é gratuita para registrar bicicletas e consultar procedência. Serviços premium podem estar disponíveis.

### P: Minhas informações estão seguras?
**R:** Sim! Usamos criptografia de ponta e seguimos padrões de segurança internacionais (LGPD, GDPR).

### P: Posso registrar uma bicicleta que não é minha?
**R:** Não. O registro é feito apenas para proprietários ou responsáveis legais da bicicleta.

### P: O que fazer se minha bicicleta foi recuperada?
**R:** Entre em contato via email (fabiodmu@gmail.com) para desativar o alerta e atualizar o status.

### P: Como funciona a geolocalização dos alertas?
**R:** Os alertas são acionados quando alguém consulta sua bicicleta na área que você definiu como raio de abrangência.

### P: Posso cancelar meu registro?
**R:** Sim. Vá para **"Configurações"** > **"Dados da Conta"** > **"Deletar Conta"** ou entre em contato conosco.

### P: A aplicação tem versão mobile?
**R:** Verifique a disponibilidade no SETUP.md. Versões iOS e Android podem estar em desenvolvimento.

---

## 🆘 Suporte e Contato

### Reportar um Problema

Se encontrar algum bug ou problema:

1. Acesse [GitHub Issues](https://github.com/fabiodmu-ux/Projeto-Alerta-Bike/issues)
2. Clique em **"New Issue"**
3. Descreva o problema detalhadamente
4. Adicione screenshots se aplicável

### Entrar em Contato

- 📧 **Email**: fabiodmu@gmail.com
- 🐙 **GitHub Discussions**: [Discussões do Projeto](https://github.com/fabiodmu-ux/Projeto-Alerta-Bike/discussions)
- 📖 **Documentação Técnica**: Veja [ARCHITECTURE.md](./ARCHITECTURE.md) e [API.md](./API.md)

### Centro de Ajuda

- 🔗 [Guia de Configuração](./SETUP.md)
- 🏗️ [Arquitetura do Sistema](./ARCHITECTURE.md)
- 🔌 [Documentação da API](./API.md)
- 👥 [Diretrizes de Contribuição](./CONTRIBUTING.md)

---

## 📚 Recursos Adicionais

- 📑 [Documento Completo - Bike Segura.pdf](./Bike%20Segura.pdf)
- 🏠 [README Técnico](./README.md)
- 📜 [Licença MIT](./LICENSE)

---

## 🙏 Agradecimentos

Obrigado por usar o **Alerta Bike** e ajudar a tornar as ruas mais seguras para ciclistas!

**Pedale com segurança! 🚴‍♂️**

---

*Última atualização: 8 de junho de 2026*
