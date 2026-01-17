# 🔄 Integración n8n - Sistema de Gestión Turística

Este directorio contiene la configuración de **n8n** para automatizar notificaciones y sincronizaciones del sistema de gestión de usuarios y reseñas turísticas.

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Eventos del Sistema](#-eventos-del-sistema)
- [Workflows Implementados](#-workflows-implementados)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso de los Workflows](#-uso-de-los-workflows)
- [Credenciales Requeridas](#-credenciales-requeridas)

---

## 🎯 Descripción General

La integración con **n8n** permite:

1. **Notificaciones en tiempo real** con mensajes generados por IA (Gemini)
2. **Sincronización automática** con Google Sheets para control administrativo
3. **Sistema de alertas inteligente** basado en niveles de urgencia

### Arquitectura de Integración

```
┌─────────────────┐
│  ms-usuario     │──┐
│  (Puerto 3003)  │  │
└─────────────────┘  │
                     │ HTTP POST
┌─────────────────┐  │ (Webhooks)
│  ms-resena      │──┤
│  (Puerto 3004)  │  │
└─────────────────┘  │
                     ▼
              ┌──────────────┐
              │   n8n        │
              │ (Puerto 5678)│
              └──────┬───────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    Telegram    Google      Email
              Sheets
```

---

## 📡 Eventos del Sistema

### Eventos de Usuario (ms-usuario)

| Evento | Descripción | Criticidad | Datos Emitidos |
|--------|-------------|------------|----------------|
| `usuario.creado` | Se registra un nuevo usuario | Info | usuario_id, nombre, correo, tipo, idioma_preferido, fecha_registro |

### Eventos de Reseña (ms-resena)

| Evento | Descripción | Criticidad | Datos Emitidos |
|--------|-------------|------------|----------------|
| `resena.creada` | Se publica una nueva reseña | Info | resena_id, autor, destino, mensaje, calificacion, usuario_id, fecha_creacion |
| `resena.calificacion_baja` | Reseña con calificación < 3 | **Crítico** | Mismos datos + nivel_urgencia (alta/media) |

### Estructura de Payload de Webhook

```json
{
  "evento": "usuario.creado",
  "timestamp": "2026-01-13T10:30:00.000Z",
  "data": {
    "usuario_id": "123",
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "tipo": "turistalocal",
    "idioma_preferido": "es",
    "fecha_registro": "2026-01-13T10:30:00.000Z"
  },
  "metadata": {
    "source": "ms-usuario",
    "environment": "development",
    "correlation_id": "1736764200000-abc123"
  }
}
```

---

## 🔧 Workflows Implementados

### 1️⃣ Workflow de Notificación en Tiempo Real

**Archivo:** `01-notificacion-tiempo-real.json`

**Propósito:** Enviar notificaciones inmediatas a Telegram cuando ocurren eventos importantes, con mensajes personalizados generados por IA.

**Flujo de Nodos:**
```
Webhook → IF (Validar) → Set (Transformar) → Gemini AI → 
Set (Preparar) → Telegram → Respond OK
```

**Características:**
- ✅ Validación de datos de entrada
- 🤖 Generación de mensajes con Gemini 2.0 Flash
- 📱 Notificación vía Telegram con formato Markdown
- 🔄 Respuesta de confirmación al backend

**Webhook URL:** `http://localhost:5678/webhook/tourist-event-workflow`

---

### 2️⃣ Workflow de Sincronización con Google Sheets

**Archivo:** `02-sincronizacion-sheets.json`

**Propósito:** Registrar cada operación en una hoja de cálculo de Google Sheets para control administrativo y generación de reportes.

**Flujo de Nodos:**
```
Webhook → Set (Transformar) → Google Sheets (Append) → Respond OK
```

**Columnas en Google Sheets:**
| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| fecha_hora | Timestamp del evento | 2026-01-13T10:30:00.000Z |
| tipo_evento | Nombre del evento | usuario.creado |
| id_registro | ID del registro | usr_123 |
| descripcion | Descripción detallada | Usuario: Juan - Email: juan@example.com |
| usuario | Nombre del usuario | Juan Pérez |
| estado | Estado del evento | COMPLETADO / CRITICO |
| origen | Microservicio origen | ms-usuario / ms-resena |

**Webhook URL:** `http://localhost:5678/webhook/sheets-sync-workflow`

---

### 3️⃣ Workflow de Alertas de Condiciones Críticas

**Archivo:** `03-alertas-criticas.json`

**Propósito:** Evaluar condiciones críticas y notificar según el nivel de urgencia determinado por IA.

**Flujo de Nodos:**
```
Webhook → IF (¿Crítico?) → Gemini (Analizar) → Switch (Urgencia) →
├─ Alta: Telegram inmediato
├─ Media: Email
└─ Baja: Log
```

**Lógica de Decisión:**

| Nivel | Condición | Acción |
|-------|-----------|--------|
| **Alta** | Calificación = 1 | 🚨 Telegram inmediato |
| **Media** | Calificación = 2 | 📧 Email de alerta |
| **Baja** | Calificación ≥ 3 o evento normal | 📝 Solo log |

**Webhook URL:** `http://localhost:5678/webhook/alert-workflow`

---

## 🚀 Instalación y Configuración

### Paso 1: Iniciar n8n con Docker

```bash
cd n8n
docker-compose up -d
```

Esto iniciará n8n en `http://localhost:5678`

**Credenciales de acceso:**
- Usuario: `admin`
- Contraseña: `uleam2025`

### Paso 2: Importar Workflows

1. Acceder a n8n: `http://localhost:5678`
2. Ir a **Workflows** → **Import from File**
3. Importar cada archivo JSON de la carpeta `workflows/`:
   - `01-notificacion-tiempo-real.json`
   - `02-sincronizacion-sheets.json`
   - `03-alertas-criticas.json`

### Paso 3: Configurar Variables de Entorno en los Microservicios

**Para ms-usuario:**

Copiar `.env.example` a `.env` en `apps/backend/src/ms-usuario/`:

```bash
cp .env.example .env
```

Editar `.env`:
```env
PORT=3003
N8N_WEBHOOK_URL_1=http://localhost:5678/webhook/tourist-event-workflow
N8N_WEBHOOK_URL_2=http://localhost:5678/webhook/sheets-sync-workflow
N8N_WEBHOOK_URL_3=http://localhost:5678/webhook/alert-workflow
NODE_ENV=development
```

**Para ms-resena:**

Copiar `.env.example` a `.env` en `apps/backend/src/ms-resena/`:

```bash
cp .env.example .env
```

Usar la misma configuración que ms-usuario, cambiando el puerto:
```env
PORT=3004
# ... resto de variables iguales
```

### Paso 4: Activar los Workflows en n8n

1. Abrir cada workflow en n8n
2. Hacer clic en el botón **"Active"** para activarlo
3. Verificar que el webhook esté activo

---

## 🔐 Credenciales Requeridas

### 1. Gemini API Key (Para IA)

**Obtener API Key:**
1. Ir a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crear una nueva API Key
3. Copiar la clave

**Configurar en n8n:**
1. Ir a **Settings** → **Credentials** → **New**
2. Seleccionar **HTTP Query Auth**
3. Configurar:
   - **Name:** `Gemini API Key`
   - **Query Parameter Name:** `key`
   - **Query Parameter Value:** `TU_API_KEY_AQUI`

### 2. Telegram Bot (Para Notificaciones)

**Crear Bot:**
1. Hablar con [@BotFather](https://t.me/botfather) en Telegram
2. Enviar `/newbot`
3. Seguir instrucciones y copiar el **Bot Token**
4. Iniciar chat con tu bot y obtener el **Chat ID**:
   ```bash
   # Enviar mensaje a tu bot y luego:
   curl https://api.telegram.org/bot<TOKEN>/getUpdates
   ```

**Configurar en n8n:**
1. **Settings** → **Credentials** → **New**
2. Seleccionar **Telegram API**
3. Configurar:
   - **Name:** `Telegram Bot`
   - **Access Token:** `TU_BOT_TOKEN`
   - **Chat ID:** `TU_CHAT_ID`

### 3. Google Sheets (Para Sincronización)

**Configurar OAuth2:**
1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear proyecto nuevo
3. Habilitar **Google Sheets API**
4. Crear credenciales OAuth 2.0
5. Descargar JSON de credenciales

**Configurar en n8n:**
1. **Settings** → **Credentials** → **New**
2. Seleccionar **Google Sheets OAuth2 API**
3. Seguir flujo de autenticación
4. Actualizar el `documentId` en el workflow con tu ID de hoja

**Crear Google Sheet:**
1. Crear nueva hoja de cálculo
2. Renombrar primera hoja a "Eventos"
3. Agregar encabezados:
   ```
   Fecha/Hora | Tipo de Evento | ID Registro | Descripción | Usuario | Estado | Origen
   ```
4. Copiar el ID de la hoja (desde la URL)
5. Actualizar en el workflow `02-sincronizacion-sheets.json`

### 4. Email (Para Alertas Media Urgencia)

**Configurar cuenta de email:**
1. **Settings** → **Credentials** → **New**
2. Seleccionar **Email Send Account**
3. Configurar SMTP:
   - **Host:** `smtp.gmail.com` (o tu proveedor)
   - **Port:** `587`
   - **User:** `tu-email@gmail.com`
   - **Password:** App Password (no contraseña normal)

---

## 📊 Uso de los Workflows

### Ejemplo 1: Crear Usuario

Cuando se crea un usuario en `ms-usuario`, el sistema emite automáticamente el evento:

```typescript
// En usuario.service.ts
await this.webhookService.emit('usuario.creado', {
  usuario_id: savedUsuario.id,
  nombre: savedUsuario.nombre,
  correo: savedUsuario.correo,
  tipo: savedUsuario.tipo || 'usuario',
  idioma_preferido: savedUsuario.idiomaPreferido || 'es',
  fecha_registro: new Date().toISOString(),
});
```

**Resultado:**
- ✅ Notificación en Telegram con mensaje personalizado de IA
- ✅ Registro en Google Sheets
- ✅ Log en sistema (si no es crítico)

### Ejemplo 2: Crear Reseña con Calificación Baja

Cuando se crea una reseña con calificación < 3:

```typescript
// En resena.service.ts
if (savedResena.calificacion < 3) {
  await this.webhookService.emit('resena.calificacion_baja', {
    resena_id: savedResena.id,
    autor: savedResena.autor,
    destino: savedResena.destino,
    calificacion: savedResena.calificacion,
    nivel_urgencia: savedResena.calificacion === 1 ? 'alta' : 'media',
  });
}
```

**Resultado:**
- 🚨 Si calificación = 1: Telegram inmediato + Sheets
- 📧 Si calificación = 2: Email + Sheets
- 📝 Si calificación ≥ 3: Solo Sheets

---

## 🧪 Pruebas

### Probar Webhooks Manualmente

```bash
# Probar Workflow 1 (Notificación)
curl -X POST http://localhost:5678/webhook/tourist-event-workflow \
  -H "Content-Type: application/json" \
  -d '{
    "evento": "usuario.creado",
    "timestamp": "2026-01-13T10:30:00.000Z",
    "data": {
      "usuario_id": "test123",
      "nombre": "Usuario Prueba",
      "correo": "test@example.com",
      "tipo": "turista",
      "idioma_preferido": "es",
      "fecha_registro": "2026-01-13T10:30:00.000Z"
    },
    "metadata": {
      "source": "ms-usuario",
      "environment": "development",
      "correlation_id": "test-123"
    }
  }'

# Probar Workflow 3 (Alerta Crítica)
curl -X POST http://localhost:5678/webhook/alert-workflow \
  -H "Content-Type: application/json" \
  -d '{
    "evento": "resena.calificacion_baja",
    "timestamp": "2026-01-13T10:30:00.000Z",
    "data": {
      "resena_id": "res123",
      "autor": "Cliente Insatisfecho",
      "destino": "Hotel XYZ",
      "mensaje": "Muy mala experiencia",
      "calificacion": 1,
      "usuario_id": "usr456",
      "nivel_urgencia": "alta"
    }
  }'
```

---

## 🔍 Monitoreo y Logs

### Ver Logs de n8n

```bash
docker logs n8n-taller-ia-mcp -f
```

### Ver Ejecuciones en n8n

1. Acceder a n8n: `http://localhost:5678`
2. Ir a **Executions**
3. Ver historial de ejecuciones con detalles

### Verificar Conexión desde Microservicios

```bash
# Verificar que el webhook esté accesible
curl http://localhost:5678/webhook/tourist-event-workflow
```

---

## 🛠️ Troubleshooting

### Problema: Webhooks no se ejecutan

**Solución:**
1. Verificar que n8n esté corriendo: `docker ps`
2. Verificar que los workflows estén **activos**
3. Revisar las URLs en los `.env` de los microservicios

### Problema: Error en Gemini AI

**Solución:**
1. Verificar que la API Key de Gemini sea válida
2. Verificar cuota de API en Google AI Studio
3. Revisar formato del request en el nodo HTTP

### Problema: Telegram no envía mensajes

**Solución:**
1. Verificar Bot Token y Chat ID
2. Asegurarse de haber iniciado chat con el bot
3. Verificar que el bot no esté bloqueado

### Problema: Google Sheets no se actualiza

**Solución:**
1. Verificar autenticación OAuth2
2. Verificar permisos de la hoja de cálculo
3. Verificar que el Sheet ID sea correcto

---

## 📚 Recursos Adicionales

- [Documentación oficial de n8n](https://docs.n8n.io/)
- [API de Gemini](https://ai.google.dev/docs)
- [API de Telegram Bot](https://core.telegram.org/bots/api)
- [Google Sheets API](https://developers.google.com/sheets/api)

---

## 👥 Equipo de Desarrollo

**Proyecto:** Sistema de Gestión Turística con IA  
**Institución:** ULEAM  
**Taller:** Integración n8n - Taller 4

---

## 📝 Notas Importantes

1. **Seguridad:** Nunca commitar archivos `.env` con credenciales reales
2. **Producción:** Cambiar URLs de `localhost` a URLs públicas/internas
3. **Rate Limits:** Considerar límites de APIs (Gemini, Telegram)
4. **Persistencia:** Los datos de n8n se guardan en el volumen Docker `n8n_data`

---

¡La integración está lista para usar! 🚀
