# 🏗️ Arquitetura do Sistema - Alerta Bike + Bike Segura

## Visão Geral

O sistema é dividido em **3 camadas principais**:

```
┌─────────────────────────────────────────────────────────────┐
│              1. CAMADA DE APRESENTAÇÃO                      │
│                  (Frontend - Alerta Bike)                   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ HTML5 | CSS3 | JavaScript | Geolocation API          │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API / WebSockets
                         │ (HTTPS + WSS)
┌────────────────────────▼────────────────────────────────────┐
│              2. CAMADA DE NEGÓCIOS                          │
│                (Backend - Bike Segura API)                  │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Controllers │  │   Services   │  │  Middleware  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Router & Request Handler                    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────┬─────────────────────────────────┬──────────────────┘
         │                                 │
    ┌────▼──────────────┐         ┌────────▼──────────────┐
    │  3a. PERSISTÊNCIA │         │  3b. SERVIÇOS EXT.    │
    │   (Base de Dados)  │         │   (Gov.br, Email)     │
    │                    │         │                       │
    │ ┌────────────────┐ │         │ ┌──────────────────┐  │
    │ │  PostgreSQL    │ │         │ │ Gov.br OAuth 2.0 │  │
    │ │  (Bicycles DB) │ │         │ │ (Autenticação)   │  │
    │ │                │ │         │ └──────────────────┘  │
    │ │ • Users        │ │         │                       │
    │ │ • Bikes        │ │         │ ┌──────────────────┐  │
    │ │ • Alerts       │ │         │ │ Email/SMS        │  │
    │ │ • Locations    │ │         │ │ (Notificações)   │  │
    │ │ • Evidence     │ │         │ └──────────────────┘  │
    │ └────────────────┘ │         │                       │
    │                    │         │ ┌──────────────────┐  │
    │ ┌────────────────┐ │         │ │ Google Maps API  │  │
    │ │ Redis Cache    │ │         │ │ (Geolocalização) │  │
    │ │ (Performance)  │ │         │ └──────────────────┘  │
    │ └────────────────┘ │         │                       │
    └────────────────────┘         └───────────────────────┘
```

---

## 1️⃣ Camada de Apresentação (Frontend)

### Tecnologias
- **HTML5** - Semântica e estrutura
- **CSS3** - Estilização responsiva (Flexbox, Grid)
- **JavaScript (Vanilla)** - Interatividade sem frameworks
- **Geolocation API** - Captura de coordenadas GPS
- **Service Workers** - Funcionamento offline

### Componentes Principais

#### 1.1 Página de Registro Preventivo (`registration.html`)
```
┌─────────────────────────────────────┐
│        REGISTRO DE BICICLETA        │
├─────────────────────────────────────┤
│                                     │
│  [Form]                             │
│  - Nome da bicicleta                │
│  - Marca/Modelo                     │
│  - Número do Chassi (com tooltip)   │
│  - Foto (upload)                    │
│  - Localização (auto-preenchida)    │
│                                     │
│  [SALVAR]                           │
└─────────────────────────────────────┘
```

#### 1.2 Botão de Emergência (`emergency.html`)
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│         ┌──────────────┐            │
│         │              │            │
│         │  🚨 ALERTA!  │            │
│         │   PRESSIONE  │            │
│         │              │            │
│         └──────────────┘            │
│                                     │
│  Status: ✓ Localizado                │
│  Coordenadas: -23.5505, -46.6333    │
│                                     │
└─────────────────────────────────────┘
```

#### 1.3 Consulta de Procedência (`lookup.html`)
```
┌─────────────────────────────────────┐
│   VERIFICAR PROCEDÊNCIA DA BIKE      │
├─────────────────────────────────────┤
│                                     │
│  [Campo de entrada: Número Chassi]  │
│                                     │
│  Status:                            │
│  ✓ Bicicleta registrada             │
│  ✓ Proprietário validado            │
│  ✓ Sem alertas de roubo             │
│                                     │
└─────────────────────────────────────┘
```

### Fluxo de Interação

```
Usuario
   │
   ├─→ Autenticação (Gov.br)
   │      │
   │      └─→ Token JWT armazenado (localStorage)
   │
   ├─→ Registro Preventivo
   │      │
   │      └─→ POST /api/bikes
   │           │
   │           └─→ Backend valida e armazena
   │
   ├─→ Ativação Alerta de Emergência
   │      │
   │      ├─→ Captura geolocalização (GPS)
   │      │
   │      └─→ POST /api/alerts (com coordenadas)
   │           │
   │           └─→ Backend notifica comunidade
   │               (WebSocket broadcast)
   │
   └─→ Consulta Procedência
          │
          └─→ GET /api/bikes/:chassi
              │
              └─→ Backend retorna status
```

---

## 2️⃣ Camada de Negócios (Backend API)

### Arquitetura em Camadas

```
┌─────────────────────────────────────────────┐
│       ROTEADOR (express.Router)             │
├─────────────────────────────────────────────┤
│                                             │
│  GET    /api/auth/login                     │
│  POST   /api/bikes                          │
│  GET    /api/bikes/:id                      │
│  DELETE /api/bikes/:id                      │
│  POST   /api/alerts                         │
│  GET    /api/alerts/:id                     │
│                                             │
├─────────────────────────────────────────────┤
│       MIDDLEWARE (Auth, Validation)         │
├─────────────────────────────────────────────┤
│                                             │
│  ├─ authenticateToken()                     │
│  ├─ validateInput()                         │
│  ├─ errorHandler()                          │
│  └─ logRequests()                           │
│                                             │
├─────────────────────────────────────────────┤
│         CONTROLADORES (Controllers)         │
├─────────────────────────────────────────────┤
│                                             │
│  ├─ AuthController                          │
│  ├─ BikeController                          │
│  ├─ AlertController                         │
│  └─ UserController                          │
│                                             │
├─────────────────────────────────────────────┤
│           SERVIÇOS (Services)               │
├─────────────────────────────────────────────┤
│                                             │
│  ├─ AuthService                             │
│  ├─ BikeService                             │
│  ├─ AlertService                            │
│  ├─ GovBrService                            │
│  ├─ NotificationService                     │
│  └─ GeolocationService                      │
│                                             │
├─────────────────────────────────────────────┤
│          MODELOS (Data Models)              │
├─────────────────────────────────────────────┤
│                                             │
│  ├─ User (Mongoose/Sequelize)               │
│  ├─ Bike                                    │
│  ├─ Alert                                   │
│  ├─ Location                                │
│  └─ Evidence                                │
│                                             │
└─────────────────────────────────────────────┘
```

### Fluxo de Dados Completo

```
Frontend          Backend          Database
   │                 │                 │
   ├─POST /api/bikes─→│                 │
   │                 ├─Validate────────→│
   │                 ├─Check Gov.br────→│Gov.br
   │                 ├─Save user data──→│
   │                 ├─Encrypt chassi──→│
   │                 ←─JSON response─────│
   ├─Response────────←│                 │
   │
   │                                   
   ├─POST /api/alerts─→│                 │
   │ (Emergency)      ├─Get location───→│Geolocation
   │                 ├─Create alert───→│
   │                 ├─Query nearby───→│
   │                 ├─Send notif───→│Email/SMS
   │                 ├─Broadcast WS───→│
   │                 ←─Confirm────────│
   ├─Real-time upd─←│                 │
```

---

## 3️⃣ Camada de Persistência e Serviços Externos

### Base de Dados (PostgreSQL)

#### Schema Principal

```sql
-- Usuários
CREATE TABLE users (
  id UUID PRIMARY KEY,
  gov_br_id VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  phone VARCHAR,
  cpf_hash VARCHAR UNIQUE,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bicicletas
CREATE TABLE bikes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR NOT NULL,
  brand VARCHAR NOT NULL,
  model VARCHAR NOT NULL,
  chassi VARCHAR UNIQUE NOT NULL,
  color VARCHAR,
  photo_url TEXT,
  registered_at TIMESTAMP DEFAULT NOW(),
  status ENUM('active', 'stolen', 'recovered') DEFAULT 'active'
);

-- Alertas
CREATE TABLE alerts (
  id UUID PRIMARY KEY,
  bike_id UUID REFERENCES bikes(id),
  alert_type ENUM('theft', 'missing') NOT NULL,
  location POINT NOT NULL,
  latitude FLOAT,
  longitude FLOAT,
  description TEXT,
  evidence_photos TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  status ENUM('active', 'resolved', 'cancelled') DEFAULT 'active'
);

-- Histórico de Localizações
CREATE TABLE locations (
  id UUID PRIMARY KEY,
  bike_id UUID REFERENCES bikes(id),
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  accuracy FLOAT,
  recorded_at TIMESTAMP DEFAULT NOW()
);
```

### Serviços Externos

#### Gov.br Integration
```javascript
class GovBrService {
  async authenticate(code: string): Promise<Token>
  async validateCPF(cpf: string): Promise<boolean>
  async getCitizenData(cpf: string): Promise<CitizenData>
}
```

#### Notificações
```javascript
class NotificationService {
  async sendEmail(to: string, subject: string, body: string): Promise<void>
  async sendSMS(phone: string, message: string): Promise<void>
  async broadcastWebSocket(room: string, event: string, data: any): Promise<void>
}
```

---

## 🔐 Segurança

### Autenticação
- **OAuth 2.0 via Gov.br** - Padrão de segurança governamental
- **JWT (Access + Refresh tokens)** - Stateless sessions
- **HTTPS/TLS** - Criptografia em trânsito
- **bcrypt** - Hashing de senhas sensíveis

### Proteção de Dados
- **Encryption at Rest** - AES-256 para dados sensíveis
- **Rate Limiting** - Proteção contra DDoS
- **CORS** - Controle de origem
- **SQL Injection Prevention** - Parameterized queries

---

## 📊 Fluxo de Dados Detalhado

### Cenário 1: Registro Preventivo

```
1. Usuário acessa frontend → /register
2. Frontend valida JWT
3. Usuário preenche dados e clica "SALVAR"
4. Frontend faz POST /api/bikes
5. Backend:
   - Valida entrada
   - Criptografa chassi
   - Salva em PostgreSQL
   - Atualiza cache Redis
6. Resposta retorna ao frontend com ID da bicicleta
```

### Cenário 2: Alerta de Emergência

```
1. Usuário pressiona botão 🚨
2. Frontend captura geolocalização (GPS)
3. Frontend envia POST /api/alerts
4. Backend:
   - Valida autenticação
   - Salva alerta em PostgreSQL
   - Encontra usuários próximos
   - Envia notificações (Email/SMS)
   - Faz broadcast via WebSocket
5. Usuários próximos recebem alerta em tempo real
```

---

## 🚀 Deployment e Escalabilidade

### Ambiente de Desenvolvimento
```bash
docker-compose up
```

### Ambiente de Produção (Kubernetes)
- Frontend: Nginx (CDN + Static)
- Backend: Node.js (replicas: 3)
- Database: PostgreSQL (replicated)
- Cache: Redis (Sentinel HA)
- Load Balancer: NGINX/HAProxy

---

**Desenvolvido com ❤️ para a segurança de ciclistas no Brasil**
