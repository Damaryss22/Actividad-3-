# Configuración de Credenciales para Workflows Completos

## 📋 Resumen

Los 3 workflows están funcionando en modo básico. Para habilitar la funcionalidad completa necesitas configurar:

1. **Telegram Bot** (Workflow 1 - Notificaciones)
2. **Gemini API** (Workflow 1 - IA generativa)
3. **Google Sheets** (Workflow 2 - Sincronización)

---

## 🤖 1. CONFIGURAR TELEGRAM BOT

### Paso 1: Crear el Bot

1. Abre Telegram y busca **@BotFather**
2. Envía el comando: `/newbot`
3. Sigue las instrucciones:
   - Nombre del bot: `ULEAM Tourist Notifier` (o el que prefieras)
   - Username: `uleam_tourist_bot` (debe terminar en _bot)
4. BotFather te dará un **TOKEN** como:
   ```
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz123456789
   ```
5. **GUARDA ESTE TOKEN** (lo necesitarás en n8n)

### Paso 2: Obtener tu Chat ID

1. Busca **@userinfobot** en Telegram
2. Envía cualquier mensaje
3. El bot te responderá con tu **Chat ID** (número como `123456789`)
4. **GUARDA ESTE CHAT ID**

### Paso 3: Configurar en n8n

1. Ve a n8n: http://localhost:5678
2. Click en **Credentials** (menú izquierdo)
3. Click en **Add Credential**
4. Busca y selecciona **Telegram**
5. Ingresa:
   - **Credential Name**: `Telegram ULEAM Bot`
   - **Access Token**: (pega el token de BotFather)
6. Click **Save**

### Paso 4: Reconectar en Workflow 1

1. Abre **Workflow 1** (Notificación Tiempo Real)
2. Busca el nodo **Telegram** (está desconectado)
3. Click en el nodo Telegram
4. En **Credential to connect with**: selecciona `Telegram ULEAM Bot`
5. En **Chat ID**: ingresa tu Chat ID
6. En **Text**: puedes usar:
   ```
   🔔 Nueva Notificación Turística

   Evento: {{ $json.tipo_evento }}
   Datos: {{ $json.datos }}

   Timestamp: {{ $json.timestamp }}
   ```
7. Conecta los nodos:
   - **Set - Transformar Datos** → **Telegram**
   - **Telegram** → **Respond to Webhook**
8. **Save** y **Publish**

---

## 🤖 2. CONFIGURAR GEMINI API

### Paso 1: Obtener API Key

1. Ve a: https://aistudio.google.com/app/apikey
2. Inicia sesión con tu cuenta Google
3. Click en **Get API Key** o **Create API Key**
4. Selecciona un proyecto o crea uno nuevo
5. Copia la **API Key** (como `AIzaSyA...`)
6. **GUARDA ESTA API KEY**

### Paso 2: Configurar en n8n

1. Ve a n8n: http://localhost:5678
2. Click en **Credentials**
3. Click en **Add Credential**
4. Busca y selecciona **Google Gemini** o **Google AI**
5. Ingresa:
   - **Credential Name**: `Gemini ULEAM`
   - **API Key**: (pega tu API key)
6. Click **Save**

### Paso 3: Reconectar en Workflow 1

1. Abre **Workflow 1**
2. Busca el nodo **Gemini** (está desconectado)
3. Click en el nodo
4. En **Credential to connect with**: selecciona `Gemini ULEAM`
5. En **Prompt**: puedes usar:
   ```
   Genera un mensaje amigable y personalizado para notificar el siguiente evento turístico:

   Tipo: {{ $json.tipo_evento }}
   Usuario: {{ $json.datos.nombre }}
   Correo: {{ $json.datos.correo }}

   El mensaje debe ser breve (máximo 100 palabras) y en español.
   ```
6. Conecta los nodos:
   - **Webhook** → **Gemini**
   - **Gemini** → **Set - Transformar Datos**
   - **Set** → **Telegram** → **Respond**
7. **Save** y **Publish**

---

## 📊 3. CONFIGURAR GOOGLE SHEETS

### Paso 1: Crear el Sheet

1. Ve a: https://sheets.google.com
2. Crea una nueva hoja llamada: `ULEAM - Registro Eventos`
3. En la primera fila (headers), escribe:
   ```
   | Timestamp | Tipo Evento | ID Usuario | Nombre | Correo | Datos Adicionales |
   ```
4. **Copia la URL del Sheet** (la necesitarás)

### Paso 2: Configurar OAuth2 en n8n

1. Ve a n8n: http://localhost:5678
2. Click en **Credentials**
3. Click en **Add Credential**
4. Busca **Google Sheets**
5. Selecciona **OAuth2**
6. n8n te mostrará:
   ```
   OAuth Redirect URL: http://localhost:5678/rest/oauth2-credential/callback
   ```
7. **Copia esta URL**

### Paso 3: Crear proyecto en Google Cloud

1. Ve a: https://console.cloud.google.com
2. Crea un nuevo proyecto: `n8n-uleam-integration`
3. Ve a **APIs & Services** → **Library**
4. Busca y habilita: **Google Sheets API**
5. Ve a **APIs & Services** → **Credentials**
6. Click en **Create Credentials** → **OAuth client ID**
7. Si te pide, configura **OAuth consent screen**:
   - User Type: **External**
   - App name: `n8n ULEAM Integration`
   - User support email: tu correo
   - Developer contact: tu correo
   - Scopes: agregar `.../auth/spreadsheets`
8. Vuelve a **Create Credentials** → **OAuth client ID**
9. Application type: **Web application**
10. Authorized redirect URIs: pega la URL de n8n (Paso 2.6)
11. Click **Create**
12. **Copia el Client ID y Client Secret**

### Paso 4: Configurar en n8n

1. Vuelve a n8n → Credentials → Google Sheets
2. Ingresa:
   - **Client ID**: (pega el Client ID)
   - **Client Secret**: (pega el Client Secret)
3. Click en **Connect my account**
4. Autoriza el acceso en la ventana de Google
5. **Save**

### Paso 5: Reconectar en Workflow 2

1. Abre **Workflow 2** (Sincronización Google Sheets)
2. Busca el nodo **Google Sheets** (está desconectado)
3. Click en el nodo
4. En **Credential**: selecciona tu credencial de Google Sheets
5. Configura:
   - **Operation**: `Append`
   - **Document**: pega la URL de tu Google Sheet
   - **Sheet**: `Sheet1` (o el nombre de tu hoja)
   - **Columns**: deja en auto-detect o mapea manualmente:
     ```
     Timestamp: {{ $json.timestamp }}
     Tipo Evento: {{ $json.tipo_evento }}
     ID Usuario: {{ $json.datos.id }}
     Nombre: {{ $json.datos.nombre }}
     Correo: {{ $json.datos.correo }}
     Datos Adicionales: {{ JSON.stringify($json.datos) }}
     ```
6. Conecta los nodos:
   - **Webhook** → **Set - Transformar para Sheets** → **Google Sheets** → **Respond**
7. **Save** y **Publish**

---

## 📧 4. CONFIGURAR EMAIL (Opcional - Workflow 3)

Si quieres habilitar alertas por email en el Workflow 3:

### Usando Gmail

1. Ve a n8n → **Credentials** → **Add Credential**
2. Busca **Gmail**
3. Selecciona **OAuth2**
4. Sigue el proceso similar a Google Sheets:
   - Habilita **Gmail API** en Google Cloud Console
   - Crea OAuth client ID
   - Conecta en n8n

### O usando SMTP genérico

1. Credencial: **SMTP**
2. Ingresa:
   - **Host**: smtp.gmail.com (o tu servidor)
   - **Port**: 587
   - **User**: tu correo
   - **Password**: contraseña de aplicación (Gmail) o tu contraseña
   - **Secure**: Yes

---

## 🧪 ORDEN RECOMENDADO DE CONFIGURACIÓN

1. **Telegram** (más fácil, 5 minutos)
2. **Gemini** (fácil, 3 minutos)
3. **Google Sheets** (más complejo, 15-20 minutos)
4. **Email** (opcional)

---

## ✅ VERIFICACIÓN FINAL

Después de configurar cada servicio:

1. **Telegram + Gemini (Workflow 1)**:
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3003/usuarios" -Method POST -Body (@{
       nombre = "Test Telegram"
       correo = "test@telegram.com"
       contrasena = "test123"
       tipo = "turista"
       idiomaPreferido = "es"
   } | ConvertTo-Json) -ContentType "application/json"
   ```
   - Deberías recibir mensaje en Telegram con texto generado por Gemini

2. **Google Sheets (Workflow 2)**:
   ```powershell
   $body = @{
       tipo_evento = "test.sheets"
       timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
       datos = @{
           id = "test-sheets"
           nombre = "Prueba Sheets"
           correo = "sheets@test.com"
       }
   } | ConvertTo-Json
   Invoke-RestMethod -Uri "http://localhost:5678/webhook/sheets-sync-workflow" -Method POST -Body $body -ContentType "application/json"
   ```
   - Deberías ver una nueva fila en tu Google Sheet

---

## 🆘 TROUBLESHOOTING

### Telegram no envía mensajes
- Verifica que iniciaste conversación con tu bot (envíale /start)
- Confirma que el Chat ID es correcto
- Revisa que el token no tenga espacios

### Gemini da error
- Verifica que la API Key sea válida
- Confirma que el proyecto tiene facturación habilitada (aunque hay tier gratuito)
- Revisa límites de uso: https://ai.google.dev/pricing

### Google Sheets no escribe
- Confirma que compartiste el Sheet con la cuenta de servicio
- Verifica que el nombre de la hoja sea correcto (Sheet1, Hoja 1, etc.)
- Revisa los permisos OAuth2 (debe incluir scope de Sheets)

---

## 📝 NOTAS IMPORTANTES

- **Seguridad**: Las credenciales se guardan en n8n (base de datos local)
- **Persistencia**: Si eliminas el contenedor, las credenciales se pierden
- **Backup**: Exporta las credenciales desde n8n Settings → Export
- **Límites**: Gemini tiene límites de requests/día en tier gratuito
- **Costos**: Telegram y Google Sheets son gratuitos, Gemini tiene tier gratuito

---

## 🎯 RESUMEN DE URLs Y RECURSOS

| Servicio | URL para obtener credenciales |
|----------|-------------------------------|
| Telegram Bot | https://t.me/BotFather |
| Telegram Chat ID | https://t.me/userinfobot |
| Gemini API | https://aistudio.google.com/app/apikey |
| Google Cloud Console | https://console.cloud.google.com |
| Google Sheets | https://sheets.google.com |
| n8n Credentials | http://localhost:5678/credentials |

---

¡Cuando termines de configurar, tendrás un sistema completo con IA, notificaciones y sincronización automática! 🚀
