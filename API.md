# 🔌 Especificação de API REST - Bike Segura

## Base URL

```
Desenvolvimento:  http://localhost:3001/api
Produção:        https://api.bikesegura.gov.br/api
```

---

## 📋 Índice de Endpoints

- [Autenticação](#-autenticação)
- [Bicicletas](#-bicicletas)
- [Alertas](#-alertas)
- [Usuários](#-usuários)
- [Geolocalização](#-geolocalização)

---

## 🔐 Autenticação

### POST `/auth/login`

Inicia fluxo de autenticação com Gov.br

**Request:**
```json
{
  "gov_br_code": "string"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "gov_br_id": "12345678901",
    "phone": "+55 11 99999-8888"
  }
}
```

**Headers:**
```
Content-Type: application/json
```

---

### POST `/auth/refresh`

Renova token de acesso expirado

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 3600
}
```

---

### POST `/auth/logout`

Finaliza sessão do usuário

**Response (200 OK):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

## 🚲 Bicicletas

### POST `/bikes`

Registra uma nova bicicleta

**Request:**
```json
{
  "name": "Caloi Elite",
  "brand": "Caloi",
  "model": "Elite 2024",
  "chassi": "ABC123DEF456",
  "color": "Preto",
  "photo_base64": "data:image/jpeg;base64,/9j/4AAQSkZJRg==...",
  "location": {
    "latitude": -23.5505,
    "longitude": -46.6333
  }
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Caloi Elite",
  "brand": "Caloi",
  "chassi": "ABC123DEF456",
  "status": "active",
  "registered_at": "2024-06-08T14:30:00Z"
}
```

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

---

### GET `/bikes/:id`

Recupera detalhes de uma bicicleta

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Caloi Elite",
  "brand": "Caloi",
  "model": "Elite 2024",
  "chassi": "ABC123DEF456",
  "color": "Preto",
  "status": "active",
  "registered_at": "2024-06-08T14:30:00Z"
}
```

---

### GET `/bikes/lookup/:chassi`

Consulta procedência de uma bicicleta (público)

**Response (200 OK):**
```json
{
  "registered": true,
  "owner_name": "João Silva",
  "status": "active",
  "verified": true,
  "registration_date": "2024-01-15T10:30:00Z"
}
```

---

### PUT `/bikes/:id`

Atualiza dados de uma bicicleta

**Request:**
```json
{
  "name": "Caloi Elite Pro",
  "color": "Branco"
}
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Caloi Elite Pro",
  "updated_at": "2024-06-08T15:45:00Z"
}
```

---

### DELETE `/bikes/:id`

Remove uma bicicleta

**Response (204 No Content):**
```
(sem body)
```

---

### GET `/bikes`

Lista todas as bicicletas do usuário

**Query Parameters:**
- `status`: `active | stolen | recovered`
- `page`: número da página (default: 1)
- `limit`: itens por página (default: 20, max: 100)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Caloi Elite",
      "brand": "Caloi",
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

---

## 🚨 Alertas

### POST `/alerts`

Dispara um alerta de emergência

**Request:**
```json
{
  "bike_id": "550e8400-e29b-41d4-a716-446655440000",
  "alert_type": "theft",
  "location": {
    "latitude": -23.5505,
    "longitude": -46.6333,
    "accuracy": 10
  },
  "description": "Bicicleta roubada em frente à Estação Faria Lima"
}
```

**Response (201 Created):**
```json
{
  "id": "alert-123456789",
  "bike_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "active",
  "created_at": "2024-06-08T15:45:00Z",
  "broadcast_count": 234
}
```

---

### GET `/alerts/:id`

Recupera detalhes de um alerta

**Response (200 OK):**
```json
{
  "id": "alert-123456789",
  "bike_id": "550e8400-e29b-41d4-a716-446655440000",
  "bike_name": "Caloi Elite",
  "alert_type": "theft",
  "location": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "description": "Bicicleta roubada",
  "status": "active",
  "created_at": "2024-06-08T15:45:00Z",
  "responses": 12
}
```

---

### GET `/alerts/nearby`

Busca alertas próximos

**Query Parameters:**
- `latitude`: número
- `longitude`: número
- `radius_km`: número (default: 5)

**Response (200 OK):**
```json
{
  "alerts": [
    {
      "id": "alert-123456789",
      "bike_name": "Caloi Elite",
      "distance_km": 0.8,
      "created_at": "2024-06-08T15:45:00Z"
    }
  ],
  "count": 1
}
```

---

### POST `/alerts/:id/response`

Responde a um alerta

**Request:**
```json
{
  "message": "Vi uma bicicleta preta próxima à praça",
  "location": {
    "latitude": -23.5510,
    "longitude": -46.6340
  }
}
```

**Response (201 Created):**
```json
{
  "id": "resp-001",
  "alert_id": "alert-123456789",
  "message": "Vi uma bicicleta preta próxima à praça",
  "responded_at": "2024-06-08T16:00:00Z"
}
```

---

### PUT `/alerts/:id/status`

Atualiza o status de um alerta

**Request:**
```json
{
  "status": "resolved"
}
```

**Response (200 OK):**
```json
{
  "id": "alert-123456789",
  "status": "resolved",
  "resolved_at": "2024-06-08T18:30:00Z"
}
```

**Status válidos:** `active | resolved | cancelled`

---

## 👥 Usuários

### GET `/users/me`

Obtém perfil do usuário autenticado

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "João Silva",
  "email": "joao@example.com",
  "bikes_count": 2,
  "alerts_created": 1,
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### PUT `/users/me`

Atualiza perfil do usuário

**Request:**
```json
{
  "name": "João Silva Santos",
  "phone": "+55 11 98888-7777"
}
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "João Silva Santos",
  "updated_at": "2024-06-08T16:30:00Z"
}
```

---

## 📍 Geolocalização

### GET `/geo/address`

Converte coordenadas em endereço

**Query Parameters:**
- `latitude`: número
- `longitude`: número

**Response (200 OK):**
```json
{
  "address": "Avenida Paulista, 1000 - São Paulo, SP",
  "city": "São Paulo",
  "state": "SP",
  "zip_code": "01310-100"
}
```

---

## 🛡️ Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token inválido |
| 403 | Forbidden - Acesso negado |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Recurso duplicado |
| 429 | Too Many Requests - Rate limit |
| 500 | Internal Server Error |

---

## 🔄 Fluxo de Autenticação com Gov.br

```
1. Cliente clica em "Entrar com Gov.br"
2. Redirecionado para OAuth de Gov.br
3. Usuário faz login no Gov.br
4. Gov.br redireciona com código
5. Frontend envia POST /api/auth/login
6. Backend troca código por token
7. JWT armazenado no frontend
8. Todas as requisições incluem: Authorization: Bearer <access_token>
```

---

**API Version:** 1.0.0  
**Desenvolvido com ❤️ para a segurança de ciclistas no Brasil**
