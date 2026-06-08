# 🔌 Especificação Completa da API REST - Alerta Bike

> **Sistema de Segurança e Recuperação de Bicicletas**  
> Versão: 1.0.0 | Última atualização: 8 de junho de 2026

## 📋 Índice

- [Informações Gerais](#-informações-gerais)
- [Autenticação](#-autenticação)
- [Usuários](#-usuários)
- [Bicicletas](#-bicicletas)
- [Alertas de Emergência](#-alertas-de-emergência)
- [Consulta de Procedência](#-consulta-de-procedência)
- [Notificações (WebSocket)](#-notificações-websocket)
- [Tratamento de Erros](#-tratamento-de-erros)
- [Rate Limiting](#-rate-limiting)
- [Segurança](#-segurança)

---

## 📍 Informações Gerais

### Base URL

```
Desenvolvimento:  http://localhost:5000/api/v1
Homologação:     https://staging-api.alertabike.com.br/api/v1
Produção:        https://api.alertabike.com.br/api/v1
```

### Headers Padrão

Todos os requests devem incluir:

```
Content-Type: application/json
Accept: application/json
```

### Formato de Resposta

Sucesso (2xx):
```json
{
  "success": true,
  "data": {},
  "message": "Operação realizada com sucesso"
}
```

Erro (4xx/5xx):
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descrição do erro",
    "details": []
  }
}
```

---

## 🔐 Autenticação

### Fluxo de Autenticação

```
┌─────────────┐                                    ┌──────────┐
│   Cliente   │                                    │ Gov.br   │
└──────┬──────┘                                    └────┬─────┘
       │                                                 │
       │──────────────── (1) Redireciona para Gov.br──>│
       │                                                 │
       │<─────────────────── (2) Código de Auth ──────│
       │
       │──────────────── (3) POST /auth/login ─────────────────────────────┐
       │                                              ┌────────────────────┘
       │<─────────────── (4) JWT + Refresh Token ─────┤
       │                                               │
```

### POST `/auth/register`

Registrar novo usuário

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "cpf": "12345678901",
  "phone": "+5511999999999",
  "password": "SenhaSegura123!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "verified": false
  }
}
```

**Errors:**
- `400` - Email já registrado
- `400` - CPF inválido
- `422` - Validação de dados falhou

---

### POST `/auth/login`

Login com credenciais ou Gov.br

**Request (Email/Senha):**
```json
{
  "email": "joao@example.com",
  "password": "SenhaSegura123!"
}
```

**Request (Gov.br):**
```json
{
  "govbr_code": "auth_code_from_oauth",
  "state": "random_state_value"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "João Silva",
      "email": "joao@example.com",
      "verified": true
    }
  }
}
```

**Errors:**
- `401` - Credenciais inválidas
- `401` - Código Gov.br expirado

---

### POST `/auth/refresh`

Renovar token de acesso

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600
  }
}
```

---

### POST `/auth/logout`

Fazer logout

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

---

### POST `/auth/forgot-password`

Solicitar reset de senha

**Request:**
```json
{
  "email": "joao@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Email de recuperação enviado"
}
```

---

### POST `/auth/reset-password`

Redefinir senha

**Request:**
```json
{
  "token": "reset_token_from_email",
  "password": "NovaSenha123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Senha atualizada com sucesso"
}
```

---

## 👥 Usuários

### GET `/users/profile`

Obter perfil do usuário autenticado

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "cpf": "12345678901",
    "phone": "+5511999999999",
    "avatar_url": "https://...",
    "bikes_count": 3,
    "alerts_count": 2,
    "verified": true,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-06-08T14:00:00Z"
  }
}
```

---

### PUT `/users/profile`

Atualizar perfil do usuário

**Request:**
```json
{
  "name": "João Silva Santos",
  "phone": "+5511988888888",
  "avatar_base64": "data:image/jpeg;base64,..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva Santos",
    "phone": "+5511988888888",
    "updated_at": "2024-06-08T14:30:00Z"
  }
}
```

---

### POST `/users/change-password`

Alterar senha

**Request:**
```json
{
  "current_password": "SenhaAtual123!",
  "new_password": "NovaSenha123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Senha alterada com sucesso"
}
```

---

### POST `/users/preferences`

Atualizar preferências de notificações

**Request:**
```json
{
  "email_notifications": true,
  "sms_notifications": true,
  "push_notifications": true,
  "alert_radius_km": 10
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "preferences": {
      "email_notifications": true,
      "sms_notifications": true,
      "push_notifications": true,
      "alert_radius_km": 10
    }
  }
}
```

---

### DELETE `/users/account`

Deletar conta do usuário

**Request:**
```json
{
  "password": "SenhaAtual123!",
  "reason": "Motivo da exclusão (opcional)"
}
```

**Response (204 No Content):**
```
(sem body)
```

---

## 🚲 Bicicletas

### POST `/bikes`

Registrar nova bicicleta

**Request:**
```json
{
  "brand": "Caloi",
  "model": "Elite 2024",
  "color": "Preto",
  "bike_type": "mountain",
  "chassis_number": "ABC123DEF456",
  "frame_number": "XYZ789",
  "weight_kg": 12.5,
  "components": {
    "brake_type": "Hydraulic disc",
    "shifter": "Shimano",
    "wheels": "29 polegadas"
  },
  "photos": [
    "data:image/jpeg;base64,..."
  ],
  "registration_location": {
    "latitude": -23.5505,
    "longitude": -46.6333
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "bike-550e8400-e29b-41d4-a716-446655440000",
    "brand": "Caloi",
    "model": "Elite 2024",
    "chassis_number": "ABC123DEF456",
    "status": "active",
    "alerta_bike_code": "AB-123-CD-456",
    "registered_at": "2024-06-08T14:30:00Z"
  }
}
```

---

### GET `/bikes`

Listar bicicletas do usuário

**Query Parameters:**
- `status` - `active|stolen|recovered` (padrão: all)
- `page` - número da página (padrão: 1)
- `limit` - itens por página (padrão: 20, máx: 100)
- `sort` - `created_at|brand|status` (padrão: created_at)
- `order` - `asc|desc` (padrão: desc)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "bike-550e8400-e29b-41d4-a716-446655440000",
      "brand": "Caloi",
      "model": "Elite 2024",
      "color": "Preto",
      "status": "active",
      "alerta_bike_code": "AB-123-CD-456",
      "registered_at": "2024-06-08T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3
  }
}
```

---

### GET `/bikes/:id`

Obter detalhes de uma bicicleta

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "bike-550e8400-e29b-41d4-a716-446655440000",
    "brand": "Caloi",
    "model": "Elite 2024",
    "color": "Preto",
    "chassis_number": "ABC123DEF456",
    "frame_number": "XYZ789",
    "bike_type": "mountain",
    "weight_kg": 12.5,
    "status": "active",
    "alerta_bike_code": "AB-123-CD-456",
    "components": {
      "brake_type": "Hydraulic disc",
      "shifter": "Shimano",
      "wheels": "29 polegadas"
    },
    "photos": [
      "https://cdn.alertabike.com.br/bikes/..."
    ],
    "registered_at": "2024-06-08T14:30:00Z",
    "alerts_count": 0
  }
}
```

---

### PUT `/bikes/:id`

Atualizar bicicleta

**Request:**
```json
{
  "brand": "Caloi",
  "model": "Elite Pro 2024",
  "color": "Branco"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "bike-550e8400-e29b-41d4-a716-446655440000",
    "brand": "Caloi",
    "model": "Elite Pro 2024",
    "color": "Branco",
    "updated_at": "2024-06-08T15:45:00Z"
  }
}
```

---

### DELETE `/bikes/:id`

Deletar bicicleta

**Response (204 No Content):**
```
(sem body)
```

---

## 🚨 Alertas de Emergência

### POST `/alerts`

Disparar novo alerta de emergência

**Request:**
```json
{
  "bike_id": "bike-550e8400-e29b-41d4-a716-446655440000",
  "alert_type": "theft",
  "location": {
    "latitude": -23.5505,
    "longitude": -46.6333,
    "accuracy_meters": 20
  },
  "description": "Bicicleta roubada em frente à Estação Faria Lima",
  "police_report_number": "2024/123456"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "alert-550e8400-e29b-41d4-a716-446655440000",
    "bike_id": "bike-550e8400-e29b-41d4-a716-446655440000",
    "alert_type": "theft",
    "status": "active",
    "location": {
      "latitude": -23.5505,
      "longitude": -46.6333,
      "address": "Avenida Paulista, 1000 - São Paulo, SP"
    },
    "created_at": "2024-06-08T15:45:00Z",
    "broadcast_count": 234,
    "share_link": "https://alertabike.com.br/alerts/alert-550e8400..."
  }
}
```

---

### GET `/alerts`

Listar alertas do usuário

**Query Parameters:**
- `status` - `active|resolved|cancelled` (padrão: all)
- `page` - número da página (padrão: 1)
- `limit` - itens por página (padrão: 20, máx: 100)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "alert-550e8400-e29b-41d4-a716-446655440000",
      "bike_id": "bike-550e8400-e29b-41d4-a716-446655440000",
      "bike_name": "Caloi Elite",
      "alert_type": "theft",
      "status": "active",
      "location": {
        "latitude": -23.5505,
        "longitude": -46.6333
      },
      "description": "Bicicleta roubada",
      "created_at": "2024-06-08T15:45:00Z",
      "responses_count": 12
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5
  }
}
```

---

### GET `/alerts/:id`

Obter detalhes de um alerta

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "alert-550e8400-e29b-41d4-a716-446655440000",
    "bike_id": "bike-550e8400-e29b-41d4-a716-446655440000",
    "bike": {
      "brand": "Caloi",
      "model": "Elite 2024",
      "color": "Preto",
      "photo": "https://cdn.alertabike.com.br/..."
    },
    "alert_type": "theft",
    "status": "active",
    "location": {
      "latitude": -23.5505,
      "longitude": -46.6333,
      "address": "Avenida Paulista, 1000 - São Paulo, SP"
    },
    "description": "Bicicleta roubada em frente à Estação Faria Lima",
    "created_at": "2024-06-08T15:45:00Z",
    "responses": [
      {
        "id": "resp-001",
        "user_name": "Maria Silva",
        "message": "Vi uma bicicleta preta próxima à praça",
        "location": {
          "latitude": -23.5510,
          "longitude": -46.6340
        },
        "created_at": "2024-06-08T16:00:00Z"
      }
    ],
    "responses_count": 12,
    "broadcast_count": 450
  }
}
```

---

### GET `/alerts/nearby`

Buscar alertas próximos à localização

**Query Parameters:**
- `latitude` - latitude (obrigatório)
- `longitude` - longitude (obrigatório)
- `radius_km` - raio em km (padrão: 5, máx: 50)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "alert-550e8400-e29b-41d4-a716-446655440000",
      "bike_name": "Caloi Elite",
      "alert_type": "theft",
      "distance_km": 0.8,
      "location": {
        "latitude": -23.5505,
        "longitude": -46.6333,
        "address": "Avenida Paulista, 1000 - São Paulo, SP"
      },
      "created_at": "2024-06-08T15:45:00Z"
    }
  ],
  "count": 1,
  "user_location": {
    "latitude": -23.5505,
    "longitude": -46.6333
  }
}
```

---

### POST `/alerts/:id/response`

Responder a um alerta

**Request:**
```json
{
  "message": "Vi uma bicicleta preta próxima à praça",
  "location": {
    "latitude": -23.5510,
    "longitude": -46.6340
  },
  "photos": [
    "data:image/jpeg;base64,..."
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "resp-001",
    "alert_id": "alert-550e8400-e29b-41d4-a716-446655440000",
    "message": "Vi uma bicicleta preta próxima à praça",
    "created_at": "2024-06-08T16:00:00Z"
  }
}
```

---

### PUT `/alerts/:id/status`

Atualizar status do alerta

**Request:**
```json
{
  "status": "resolved",
  "resolution_details": "Bicicleta recuperada intacta"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "alert-550e8400-e29b-41d4-a716-446655440000",
    "status": "resolved",
    "resolved_at": "2024-06-08T18:30:00Z"
  }
}
```

**Status válidos:** `active | resolved | cancelled`

---

## 🔍 Consulta de Procedência

### POST `/procedence/verify`

Verificar procedência de uma bicicleta (público - sem autenticação)

**Request:**
```json
{
  "chassis_number": "ABC123DEF456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "found": true,
    "status": "active",
    "owner_verified": true,
    "registration_date": "2024-01-15T10:30:00Z",
    "alerts": [
      {
        "id": "alert-550e8400-e29b-41d4-a716-446655440000",
        "type": "theft",
        "status": "resolved"
      }
    ],
    "alert_count": 1
  }
}
```

---

### POST `/procedence/image-recognition`

Reconhecimento de chassis por imagem usando IA

**Request:**
```json
{
  "image_base64": "data:image/jpeg;base64,..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "confidence": 0.95,
    "chassis_detected": "ABC123DEF456",
    "procedence_info": {
      "found": true,
      "status": "active",
      "registration_date": "2024-01-15T10:30:00Z"
    }
  }
}
```

---

### GET `/procedence/search`

Buscar por chassis, marca ou modelo

**Query Parameters:**
- `q` - termo de busca (obrigatório)
- `type` - `chassis|brand|model` (padrão: chassis)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "chassis_number": "ABC123DEF456",
      "brand": "Caloi",
      "model": "Elite 2024",
      "status": "active",
      "registration_date": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

---

## 🔔 Notificações (WebSocket)

### Conexão WebSocket

```
Desenvolvimento:  ws://localhost:5000
Produção:        wss://api.alertabike.com.br
```

### Autenticação

```javascript
const socket = io('http://localhost:5000', {
  auth: {
    token: 'seu_jwt_token'
  }
});
```

### Eventos do Servidor

#### `alert:new`
Novo alerta próximo ao usuário
```json
{
  "type": "alert:new",
  "data": {
    "id": "alert-550e8400-e29b-41d4-a716-446655440000",
    "bike_name": "Caloi Elite",
    "distance_km": 0.8
  }
}
```

#### `alert:update`
Atualização de um alerta
```json
{
  "type": "alert:update",
  "data": {
    "id": "alert-550e8400-e29b-41d4-a716-446655440000",
    "status": "resolved"
  }
}
```

#### `notification:send`
Notificação geral
```json
{
  "type": "notification:send",
  "data": {
    "title": "Alerta próximo",
    "message": "Uma bicicleta foi roubada a 500m de você",
    "action_url": "/alerts/alert-550e8400..."
  }
}
```

---

## ⚠️ Tratamento de Erros

### Formato de Erro

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Descrição legível do erro",
    "details": [
      {
        "field": "email",
        "issue": "Email já registrado"
      }
    ]
  }
}
```

### Códigos de Erro

| Código HTTP | Código de Erro | Descrição |
|-------------|---|-----------|
| 400 | `INVALID_REQUEST` | Dados inválidos |
| 401 | `UNAUTHORIZED` | Token inválido ou expirado |
| 403 | `FORBIDDEN` | Acesso negado |
| 404 | `NOT_FOUND` | Recurso não encontrado |
| 409 | `CONFLICT` | Recurso duplicado |
| 422 | `VALIDATION_ERROR` | Erro de validação |
| 429 | `RATE_LIMIT` | Limite de requisições excedido |
| 500 | `INTERNAL_ERROR` | Erro interno do servidor |

---

## 🚦 Rate Limiting

### Headers de Rate Limit

Toda resposta inclui:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1686250000
```

### Limites Padrão

| Endpoint | Limite | Janela |
|----------|--------|--------|
| `/auth/login` | 5 | 15 minutos |
| `/alerts` | 10 | 1 minuto |
| `/procedence/verify` | 30 | 1 minuto |
| Outros | 100 | 15 minutos |

---

## 🔒 Segurança

### HTTPS

Todas as requisições em produção devem usar HTTPS.

### CORS

Headers CORS configurados para:
```
Access-Control-Allow-Origin: https://alertabike.com.br
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### JWT

Token JWT com claims:

```json
{
  "sub": "user_id",
  "iat": 1686250000,
  "exp": 1686253600,
  "iss": "Alerta Bike API",
  "role": "user"
}
```

### Data Sanitization

Todas as entradas são validadas e sanitizadas contra:
- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)

---

## 📚 Exemplos de Integração

### cURL

```bash
# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","password":"SenhaSegura123!"}'

# Registrar bicicleta
curl -X POST http://localhost:5000/api/v1/bikes \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"brand":"Caloi","model":"Elite 2024","chassis_number":"ABC123"}'
```

### JavaScript

```javascript
// Autenticação
const response = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'joao@example.com',
    password: 'SenhaSegura123!'
  })
});

const { data } = await response.json();
localStorage.setItem('access_token', data.access_token);

// Registrar bicicleta
fetch('/api/v1/bikes', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    brand: 'Caloi',
    model: 'Elite 2024',
    chassis_number: 'ABC123'
  })
});
```

---

**API Version:** 1.0.0  
**Última atualização:** 8 de junho de 2026  
**Desenvolvido com ❤️ para a segurança de ciclistas no Brasil**
