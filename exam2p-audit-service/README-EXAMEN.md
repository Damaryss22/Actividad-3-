# 📝 EXAM2P - Servicio de Auditoría

> Proyecto adaptado EXACTAMENTE a los requisitos del examen

---

## 📦 COMPONENTES

### 1️⃣ Microservicio NestJS
- **Nombre**: `exam2-audit-service`
- **Puerto HTTP**: `3001`
- **Base de datos**: SQLite (`exam2-audit.db`)

### 2️⃣ Entidad
- **Nombre**: `Exam2AuditLog`
- **Campos**:
  - `logId` (number, PK, autoincrement)
  - `exam2p_entity` (string)
  - `exam2p_recordId` (number)
  - `exam2p_action` (string: "CREATE" | "UPDATE" | "DELETE")
  - `exam2p_user` (string)
  - `exam2p_timestamp` (Date)
  - `exam2p_detail` (string)

### 3️⃣ Eventos RabbitMQ
- **Evento escuchado**: `exam2p.record.deleted`
- **Acción guardada**: `"DELETE"`

### 4️⃣ Webhook n8n
- **Evento emitido**: `exam2p.audit.deletion`
- **Condición**: Cuando `exam2p_action === "DELETE"`
- **Payload**:
  ```json
  {
    "event": "exam2p.audit.deletion",
    "timestamp": "...",
    "data": { ... }
  }
  ```

### 5️⃣ Endpoint REST
- **GET** `/exam2p-audit`
- **Query param**: `?limit=10` (opcional)

### 6️⃣ MCP Tool
- **Nombre**: `exam2p_query_audit`
- **Puerto**: `4000`
- **Parámetro**: `limit` (opcional)

---

## 🚀 INSTRUCCIONES DE INSTALACIÓN

### PASO 1: Instalar dependencias del microservicio
```bash
npm install
```

### PASO 2: Levantar RabbitMQ y n8n con Docker
```bash
docker-compose up -d
```

Esto levantará:
- **RabbitMQ**: http://localhost:15672 (user: `guest`, pass: `guest`)
- **n8n**: http://localhost:5678

### PASO 3: Iniciar el microservicio NestJS
```bash
npm run start:dev
```

El microservicio estará en: http://localhost:3001

### PASO 4: Iniciar el MCP Server (opcional)
```bash
cd src/exam2p-mcp-gemini
node server.js
```

El MCP Server estará en: http://localhost:4000

---

## 🧪 PRUEBAS

### 1️⃣ Probar RabbitMQ (Pregunta 1)
Publica un mensaje manualmente:

```bash
# Desde Management UI de RabbitMQ (http://localhost:15672)
# Ir a Queues → exam2p_auditoria_queue → Publish message

{
  "exam2p_entity": "usuarios",
  "exam2p_recordId": 123,
  "exam2p_user": "admin",
  "exam2p_detail": "Usuario eliminado del sistema"
}
```

### 2️⃣ Verificar Webhook n8n (Pregunta 2)

1. Crear workflow en n8n: http://localhost:5678
2. Agregar nodo **Webhook**:
   - URL: `webhook-test/exam2p-audit-deletion`
   - Método: POST
3. Escuchar el webhook
4. Enviar un evento a RabbitMQ
5. Verificar que llegue el log: **"Webhook enviado a n8n"**

### 3️⃣ Probar REST API (Pregunta 3)
```bash
# Obtener todos los registros
curl http://localhost:3001/exam2p-audit

# Con límite
curl http://localhost:3001/exam2p-audit?limit=5
```

### 4️⃣ Probar MCP Tool (Pregunta 4)
```bash
curl -X POST http://localhost:4000/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "exam2p_query_audit",
    "params": { "limit": 10 },
    "id": 1
  }'
```

---

## 📂 ARCHIVOS MODIFICADOS/CREADOS

### ✅ Modificados
- ✏️ `src/auditoria/exam2-audit-log.entity.ts` (antes: `exam2p-registro-auditoria.entity.ts`)
- ✏️ `src/auditoria/auditoria.service.ts`
- ✏️ `src/auditoria/auditoria.controller.ts`
- ✏️ `src/auditoria/auditoria.module.ts`
- ✏️ `src/webhook/webhook-emitter.service.ts`
- ✏️ `src/app.module.ts`
- ✏️ `src/main.ts`
- ✏️ `src/exam2p-mcp-gemini/server.js`

### ✅ Creados
- 🆕 `docker-compose.yml`
- 🆕 `README-EXAMEN.md` (este archivo)

---

## 🐳 COMANDOS DOCKER

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios (SIN borrar volúmenes)
docker-compose stop

# Detener y eliminar contenedores (volúmenes persisten)
docker-compose down

# Detener y eliminar TODO (incluye volúmenes)
docker-compose down -v
```

---

## ✅ CHECKLIST DEL EXAMEN

- [x] Entidad `Exam2AuditLog` con campos exactos
- [x] Evento RabbitMQ: `exam2p.record.deleted`
- [x] Acción: `"DELETE"`
- [x] Webhook: `exam2p.audit.deletion`
- [x] Endpoint: `GET /exam2p-audit`
- [x] MCP Tool: `exam2p_query_audit`
- [x] Docker Compose para RabbitMQ y n8n
- [x] Volúmenes persistentes
- [x] Puertos por defecto (5672, 15672, 5678)

---

## 📋 NOTAS IMPORTANTES

- **NO** cambiar nombres de eventos, endpoints o tools
- **NO** agregar funcionalidades extras
- Los nombres están EXACTAMENTE como pide el examen
- SQLite se usa para simplicidad (examen)
- `synchronize: true` está permitido para el examen
- El microservicio corre FUERA de Docker
- RabbitMQ y n8n corren DENTRO de Docker

---

## 🎯 EVIDENCIAS PARA EL EXAMEN

### Pregunta 1: RabbitMQ
- ✅ Log: `"🔍 Patrón recibido: exam2p.record.deleted"`
- ✅ Log: `"✅ Registro de auditoría guardado"`

### Pregunta 2: Webhook n8n
- ✅ Log: `"Webhook enviado a n8n"`
- ✅ Captura en n8n del payload recibido

### Pregunta 3: REST API
- ✅ Respuesta JSON del endpoint `/exam2p-audit`

### Pregunta 4: MCP Tool
- ✅ JSON Schema con `exam2p_query_audit`
- ✅ Respuesta del MCP Server
