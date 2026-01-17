# 🎯 Flujo Completo del Sistema - Usuario y Reseñas con n8n

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE                                  │
│                    (Usuario Final)                               │
└────────────────────┬────────────────────────────────────────────┘
                     │ HTTP Request
                     │ "Crear usuario Juan Pérez con correo..."
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (3000)                            │
│         + Gemini 2.5 Flash + Function Calling                    │
└────────────────────┬────────────────────────────────────────────┘
                     │ JSON-RPC
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MCP SERVER (3001)                             │
│            Ejecuta Tools: crear_usuario, crear_resena            │
└───────┬──────────────────────────────┬──────────────────────────┘
        │ HTTP                         │ HTTP
        ▼                              ▼
┌──────────────────┐          ┌──────────────────┐
│  ms-usuario      │          │   ms-resena      │
│  (Puerto 3003)   │          │  (Puerto 3004)   │
│                  │          │                  │
│ 1. Crea usuario  │          │ 1. Crea reseña   │
│ 2. Guarda SQLite │          │ 2. Guarda SQLite │
│ 3. Emite webhook │          │ 3. Emite webhook │
└────────┬─────────┘          └────────┬─────────┘
         │ HTTP POST                   │ HTTP POST
         │ evento: usuario.creado      │ evento: resena.creada
         │                             │ evento: resena.calificacion_baja (si < 3)
         └──────────┬──────────────────┘
                    ▼
        ════════════════════════════
        ║        n8n (5678)        ║
        ║   Automation Platform    ║
        ════════════════════════════
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐
│Workflow │   │Workflow │   │Workflow │
│    1    │   │    2    │   │    3    │
│Notific. │   │ Sheets  │   │ Alertas │
└────┬────┘   └────┬────┘   └────┬────┘
     │             │              │
     │             │              │
     ▼             ▼              ▼
┌─────────┐   ┌─────────┐   ┌─────────┐
│ Gemini  │   │ Google  │   │Evaluar  │
│  API    │   │ Sheets  │   │Urgencia │
└────┬────┘   └────┬────┘   └────┬────┘
     │             │              │
     ▼             │              ▼
┌─────────┐        │         ┌─────────┐
│Telegram │        │         │ Switch  │
│  Bot    │        │         └────┬────┘
└─────────┘        │              │
                   │    ┌─────────┼─────────┐
                   │    ▼         ▼         ▼
                   │  Alta     Media      Baja
                   │  Telegram Email     Log
                   │
                   ▼
            ┌──────────────┐
            │ Hoja Google  │
            │   Registro   │
            │   Eventos    │
            └──────────────┘
```

## 🔄 Flujo Detallado por Escenario

### Escenario A: Crear Usuario

```
1. Usuario dice: "Crear usuario Juan Pérez con correo juan@example.com"
   │
   ├─► API Gateway procesa con Gemini
   │   └─► Decide usar tool: crear_usuario
   │       └─► Parámetros: {nombre: "Juan Pérez", correo: "juan@example.com"}
   │
   ├─► MCP Server ejecuta tool
   │   └─► Llama a ms-usuario (POST /usuario)
   │
   ├─► ms-usuario
   │   ├─► 1. Guarda en SQLite (usuario.db)
   │   ├─► 2. Emite webhook a n8n
   │   │   └─► POST http://localhost:5678/webhook/tourist-event-workflow
   │   │       {
   │   │         "evento": "usuario.creado",
   │   │         "data": {
   │   │           "usuario_id": "uuid-123",
   │   │           "nombre": "Juan Pérez",
   │   │           "correo": "juan@example.com"
   │   │         }
   │   │       }
   │   └─► 3. Retorna usuario creado
   │
   ├─► n8n Workflow 1 (Notificación)
   │   ├─► Valida datos (IF)
   │   ├─► Transforma datos (Set)
   │   ├─► Gemini genera mensaje: "👤 Usuario Juan Pérez registrado con correo..."
   │   ├─► Telegram envía notificación
   │   └─► Responde OK
   │
   ├─► n8n Workflow 2 (Google Sheets)
   │   ├─► Transforma datos
   │   ├─► Añade fila a Sheet:
   │   │   | 2026-01-13 | usuario.creado | uuid-123 | Juan Pérez | juan@example.com | activo |
   │   └─► Responde OK
   │
   └─► Respuesta al usuario:
       "✅ Usuario Juan Pérez creado exitosamente con correo juan@example.com"
```

### Escenario B: Crear Reseña (Calificación Baja)

```
1. Usuario dice: "Crear reseña de Galápagos con calificación 1, muy malo"
   │
   ├─► API Gateway procesa con Gemini
   │   └─► Decide usar tool: crear_resena
   │       └─► Parámetros: {destino: "Galápagos", calificacion: 1, mensaje: "muy malo"}
   │
   ├─► MCP Server ejecuta tool
   │   └─► Llama a ms-resena (POST /resena)
   │
   ├─► ms-resena
   │   ├─► 1. Guarda en SQLite (resena.db)
   │   ├─► 2. Detecta calificacion < 3 → CRÍTICO
   │   ├─► 3. Emite 2 webhooks:
   │   │   ├─► Evento normal: "resena.creada"
   │   │   └─► Evento crítico: "resena.calificacion_baja"
   │   │       {
   │   │         "evento": "resena.calificacion_baja",
   │   │         "data": {
   │   │           "resena_id": "uuid-456",
   │   │           "destino": "Galápagos",
   │   │           "calificacion": 1,
   │   │           "nivel_urgencia": "alta"
   │   │         }
   │   │       }
   │   └─► 4. Retorna reseña creada
   │
   ├─► n8n Workflow 1 (Notificación) - Procesa "resena.creada"
   │   └─► Telegram: "📝 Nueva reseña de Galápagos..."
   │
   ├─► n8n Workflow 2 (Google Sheets) - Procesa ambos eventos
   │   └─► Añade 2 filas (resena.creada + resena.calificacion_baja)
   │
   ├─► n8n Workflow 3 (Alertas) - Procesa "resena.calificacion_baja"
   │   ├─► IF detecta evento crítico ✓
   │   ├─► Gemini analiza: "Calificación extremadamente baja (1/5)"
   │   ├─► Switch evalúa nivel_urgencia: "alta"
   │   ├─► Ruta ALTA URGENCIA:
   │   │   ├─► 🚨 Telegram INMEDIATO al equipo
   │   │   └─► "ALERTA CRÍTICA: Reseña con calificación 1/5 en Galápagos"
   │   └─► Responde OK
   │
   └─► Respuesta al usuario:
       "✅ Reseña registrada: Galápagos | Calificación: 1/5
        ⚠️ ALERTA: Calificación crítica - Equipo de calidad notificado"
```

## 📋 Tabla de Eventos y Workflows

| Evento | Origen | Tipo | Workflow 1 | Workflow 2 | Workflow 3 |
|--------|--------|------|------------|------------|------------|
| `usuario.creado` | ms-usuario | Info | ✅ Telegram | ✅ Sheets | ❌ |
| `usuario.actualizado` | ms-usuario | Info | ✅ Telegram | ✅ Sheets | ❌ |
| `resena.creada` | ms-resena | Normal | ✅ Telegram | ✅ Sheets | ❌ |
| `resena.calificacion_baja` | ms-resena | **CRÍTICO** | ✅ Telegram | ✅ Sheets | ✅ **Alerta** |

## 🎯 Decisiones de Urgencia (Workflow 3)

```
resena.calificacion_baja recibida
│
├─► IF: ¿Es evento crítico? → SÍ
│
├─► Gemini analiza contexto
│
├─► Switch evalúa nivel_urgencia:
│
├─► nivel_urgencia = "alta" (calificación = 1)
│   └─► 🚨 Telegram INMEDIATO
│       └─► Notificación prioritaria al equipo
│
├─► nivel_urgencia = "media" (calificación = 2)
│   └─► 📧 Email al responsable
│       └─► + Log en sistema
│
└─► nivel_urgencia = "baja" (otra condición)
    └─► 📝 Solo registro en log
        └─► Sin notificación externa
```

## ⚡ Ventajas del Sistema

1. **Emisión Automática**: Backend emite webhooks sin bloquear respuesta
2. **Procesamiento Paralelo**: Los 3 workflows se ejecutan simultáneamente
3. **IA Contextual**: Gemini genera mensajes personalizados según el evento
4. **Auditoría Permanente**: Google Sheets registra todo automáticamente
5. **Alertas Inteligentes**: Workflow 3 solo se activa para eventos críticos
6. **Sin Dependencias Complejas**: Comunicación HTTP directa, sin RabbitMQ
7. **Configuración Visual**: n8n permite modificar workflows sin código

## 🔧 URLs de Webhooks

```
Workflow 1 (Notificación):
http://localhost:5678/webhook/tourist-event-workflow

Workflow 2 (Google Sheets):
http://localhost:5678/webhook/sheets-sync-workflow

Workflow 3 (Alertas):
http://localhost:5678/webhook/alert-workflow
```

## 📊 Ejemplo de Payload Real

```json
{
  "evento": "resena.calificacion_baja",
  "timestamp": "2026-01-13T15:30:00.000Z",
  "data": {
    "resena_id": "550e8400-e29b-41d4-a716-446655440000",
    "autor": "María López",
    "destino": "Galápagos",
    "mensaje": "Experiencia muy decepcionante",
    "calificacion": 1,
    "usuario_id": "330e8400-e29b-41d4-a716-446655440000",
    "nivel_urgencia": "alta",
    "fecha_creacion": "2026-01-13T15:30:00.000Z"
  },
  "metadata": {
    "source": "ms-resena",
    "environment": "production",
    "correlation_id": "cor-123-abc-456"
  }
}
```

---

**💡 Nota**: Este flujo garantiza que cada operación importante del sistema sea notificada, registrada y evaluada automáticamente, sin intervención manual.
