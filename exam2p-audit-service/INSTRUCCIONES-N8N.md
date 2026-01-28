# 🚀 GUÍA RÁPIDA: CONFIGURAR WORKFLOW n8n PARA EL EXAMEN

## 📍 PASO 1: ABRIR n8n

1. Abre tu navegador en: http://localhost:5678
2. Si pide credenciales, usa las que configuraste al iniciar n8n

## 📥 PASO 2: IMPORTAR WORKFLOW

### Opción A - Importar JSON (MÁS RÁPIDO):
1. Click en **☰** (menú hamburguesa arriba izquierda)
2. Click en **Import from File**
3. Selecciona el archivo: `exam2p-audit-workflow.json`
4. Click **Import**

### Opción B - Crear Manualmente:
Si la importación falla, sigue estos pasos:

## 🔧 PASO 3: CONFIGURAR NODOS (SI CREASTE MANUAL)

### 1️⃣ WEBHOOK
- Arrastra nodo **Webhook**
- HTTP Method: `POST`
- Path: `exam2p-audit-deletion`
- Click **Save**

### 2️⃣ IF
- Arrastra nodo **IF**
- Conecta desde Webhook
- Condition:
  - Value 1: `{{$json.data.exam2p_action}}`
  - Operation: `equals`
  - Value 2: `DELETE`
- Click **Save**

### 3️⃣ HTTP REQUEST (Gemini)
- Arrastra nodo **HTTP Request**
- Conecta desde IF (rama TRUE)
- Name: `Gemini`
- Method: `POST`
- URL: `http://localhost:4000/gemini/chat`
- Body Parameters (JSON):
```json
{
  "message": "Se eliminó un registro en la entidad {{$json.data.exam2p_entity}}. Genera un breve reporte de auditoría."
}
```
- Headers:
  - `Content-Type`: `application/json`
- Click **Save**

### 4️⃣ TELEGRAM
- Arrastra nodo **Telegram**
- Conecta desde Gemini
- Operation: `Send Message`
- Chat ID: **TU_CHAT_ID** (ver abajo cómo obtenerlo)
- Message:
```
🚨 Auditoría del Sistema

📋 Entidad: {{$json.data.exam2p_entity}}
⚠️ Acción: {{$json.data.exam2p_action}}
👤 Usuario: {{$json.data.exam2p_user}}

✅ Registro procesado
```
- Click **Save**

### 5️⃣ RESPOND TO WEBHOOK
- Arrastra nodo **Respond to Webhook**
- Conecta desde Telegram Y desde IF (rama FALSE)
- Response Body (JSON):
```json
{
  "success": true,
  "message": "Evento exam2p.audit.deletion procesado correctamente"
}
```
- Click **Save**

## 📱 PASO 4: CONFIGURAR TELEGRAM

### Obtener Chat ID:
1. Abre Telegram
2. Busca el bot: **@userinfobot**
3. Envíale `/start`
4. Te responderá tu Chat ID (número)
5. Copia ese número y úsalo en el nodo Telegram

### Crear Bot (si no tienes):
1. Busca **@BotFather** en Telegram
2. Envía `/newbot`
3. Sigue las instrucciones
4. Guarda el **Token** que te da
5. En n8n, configura las credenciales de Telegram con ese token

## ✅ PASO 5: ACTIVAR WORKFLOW

1. Click en el toggle **Active** (arriba derecha)
2. El workflow debe quedar en verde
3. Copia la URL del webhook que aparece en el nodo Webhook

## 🧪 PASO 6: PROBAR

### Desde Thunder Client o Postman:

**Request:**
```http
POST http://localhost:5678/webhook/exam2p-audit-deletion
Content-Type: application/json

{
  "event": "exam2p.audit.deletion",
  "data": {
    "exam2p_entity": "User",
    "exam2p_recordId": 123,
    "exam2p_action": "DELETE",
    "exam2p_user": "admin"
  }
}
```

**Resultado esperado:**
- ✅ Respuesta HTTP 200
- ✅ JSON con `"success": true`
- ✅ Mensaje en Telegram
- ✅ Workflow se ejecuta (puedes ver en Executions)

## 📸 PASO 7: EVIDENCIAS PARA EL EXAMEN

1. **Screenshot del workflow completo** en n8n
2. **Screenshot del mensaje en Telegram**
3. **Exportar workflow**: Menu → Export → Download

## 🔥 TROUBLESHOOTING

### ❌ Error: "Telegram credentials not found"
- Ve a: Settings → Credentials
- Agrega nueva credencial de Telegram con tu Bot Token

### ❌ Error: "Webhook not found"
- Asegúrate que el workflow esté **Active** (toggle verde)
- Verifica la URL exacta en el nodo Webhook

### ❌ No llega mensaje a Telegram
- Verifica el Chat ID
- Asegúrate de haber iniciado conversación con el bot (`/start`)

### ❌ Gemini falla
- No importa, el examen evalúa el flujo, no que Gemini funcione
- Puedes comentar el nodo Gemini si prefieres

## 📝 TEXTO PARA EL EXAMEN

"Para la pregunta 4 se implementó un workflow en n8n llamado exam2p-audit-workflow que:
1. Recibe webhooks del sistema de auditoría
2. Verifica que la acción sea DELETE
3. Consulta a Gemini AI para generar un reporte
4. Envía notificación a Telegram
5. Responde al webhook confirmando el procesamiento

El workflow permite monitorear en tiempo real las eliminaciones críticas del sistema mediante notificaciones instantáneas."
