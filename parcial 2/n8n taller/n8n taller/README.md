# Sistema de Gestión Inteligente - MCP + Gemini + n8n

Sistema de automatización y gestión que integra **Gemini AI**, **Model Context Protocol (MCP)**, **Backend NestJS** y **n8n** para procesamiento inteligente de solicitudes y automatización de workflows.

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  1️⃣  API Gateway + Gemini AI (Puerto 3000)                      │
│  • Recibe solicitudes del usuario                                │
│  • Gemini decide qué Tools ejecutar                              │
│  • Orquesta la comunicación con MCP Server                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  2️⃣  MCP Server (Puerto 3001)                                   │
│  • Expone Tools via JSON-RPC 2.0                                 │
│  • Tools disponibles:                                            │
│    - buscar_usuario                                              │
│    - validar_resena                                              │
│    - crear_resena                                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  3️⃣  Backend NestJS (Puerto 3002)                               │
│  • CRUD de Usuarios y Reseñas                                    │
│  • Base de datos SQLite                                          │
│  • Emite eventos webhook a n8n                                   │
│    - usuario.creado                                              │
│    - resena.creada                                               │
│    - resena.calificacion_baja                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  4️⃣  n8n - Automatización (Puerto 5678)                         │
│  • Workflow 1: Notificación en Tiempo Real (Telegram)            │
│  • Workflow 2: Sincronización con Google Sheets                  │
│  • Workflow 3: Alertas de Condiciones Críticas (Email + Telegram)│
└─────────────────────────────────────────────────────────────────┘
```

## 📋 Componentes del Sistema

### 1. API Gateway + Gemini AI (Puerto 3000)
**Ubicación:** `apps/api-gateway/`

**Responsabilidades:**
- Recibe solicitudes POST en `/chat`
- Gemini 2.5 Flash analiza la intención del usuario
- Decide qué Tools del MCP Server ejecutar
- Orquesta las llamadas secuenciales
- Retorna respuesta al usuario

**Endpoints:**
- `POST /chat` - Enviar mensaje a Gemini
- `GET /chat/models` - Listar modelos disponibles

**Ejemplo:**
```bash
POST http://localhost:3000/chat
{
  "mensaje": "Busca el usuario test@gmail.com"
}
```

### 2. MCP Server (Puerto 3001)
**Ubicación:** `apps/mcp-server/`

**Responsabilidades:**
- Implementa el protocolo JSON-RPC 2.0
- Expone Tools como funciones ejecutables
- Valida parámetros de entrada
- Ejecuta lógica de negocio

**Endpoints:**
- `POST /mcp` - Ejecutar Tools via JSON-RPC 2.0
- `GET /tools` - Listar Tools disponibles
- `GET /health` - Health check

**Tools Disponibles:**

#### `buscar_usuario`
Busca un usuario por correo electrónico.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "buscar_usuario",
    "arguments": {
      "correo": "test@gmail.com"
    }
  }
}
```

#### `validar_resena`
Valida reglas de negocio de una reseña.
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "validar_resena",
    "arguments": {
      "destino": "Quito",
      "calificacion": 5,
      "comentario": "Excelente ciudad"
    }
  }
}
```

#### `crear_resena`
Crea una nueva reseña turística.
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "crear_resena",
    "arguments": {
      "destino": "Galápagos",
      "calificacion": 5,
      "comentario": "Increíble biodiversidad",
      "autor": "Juan Pérez"
    }
  }
}
```

### 3. Backend NestJS (Puerto 3002)
**Ubicación:** `apps/backend/src/ms-gateway/`

**Responsabilidades:**
- API REST para CRUD de Usuarios y Reseñas
- Base de datos SQLite
- Emisión de eventos webhook a n8n

**Endpoints:**
- `POST /usuarios` - Crear usuario
- `POST /resenas` - Crear reseña

**Eventos Emitidos (Webhooks):**
- `usuario.creado` → Cuando se registra un nuevo usuario
- `resena.creada` → Cuando se publica una reseña
- `resena.calificacion_baja` → Cuando una reseña tiene calificación ≤ 2

### 4. n8n - Workflows (Puerto 5678)
**Ubicación:** `n8n/workflows/`

**Credenciales:**
- Usuario: `admin@uleam.edu.ec`
- Contraseña: `uleam2025`

#### Workflow 1: Notificación en Tiempo Real
**Archivo:** `01-notificacion-tiempo-real.json`

**Flujo:**
1. Webhook recibe evento del Backend
2. Gemini AI genera mensaje personalizado
3. Envía notificación a Telegram
4. Responde confirmación al Backend

**Webhook URL:** `http://localhost:5678/webhook/tourist-event-workflow`

#### Workflow 2: Sincronización con Google Sheets
**Archivo:** `02-sincronizacion-sheets.json`

**Flujo:**
1. Webhook recibe evento
2. Transforma datos al formato de Sheets
3. Agrega fila en Google Sheets
4. Responde confirmación

**Webhook URL:** `http://localhost:5678/webhook/sheets-sync-workflow`

#### Workflow 3: Alertas de Condiciones Críticas
**Archivo:** `03-alertas-criticas.json`

**Flujo:**
1. Webhook recibe evento
2. Valida si es condición crítica
3. Gemini analiza nivel de urgencia (ALTA/MEDIA/BAJA)
4. Según urgencia:
   - **ALTA:** Telegram + Email inmediato
   - **MEDIA:** Email de seguimiento
   - **BAJA:** Log solamente

**Webhook URL:** `http://localhost:5678/webhook/alert-workflow`

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+
- Docker Desktop
- npm o yarn

### 1. Instalar Dependencias

```bash
# API Gateway
cd apps/api-gateway
npm install

# MCP Server
cd ../mcp-server
npm install

# Backend NestJS
cd ../backend/src/ms-gateway
npm install
```

### 2. Configurar Variables de Entorno

**API Gateway** (`.env`):
```env
PORT=3000
GEMINI_API_KEY=AIzaSyANy9TQ66CJaQPvLNQQnIDpTYx_6NyVPko
```

### 3. Levantar Servidores

**Terminal 1 - API Gateway:**
```bash
cd apps/api-gateway
npm run start:dev
```

**Terminal 2 - MCP Server:**
```bash
cd apps/mcp-server
npm run dev
```

**Terminal 3 - Backend NestJS:**
```bash
cd apps/backend/src/ms-gateway
npm run start:dev
```

**Terminal 4 - n8n:**
```bash
cd n8n
docker-compose up -d
```

### 4. Verificar que Todo Esté Corriendo

```powershell
# Ver puertos en escucha
netstat -ano | findstr "3000 3001 3002 5678"
```

Deberías ver:
- `3000` - API Gateway ✅
- `3001` - MCP Server ✅
- `3002` - Backend NestJS ✅
- `5678` - n8n ✅

## 📱 Configuración de Credenciales en n8n

### Gemini API (HTTP Query Auth)
1. En n8n → Credentials → Add Credential
2. Busca "HTTP Query Auth"
3. Configura:
   - Name: `Gemini API Key`
   - Query Parameter Name: `key`
   - Query Parameter Value: `AIzaSyANy9TQ66CJaQPvLNQQnIDpTYx_6NyVPko`

### Telegram Bot
1. Crea un bot con @BotFather en Telegram
2. En n8n → Credentials → Add Credential → Telegram API
3. Configura:
   - Access Token: `8466089869:AAHyy2qPSC4-I-flnRhEoq0__dswJQsLXws`
   - Chat ID: `5613928312`

### Google Sheets (OAuth2)
1. Crea proyecto en Google Cloud Console
2. Habilita Google Sheets API y Google Drive API
3. Crea OAuth 2.0 credentials
4. Redirect URI: `http://localhost:5678/rest/oauth2-credential/callback`
5. En n8n → Sign in with Google

### Email SMTP (Mailtrap)
1. Regístrate en https://mailtrap.io
2. En n8n → Credentials → SMTP
3. Configura:
   - Host: `sandbox.smtp.mailtrap.io`
   - Port: `2525`
   - User: `1593d102866cd3`
   - Password: `cc1a8f44859b4`

## 🎯 Escenario de Ejemplo: Sistema de Reseñas Turísticas

### Paso 1: Usuario Envía Solicitud
```bash
POST http://localhost:3000/chat
Content-Type: application/json

{
  "mensaje": "Quiero crear una reseña de Quito con calificación 5 y comentario 'Ciudad hermosa' autor Juan Pérez"
}
```

### Paso 2: API Gateway + Gemini
1. Gemini analiza la solicitud
2. Decide ejecutar: `validar_resena` → `crear_resena`
3. Llama al MCP Server

### Paso 3: MCP Server Ejecuta Tools
```json
// 1. Validar reseña
POST http://localhost:3001/mcp
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "validar_resena",
    "arguments": {
      "destino": "Quito",
      "calificacion": 5,
      "comentario": "Ciudad hermosa"
    }
  }
}

// 2. Crear reseña
POST http://localhost:3001/mcp
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "crear_resena",
    "arguments": {
      "destino": "Quito",
      "calificacion": 5,
      "comentario": "Ciudad hermosa",
      "autor": "Juan Pérez"
    }
  }
}
```

### Paso 4: Backend Registra y Emite Webhook
```javascript
// Backend emite webhook a n8n
POST http://localhost:5678/webhook/tourist-event-workflow
{
  "evento": "resena.creada",
  "data": {
    "resena_id": 1,
    "destino": "Quito",
    "calificacion": 5,
    "comentario": "Ciudad hermosa",
    "autor": "Juan Pérez"
  },
  "timestamp": "2026-01-16T19:00:00Z",
  "metadata": {
    "source": "ms-gateway"
  }
}
```

### Paso 5: n8n Workflow 1 - Notificación Telegram
1. Recibe webhook
2. Gemini genera: "🌍 Nueva reseña registrada para Quito con 5 estrellas"
3. Envía a Telegram

### Paso 6: n8n Workflow 2 - Google Sheets
1. Agrega fila en Sheets:
   | Fecha | Tipo | Destino | Calificación | Autor | Comentario |
   |-------|------|---------|--------------|-------|------------|
   | 2026-01-16 | resena.creada | Quito | 5 | Juan Pérez | Ciudad hermosa |

### Paso 7: Respuesta al Usuario
```json
{
  "respuesta": "La reseña de Quito ha sido registrada exitosamente con calificación de 5 estrellas.",
  "tools_ejecutados": ["validar_resena", "crear_resena"],
  "timestamp": "2026-01-16T19:00:05Z"
}
```

## 🧪 Pruebas

### Probar API Gateway + Gemini
```bash
# Buscar usuario
POST http://localhost:3000/chat
{
  "mensaje": "Busca el usuario test@gmail.com"
}

# Validar reseña
POST http://localhost:3000/chat
{
  "mensaje": "Valida una reseña de Galápagos con calificación 5"
}

# Crear reseña
POST http://localhost:3000/chat
{
  "mensaje": "Crea una reseña de Cuenca, calificación 4, comentario 'Ciudad colonial bella', autor María López"
}
```

### Probar MCP Server Directamente
```bash
# Listar tools
GET http://localhost:3001/tools

# Ejecutar tool
POST http://localhost:3001/mcp
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "buscar_usuario",
    "arguments": {
      "correo": "test@example.com"
    }
  }
}
```

### Probar Backend NestJS
```bash
# Crear usuario
POST http://localhost:3002/usuarios
{
  "nombre": "Test User",
  "correo": "test@example.com"
}

# Crear reseña
POST http://localhost:3002/resenas
{
  "destino": "Quito",
  "calificacion": 5,
  "comentario": "Excelente",
  "autor": "Test User"
}
```

### Probar Webhooks de n8n
```bash
# Workflow 1 - Notificación
POST http://localhost:5678/webhook/tourist-event-workflow
{
  "evento": "usuario.creado",
  "data": {
    "usuario_id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@example.com"
  },
  "timestamp": "2026-01-16T19:00:00Z"
}

# Workflow 3 - Alerta crítica
POST http://localhost:5678/webhook/alert-workflow
{
  "evento": "resena.calificacion_baja",
  "data": {
    "resena_id": 5,
    "destino": "Test",
    "calificacion": 1,
    "autor": "Usuario Insatisfecho"
  },
  "timestamp": "2026-01-16T19:00:00Z"
}
```

## 📚 Tecnologías Utilizadas

- **Node.js 22** - Runtime
- **NestJS** - Framework backend
- **Gemini 2.5 Flash** - IA generativa
- **Model Context Protocol (MCP)** - Protocolo de comunicación
- **n8n** - Automatización de workflows
- **SQLite** - Base de datos
- **Docker** - Containerización
- **Telegram Bot API** - Notificaciones
- **Google Sheets API** - Sincronización
- **Mailtrap** - Email testing

## 📂 Estructura del Proyecto

```
n8n taller/
├── apps/
│   ├── api-gateway/           # API Gateway + Gemini
│   │   ├── src/
│   │   │   ├── chat/          # Controlador de chat
│   │   │   └── main.ts        # Entry point
│   │   └── .env               # Variables de entorno
│   │
│   ├── mcp-server/            # MCP Server
│   │   ├── src/
│   │   │   ├── tools/         # Implementación de Tools
│   │   │   └── server.ts      # Servidor JSON-RPC
│   │   └── package.json
│   │
│   └── backend/
│       └── src/
│           └── ms-gateway/    # Backend NestJS
│               ├── src/
│               │   ├── usuario/   # Módulo usuarios
│               │   └── resena/    # Módulo reseñas
│               └── main.ts
│
├── n8n/
│   ├── docker-compose.yml     # Configuración n8n
│   ├── workflows/             # Workflows JSON
│   │   ├── 01-notificacion-tiempo-real.json
│   │   ├── 02-sincronizacion-sheets.json
│   │   └── 03-alertas-criticas.json
│   ├── CONFIGURACION_CREDENCIALES.md
│   └── README.md
│
└── README.md                  # Este archivo
```

## 🔍 Troubleshooting

### Puerto ya en uso
```bash
# Ver qué proceso usa el puerto
netstat -ano | findstr ":3000"

# Matar proceso (Windows)
taskkill /PID <PID> /F
```

### n8n no arranca
```bash
# Ver logs
docker logs n8n-taller-ia-mcp

# Reiniciar
cd n8n
docker-compose down
docker-compose up -d
```

### Credenciales de n8n no funcionan
```bash
# Resetear n8n (elimina datos)
cd n8n
docker-compose down -v
docker-compose up -d
```

## 📝 Licencia

MIT

## 👥 Autor

Desarrollado para el Taller de IA + MCP + n8n - ULEAM 2025
