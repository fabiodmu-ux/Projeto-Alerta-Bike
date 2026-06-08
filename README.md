# 🚲 Alerta Bike + Bike Segura - Sistema Integrado

> **Sistema de Rastreamento de Bicicletas com Segurança e Recuperação integrado ao Gov.br**

Uma solução completa focada na **segurança de ciclistas** e **recuperação de bicicletas furtadas** através de uma rede colaborativa com autenticação governamental.

![Bike Segura](https://github.com/user-attachments/assets/e47a27d9-822c-4f2d-a74f-2c2fb9ff704c)

---

## 📋 Sumário Executivo

Este projeto integra duas camadas complementares:

| Camada | Projeto | Descrição |
|--------|---------|-----------|
| **Frontend** | 🎨 Alerta Bike (UX Refinement) | Interface otimizada para emergência, design sob stress |
| **Backend** | ⚙️ Bike Segura | API de rastreamento, integração Gov.br, segurança |

---

## 🚀 Visão Geral

### O Desafio
Transformar um fluxo de registro de furto complexo em uma **experiência intuitiva**, operável sob **alto estresse** e em **ambientes externos**, integrado com os serviços governamentais do Brasil.

### Funcionalidades Principais

✅ **Registro Preventivo de Chassis**
- Cadastro antecipado de bicicletas no sistema
- Prevenção de roubos através de identificação única

✅ **Alerta de Emergência Geolocalizado**
- Botão de emergência com alta visibilidade
- Disparo imediato de alertas na região
- Rede colaborativa de ciclistas mobilizados

✅ **Autenticação Gov.br**
- Integração com portal governamental
- Validação oficial de identidade
- Conformidade com padrões de segurança

✅ **Consulta de Procedência**
- Verificação de legitimidade em compras de usados
- Prevenção de receptação
- Base de dados integrada com autoridades

✅ **Interface Responsiva**
- Design otimizado para dispositivos móveis
- Alto contraste para legibilidade em luz solar
- Acessibilidade em primeiro plano

---

## 📈 Evolução do Design: Antes vs. Depois

| Versão Inicial (MVP) | Versão Refinada (Pós-Testes) |
| :---: | :---: |
| <img width="400" alt="APP Alerta Bike" src="https://github.com/user-attachments/assets/34309131-a183-40cf-afb1-0eada57ed479" /> | <img width="400" alt="Alerta BIKE -atualizado" src="https://github.com/user-attachments/assets/9df8a7ba-b8b2-48f4-8b80-a1d8b60f3f9c" /> |

### Principais Melhorias Implementadas:

* **🔴 Priorização do Fluxo de Emergência:** O botão de registro foi redesenhado com alta visibilidade (vermelho vibrante) para reduzir o tempo de reação da vítima.

* **ℹ️ Auxílio Contextual (Tooltip do Chassi):** Introdução de um guia visual para localização física do número de série, reduzindo erros de entrada de dados.

* **👁️ Acessibilidade e Legibilidade:** Substituição de listas simples por **Cards de Status** de alto contraste, facilitando a leitura sob luz solar intensa.

* **🔐 Refinamento de Identificação:** Fragmentação do campo de SMS em inputs individuais para uma validação mais fluida e segura.

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                   │
│                    (Alerta Bike Frontend)                   │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Registro    │  │   Alerta     │  │  Consulta    │      │
│  │  Preventivo  │  │  Emergência  │  │ Procedência  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────┬──────────────────────────────────────┘
                      │ REST API / WebSockets
┌─────────────────────▼──────────────────────────────────────┐
│                    CAMADA DE NEGÓCIOS                       │
│                    (Bike Segura Backend)                    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │  API Gateway │ Auth │ Tracking │ Notifications    │   │
│  └────────────────────────────────────────────────────┘   │
└──────────┬──────────────────────────┬────────────────────┘
           │                          │
    ┌──────▼─────────┐        ┌───────▼────────┐
    │  Base de Dados │        │   Gov.br API   │
    │   (Bicicletas) │        │  (Autenticação)│
    └────────────────┘        └────────────────┘
```

---

## 🛠️ Stack Tecnológico

### Frontend (Alerta Bike)
- **HTML5, CSS3** - Estrutura e estilização
- **JavaScript** - Interatividade e validação
- **CSS Custom Properties** - Variáveis e temas
- **Flexbox & Grid** - Layouts responsivos
- **Geolocation API** - Captura de coordenadas

### Backend (Bike Segura)
- **Node.js / Python** - Runtime (a definir)
- **Express / FastAPI** - Framework Web
- **PostgreSQL / MongoDB** - Persistência
- **JWT** - Autenticação
- **Gov.br SDK** - Integração governamental
- **Socket.io / WebSockets** - Notificações em tempo real

---

## 📁 Estrutura de Diretórios

```
Projeto-Alerta-Bike/
│
├── 📄 README.md                      # Este arquivo
├── 📄 ARCHITECTURE.md                # Documentação de arquitetura
├── 📄 API.md                         # Especificação de API
├── 📄 SETUP.md                       # Guia de instalação
├── 📄 CONTRIBUTING.md                # Guia de contribuição
├── 📄 USER_GUIDE.md                  # Manual do usuário
│
├── 📁 frontend/                      # Camada de Apresentação
│   ├── 📁 public/
│   │   ├── index.html
│   │   └── assets/
│   ├── 📁 src/
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   ├── auth.js
│   │   │   ├── geolocation.js
│   │   │   └── api-client.js
│   │   ├── css/
│   │   │   ├── styles.css
│   │   │   ├── variables.css
│   │   │   └── accessibility.css
│   │   └── components/
│   │       ├── emergency-button.js
│   │       ├── registration-form.js
│   │       └── status-cards.js
│   └── 📄 package.json
│
├── 📁 backend/                       # Camada de Negócios
│   ├── 📁 src/
│   │   ├── 📁 controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── bike.controller.js
│   │   │   └── alert.controller.js
│   │   ├── 📁 routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── bike.routes.js
│   │   │   └── alert.routes.js
│   │   ├── 📁 models/
│   │   │   ├── User.model.js
│   │   │   ├── Bike.model.js
│   │   │   └── Alert.model.js
│   │   ├── 📁 services/
│   │   │   ├── govbr.service.js
│   │   │   ├── notification.service.js
│   │   │   └── tracking.service.js
│   │   ├── 📁 middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── validation.middleware.js
│   │   └── server.js
│   ├── 📄 .env.example
│   ├── 📄 .env
│   └── 📄 package.json
│
├── 📁 docs/                          # Documentação
│   ├── 📄 DEPLOYMENT.md
│   └── 📁 images/
│
├── 📁 tests/                         # Testes
│   ├── 📁 unit/
│   ├── 📁 integration/
│   └── 📁 e2e/
│
└── 📄 docker-compose.yml             # Orquestração de containers
```

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- PostgreSQL 12+
- Credenciais Gov.br (API Key)

### Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/fabiodmu-ux/Projeto-Alerta-Bike.git
cd Projeto-Alerta-Bike

# 2. Instale dependências (Frontend)
cd frontend
npm install

# 3. Instale dependências (Backend)
cd ../backend
npm install

# 4. Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# 5. Inicie o banco de dados
docker-compose up -d db

# 6. Execute as migrações
npm run migrate

# 7. Inicie os servidores
# Terminal 1: Backend
npm run dev

# Terminal 2: Frontend
cd ../frontend
npm run dev
```

Acesse: `http://localhost:3000`

---

## 📖 Documentação Completa

- **[🏗️ ARCHITECTURE.md](./ARCHITECTURE.md)** - Design de sistema detalhado
- **[🔌 API.md](./API.md)** - Endpoints e especificações
- **[⚙️ SETUP.md](./SETUP.md)** - Guia de instalação e configuração
- **[👥 CONTRIBUTING.md](./CONTRIBUTING.md)** - Como contribuir
- **[📘 USER_GUIDE.md](./USER_GUIDE.md)** - Manual do usuário
- **[📄 Bike Segura.pdf](./Bike%20Segura.pdf)** - Documentação completa (PDF)

---

## 🤝 Como Contribuir

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes.

---

## 📝 Licença

Este projeto está sob a licença [MIT](./LICENSE) - veja o arquivo LICENSE para mais detalhes.

---

## 📞 Contato & Suporte

- **Autor:** Fábio (fabiodmu-ux)
- **GitHub:** [@fabiodmu-ux](https://github.com/fabiodmu-ux)
- **Email:** fabiodmu@gmail.com
- **Issues:** [Abra uma issue](https://github.com/fabiodmu-ux/Projeto-Alerta-Bike/issues)
- **Discussions:** [Discussões](https://github.com/fabiodmu-ux/Projeto-Alerta-Bike/discussions)

---

## 🎯 Status do Projeto

| Componente | Status | Progresso |
|-----------|--------|-----------|
| 🎨 Design Frontend | ✅ Completo | 100% |
| 📘 Documentação de Usuário | ✅ Completo | 100% |
| 🔌 API Backend | 🚧 Em desenvolvimento | 40% |
| 🔐 Integração Gov.br | 🚧 Em desenvolvimento | 30% |
| 🧪 Testes | 🚧 Em desenvolvimento | 20% |
| 📦 Deploy | ⏳ Não iniciado | 0% |

---

**Desenvolvido com ❤️ para a segurança de ciclistas no Brasil**
