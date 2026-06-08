# ⚙️ Guia de Instalação e Configuração

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 16.x ou superior
  - Download: https://nodejs.org/
  - Verificar: `node --version` e `npm --version`

- **Git**
  - Download: https://git-scm.com/

- **Docker & Docker Compose** (opcional, mas recomendado)
  - Download: https://www.docker.com/products/docker-desktop

- **PostgreSQL** 12+ (se não usar Docker)
  - Download: https://www.postgresql.org/

- **Redis** (se não usar Docker)
  - Download: https://redis.io/

---

## 🚀 Instalação Rápida (Recomendado)

### 1. Clone o repositório

```bash
git clone https://github.com/fabiodmu-ux/Projeto-Alerta-Bike.git
cd Projeto-Alerta-Bike
```

### 2. Inicie os serviços com Docker

```bash
docker-compose up -d

# Verificar status
docker-compose ps
```

### 3. Configure o Backend

```bash
cd backend

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env

# Edite .env com suas credenciais
nano .env
```

### 4. Configure o Frontend

```bash
cd ../frontend

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env
```

### 5. Execute as migrações

```bash
cd ../backend
npm run migrate:latest
```

### 6. Inicie os servidores

```bash
# Terminal 1: Backend
npm run dev

# Terminal 2: Frontend (em outro terminal)
cd ../frontend
npm start
```

### 7. Acesse a aplicação

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api
- **Swagger Docs:** http://localhost:3001/api-docs

---

## 🐳 Docker Compose

### Arquivo `docker-compose.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    container_name: bike-segura-db
    environment:
      POSTGRES_USER: bikesegura
      POSTGRES_PASSWORD: dev_password_123
      POSTGRES_DB: bike_segura_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U bikesegura"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: bike-segura-redis
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

---

## 🔐 Variáveis de Ambiente

### Backend (`.env`)

```env
# Ambiente
NODE_ENV=development
PORT=3001

# Base de Dados
DATABASE_URL=postgresql://bikesegura:dev_password_123@localhost:5432/bike_segura_db
DATABASE_USER=bikesegura
DATABASE_PASSWORD=dev_password_123

# Redis
REDIS_URL=redis://localhost:6379
REDIS_DB=0

# JWT
JWT_SECRET=your-super-secret-key-change-in-production-123456
JWT_REFRESH_SECRET=your-super-secret-refresh-key-123456
JWT_EXPIRATION=3600
JWT_REFRESH_EXPIRATION=604800

# Gov.br OAuth
GOV_BR_CLIENT_ID=your-gov-br-client-id
GOV_BR_CLIENT_SECRET=your-gov-br-client-secret
GOV_BR_REDIRECT_URI=http://localhost:3000/callback
GOV_BR_API_URL=https://oauth.sandbox.gov.br

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@bikesegura.gov.br

# Segurança
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
LOG_FORMAT=json
```

### Frontend (`.env`)

```env
# API
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001

# Gov.br
REACT_APP_GOV_BR_CLIENT_ID=your-gov-br-client-id
REACT_APP_GOV_BR_AUTHORIZATION_URL=https://oauth.sandbox.gov.br/authorize

# Google Maps
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Ambiente
REACT_APP_ENV=development
REACT_APP_VERSION=1.0.0
```

---

## 📦 Instalação Manual (Sem Docker)

### 1. Instale PostgreSQL

```bash
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Windows
# Baixe do site oficial e siga o instalador
```

### 2. Crie banco de dados

```bash
psql -U postgres

CREATE USER bikesegura WITH PASSWORD 'dev_password_123';
CREATE DATABASE bike_segura_db OWNER bikesegura;
ALTER ROLE bikesegura WITH CREATEDB;

\q
```

### 3. Instale Redis

```bash
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt-get install redis-server
sudo service redis-server start

# Windows (WSL recomendado)
wsl
sudo apt-get install redis-server
redis-server
```

### 4. Instale dependências do Backend

```bash
cd backend
npm install

# Rode migrações
npm run migrate:latest

# Seed de dados (opcional)
npm run seed
```

### 5. Instale dependências do Frontend

```bash
cd ../frontend
npm install
```

### 6. Inicie os servidores

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm start
```

---

## 🧪 Testes

### Testes Unitários

```bash
cd backend
npm test

# Com cobertura
npm run test:coverage
```

### Testes de Integração

```bash
npm run test:integration
```

### Testes E2E

```bash
cd frontend
npm run test:e2e
```

---

## 🗄️ Migrações do Banco de Dados

### Criar nova migração

```bash
npm run migrate:create -- --name create_alerts_table
```

### Executar migrações

```bash
npm run migrate:latest
```

### Desfazer última migração

```bash
npm run migrate:rollback
```

### Ver status

```bash
npm run migrate:status
```

---

## 🌱 Seed de Dados

### Criar dados de teste

```bash
npm run seed
```

### Limpar banco

```bash
npm run seed:clean
```

---

## 🔍 Verificação de Saúde

### Health Check

```bash
# Backend
curl http://localhost:3001/api/health

# Resposta esperada:
# {
#   "status": "ok",
#   "timestamp": "2024-06-08T16:30:00Z",
#   "database": "connected",
#   "redis": "connected"
# }
```

---

## 🐛 Troubleshooting

### Erro: "Port 3000 already in use"

```bash
# Encontre o processo usando a porta
lsof -i :3000

# Mate o processo
kill -9 <PID>

# Ou use outra porta
PORT=3002 npm start
```

### Erro: "Cannot connect to database"

```bash
# Verifique se PostgreSQL está rodando
psql -U bikesegura -d bike_segura_db

# Teste a conexão
npm run test:db
```

### Erro: "Redis connection refused"

```bash
# Verifique se Redis está rodando
redis-cli ping

# Resposta esperada: PONG

# Se não estiver rodando
redis-server  # macOS/Linux
# ou use Docker
docker run -d -p 6379:6379 redis:latest
```

### Erro: "Gov.br credentials invalid"

```bash
# Verifique as credenciais em .env
# Certifique-se de estar usando sandbox em desenvolvimento

GOV_BR_API_URL=https://oauth.sandbox.gov.br
```

---

## 📊 Monitoramento

### Logs

```bash
# Backend
docker-compose logs -f backend

# Frontend
docker-compose logs -f frontend

# Database
docker-compose logs -f postgres
```

### Métricas

```bash
# Ver status dos containers
docker-compose ps

# Ver uso de recursos
docker stats
```

---

## 🚀 Preparando para Produção

### 1. Compile o Frontend

```bash
cd frontend
npm run build

# Resposta:
# Build complete! The output is in ./build
```

### 2. Configure variáveis de produção

```bash
# Backend .env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@prod-db:5432/bike_segura_db
JWT_SECRET=use-a-very-strong-random-string-here
# ... outras variáveis
```

### 3. Build da imagem Docker

```bash
docker build -t bike-segura:latest .
```

### 4. Deploy (ex: AWS, Heroku, Digital Ocean)

```bash
# Exemplo com Heroku
heroku create bike-segura-app
heroku addons:create heroku-postgresql:standard-0
heroku config:set JWT_SECRET=your-production-secret
git push heroku main
```

---

## 📚 Recursos Úteis

- [Node.js Documentation](https://nodejs.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Docker Documentation](https://docs.docker.com/)
- [Express.js Guide](https://expressjs.com/)

---

## ❓ Suporte

Se encontrar problemas:

1. Verifique a seção [Troubleshooting](#-troubleshooting)
2. Abra uma [issue no GitHub](https://github.com/fabiodmu-ux/Projeto-Alerta-Bike/issues)
3. Consulte a [documentação completa](./ARCHITECTURE.md)

---

**Desenvolvido com ❤️ para a segurança de ciclistas no Brasil**
