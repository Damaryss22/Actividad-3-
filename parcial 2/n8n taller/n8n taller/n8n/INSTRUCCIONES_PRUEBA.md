# 🧪 Instrucciones de Prueba - Sistema de Usuarios y Reseñas con n8n

## 📋 Flujo de Demostración Completo

### Escenario 1: Creación de Usuario

**1. Usuario envía mensaje al API Gateway:**
```
"Quiero crear un usuario llamado Juan Pérez con correo juan@example.com y contraseña segura123"
```

**2. API Gateway + Gemini:**
- Decide ejecutar el tool `crear_usuario`
- Extrae parámetros: nombre="Juan Pérez", correo="juan@example.com", contraseña="segura123"

**3. MCP Server:**
- Ejecuta el Tool via JSON-RPC al microservicio ms-usuario (puerto 3003)

**4. Backend (ms-usuario):**
- Registra usuario en SQLite (`usuario.db`)
- **Emite webhook `usuario.creado` a n8n** con payload:
```json
{
  "evento": "usuario.creado",
  "timestamp": "2026-01-13T10:30:00.000Z",
  "data": {
    "usuario_id": "uuid-123",
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "tipo": "usuario",
    "idioma_preferido": "es",
    "fecha_registro": "2026-01-13T10:30:00.000Z"
  },
  "metadata": {
    "source": "ms-usuario",
    "environment": "development"
  }
}
```

**5. n8n Workflow 1 (Notificación en Tiempo Real):**
- Recibe evento en webhook: `http://localhost:5678/webhook/tourist-event-workflow`
- Valida datos (IF)
- Transforma datos (Set)
- Gemini genera mensaje: "👤 Usuario Juan Pérez registrado exitosamente con correo juan@example.com"
- Telegram envía notificación al chat configurado
- Responde OK al backend

**6. n8n Workflow 2 (Sincronización Google Sheets):**
- Recibe mismo evento en: `http://localhost:5678/webhook/tourist-sheets-sync`
- Transforma datos
- Añade fila a Google Sheets:
  ```
  | Fecha/Hora | Tipo Evento | ID | Descripción | Usuario | Estado |
  | 2026-01-13 10:30 | usuario.creado | uuid-123 | Juan Pérez | juan@example.com | activo |
  ```

**7. Respuesta al usuario:**
```
"✅ El usuario Juan Pérez ha sido registrado exitosamente. Correo: juan@example.com"
```

---

### Escenario 2: Creación de Reseña (Calificación Baja - Crítica)

**1. Usuario envía mensaje:**
```
"Quiero crear una reseña del destino Galápagos escrita por María López con calificación 2 y mensaje: Experiencia decepcionante"
```

**2. API Gateway + Gemini:**
- Decide ejecutar el tool `crear_resena`
- Extrae parámetros: autor="María López", destino="Galápagos", calificacion=2, mensaje="Experiencia decepcionante"

**3. MCP Server:**
- Ejecuta el Tool via JSON-RPC al microservicio ms-resena (puerto 3004)

**4. Backend (ms-resena):**
- Registra reseña en SQLite (`resena.db`)
- **Emite webhook `resena.creada`**
- **Detecta calificación < 3**
- **Emite webhook `resena.calificacion_baja`** (CRÍTICO) con payload:
```json
{
  "evento": "resena.calificacion_baja",
  "timestamp": "2026-01-13T11:00:00.000Z",
  "data": {
    "resena_id": "uuid-456",
    "autor": "María López",
    "destino": "Galápagos",
    "mensaje": "Experiencia decepcionante",
    "calificacion": 2,
    "nivel_urgencia": "media",
    "fecha_creacion": "2026-01-13T11:00:00.000Z"
  },
  "metadata": {
    "source": "ms-resena",
    "environment": "development"
  }
}
```

**5. n8n Workflow 3 (Alertas Críticas):**
- Recibe evento en: `http://localhost:5678/webhook/tourist-critical-alert`
- IF detecta evento crítico: `resena.calificacion_baja`
- Gemini analiza severidad: "Calificación baja (2/5) en destino Galápagos"
- Switch evalúa `nivel_urgencia`:
  - `alta` (calificación = 1) → Telegram inmediato
  - `media` (calificación = 2) → Email + log
  - `baja` → Solo log
- Envía alerta por canal apropiado

**6. n8n Workflows 1 y 2 también procesan `resena.creada`**

**7. Respuesta al usuario:**
```
"✅ Reseña registrada. Autor: María López | Destino: Galápagos | Calificación: 2/5
⚠️ Alerta: Calificación baja detectada - Se ha notificado al equipo de calidad"
```

---

## 🔧 Configuración Requerida

### 1. Variables de Entorno

**ms-usuario (.env):**
```env
N8N_WEBHOOK_URL_1=http://localhost:5678/webhook/tourist-event-workflow
N8N_WEBHOOK_URL_2=http://localhost:5678/webhook/tourist-sheets-sync
N8N_WEBHOOK_URL_3=http://localhost:5678/webhook/tourist-critical-alert
```

**ms-resena (.env):**
```env
N8N_WEBHOOK_URL_1=http://localhost:5678/webhook/tourist-event-workflow
N8N_WEBHOOK_URL_2=http://localhost:5678/webhook/tourist-sheets-sync
N8N_WEBHOOK_URL_3=http://localhost:5678/webhook/tourist-critical-alert
```

### 2. Iniciar Servicios

```bash
# 1. Iniciar n8n
cd n8n
docker-compose up -d

# Acceder a n8n: http://localhost:5678
# Usuario: admin
# Contraseña: uleam2025

# 2. Importar workflows
# - En n8n UI: Import → Seleccionar archivos JSON de n8n/workflows/

# 3. Configurar credenciales en n8n:
# - Gemini API Key
# - Telegram Bot Token
# - Google Sheets OAuth2

# 4. Activar los 3 workflows en n8n

# 5. Iniciar microservicios backend
cd apps/backend/src/ms-usuario
npm run start:dev

cd apps/backend/src/ms-resena
npm run start:dev

# 6. Iniciar MCP Server
cd apps/mcp-server
npm start

# 7. Iniciar API Gateway
cd apps/api-gateway
npm run start:dev
```

---

## 📊 Eventos del Sistema

| Evento | Origen | Tipo | Trigger Workflow |
|--------|--------|------|------------------|
| `usuario.creado` | ms-usuario | Info | 1, 2 |
| `usuario.actualizado` | ms-usuario | Info | 1, 2 |
| `resena.creada` | ms-resena | Principal | 1, 2 |
| `resena.calificacion_baja` | ms-resena | Crítico | 1, 2, 3 |

---

## ✅ Checklist de Verificación

- [ ] n8n corriendo en puerto 5678
- [ ] 3 workflows importados y activados
- [ ] Credenciales configuradas (Gemini, Telegram, Google Sheets)
- [ ] ms-usuario iniciado (puerto 3003)
- [ ] ms-resena iniciado (puerto 3004)
- [ ] Variables N8N_WEBHOOK_URL configuradas
- [ ] MCP Server corriendo (puerto 3001)
- [ ] API Gateway corriendo (puerto 3000)
- [ ] Bot de Telegram creado con BotFather
- [ ] Google Sheet creado con columnas correctas
- [ ] Prueba de webhook manual exitosa

---

## 🧪 Prueba Manual de Webhook

```bash
# Probar evento usuario.creado
curl -X POST http://localhost:5678/webhook/tourist-event-workflow \
  -H "Content-Type: application/json" \
  -d '{
    "evento": "usuario.creado",
    "timestamp": "2026-01-13T10:00:00Z",
    "data": {
      "usuario_id": "test-123",
      "nombre": "Test User",
      "correo": "test@example.com",
      "tipo": "usuario",
      "idioma_preferido": "es"
    },
    "metadata": {
      "source": "ms-usuario",
      "environment": "development"
    }
  }'

# Probar evento resena.calificacion_baja (crítico)
curl -X POST http://localhost:5678/webhook/tourist-critical-alert \
  -H "Content-Type: application/json" \
  -d '{
    "evento": "resena.calificacion_baja",
    "timestamp": "2026-01-13T10:00:00Z",
    "data": {
      "resena_id": "test-456",
      "autor": "Test Author",
      "destino": "Test Destination",
      "calificacion": 1,
      "mensaje": "Muy mala experiencia",
      "nivel_urgencia": "alta"
    },
    "metadata": {
      "source": "ms-resena",
      "environment": "development"
    }
  }'
```

---

## 🎯 Resultados Esperados

### ✅ Usuario Creado
- Mensaje en Telegram recibido
- Fila añadida en Google Sheets
- Log en consola de ms-usuario confirmando envío
- Respuesta 200 OK en n8n

### ⚠️ Reseña Calificación Baja
- Alerta crítica en Telegram (si calificación = 1)
- Email enviado (si calificación = 2)
- Fila en Google Sheets con flag de alerta
- Workflow 3 ejecutado correctamente

---

## 📱 Configuración Telegram Bot

1. Abrir Telegram y buscar @BotFather
2. Ejecutar `/newbot`
3. Dar nombre y username al bot
4. Copiar el token recibido
5. Agregar bot a un grupo o chat
6. Obtener chat_id enviando mensaje y usando:
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
7. Configurar en n8n:
   - Credentials → Add → Telegram
   - Access Token: pegar token
   - Chat ID: pegar chat_id

---

## 📊 Configuración Google Sheets

1. Crear hoja de cálculo en Google Sheets
2. Nombrar: "Registro Eventos Turísticos"
3. Crear encabezados:
   ```
   Fecha/Hora | Tipo de Evento | ID Registro | Descripción | Usuario | Estado
   ```
4. En n8n:
   - Credentials → Add → Google Sheets OAuth2
   - Conectar cuenta de Google
   - Seleccionar hoja en nodo Google Sheets

---

## 🔍 Troubleshooting

### Webhook no llega a n8n
- Verificar que n8n esté corriendo: `docker ps`
- Verificar URLs en .env
- Verificar que workflow esté activado en n8n
- Revisar logs: `docker logs n8n`

### Gemini no responde
- Verificar API Key configurada
- Verificar límites de rate en cuenta de Google AI
- Revisar formato del JSON del request

### Telegram no envía mensajes
- Verificar token del bot
- Verificar chat_id correcto
- Verificar que el bot esté en el chat/grupo

---

## 📝 Notas Importantes

1. **Los webhooks se emiten automáticamente** después de crear usuario o reseña
2. **No requiere RabbitMQ** - comunicación directa HTTP
3. **Eventos críticos** disparan múltiples workflows simultáneamente
4. **Gemini procesa** y genera mensajes contextuales inteligentes
5. **Google Sheets** sirve como auditoría permanente de eventos
