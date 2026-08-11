# 🚲 Alerta Bike + Bike Segura

> Sistema integrado para registro, rastreamento e recuperação de bicicletas, com foco em segurança, mobilidade urbana e experiência do usuário.

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![UX](https://img.shields.io/badge/UX-Case%20Study-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Sobre o Projeto

O **Alerta Bike + Bike Segura** é uma proposta de solução digital para aumentar a segurança dos ciclistas por meio de um sistema integrado de cadastro preventivo, rastreamento e recuperação de bicicletas.

O projeto combina um **frontend centrado na experiência do usuário (UX/UI)** com uma arquitetura backend preparada para autenticação via Gov.br, notificações em tempo real e consulta de procedência.

---

## 🎯 Objetivos

- 🚴 Incentivar o cadastro preventivo de bicicletas.
- 🚨 Reduzir o tempo de resposta em casos de furto.
- 📍 Facilitar a recuperação através da geolocalização.
- 🔐 Integrar autenticação segura utilizando Gov.br.
- ♿ Garantir acessibilidade e usabilidade em qualquer dispositivo.

---

## ✨ Funcionalidades

- Cadastro de bicicletas
- Alerta de emergência
- Geolocalização
- Consulta de procedência
- Login Gov.br (planejado)
- Interface responsiva
- Acessibilidade WCAG AA

---

# 🎨 UX Case Study

Durante o desenvolvimento foi realizado um refinamento completo da interface.

### Resultados

| Indicador | Resultado |
|-----------|-----------|
| Tempo para disparar alerta | ⬇️ 67% |
| Erros no cadastro | ⬇️ 74% |
| Abandono do fluxo | ⬇️ 74% |
| Acessibilidade | 94% WCAG AA |

O estudo completo está disponível em:

```
docs/UX_CASE_STUDY.md
```

---

# 🛠 Tecnologias

## Frontend

- HTML5
- CSS3
- JavaScript
- Geolocation API

## Backend

- Node.js
- Express
- PostgreSQL
- Redis
- JWT
- Socket.io

---

# 🏗 Arquitetura

```
Frontend
      │
 REST API
      │
Backend
      │
Banco de Dados
      │
Gov.br
```

Documentação completa:

```
docs/ARCHITECTURE.md
```

---

# 📂 Estrutura

```
Projeto-Alerta-Bike/

frontend/
backend/
docs/
tests/

README.md
LICENSE
```

---

# 🚀 Como executar

```bash
git clone https://github.com/fabiodmu-ux/Projeto-Alerta-Bike.git

cd Projeto-Alerta-Bike
```

### Docker

```bash
docker-compose up -d
```

### Manual

Backend

```bash
cd backend

npm install

npm run dev
```

Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📊 Roadmap

| Etapa | Status |
|--------|--------|
| UX/UI | ✅ |
| Protótipo | ✅ |
| Documentação | ✅ |
| API | 🚧 |
| Banco de Dados | 🚧 |
| Gov.br | 🚧 |
| Testes | ⏳ |
| Deploy | ⏳ |

---

# 🚴 Projeto Relacionado

## Pedale com Liberdade

Landing Page desenvolvida para incentivar o ciclismo, qualidade de vida e mobilidade sustentável.

🌐 Demonstração
[(Pedale com Liberdade)](https://pedalecomliberdade-q1cazzo.gamma.site/)

# 🚴 APP - surgindo [(BikeGuard)](https://easy-modern-plan.lovable.app/)

---

# 📚 Documentação

| Documento | Descrição |
|------------|-----------|
| ARCHITECTURE.md | Arquitetura |
| API.md | API |
| USER_GUIDE.md | Manual |
| SECURITY.md | Segurança |
| DEPLOYMENT.md | Deploy |

---

# 👨‍💻 Autor

**Fábio Duarte Oliveira**

UX Designer • Desenvolvedor • Pesquisador

[GitHub](https://github.com/fabiodmu-ux)


[LinkedIn](https://www.linkedin.com/feed/)


---

# ⭐ Apoie o projeto

Se este projeto foi útil para você, deixe uma ⭐ no repositório.

Isso ajuda a divulgar o trabalho e incentiva a evolução do projeto.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
