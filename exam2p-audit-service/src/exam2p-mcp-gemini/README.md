# 🧠 EXAM2P MCP TOOL + GEMINI AI

## 📋 PREGUNTA 3 DEL EXAMEN

**Tool exacta**: `exam2p_query_audit`  
**Endpoint**: `GET /exam2p-audit`  
**Parámetro opcional**: `limit` (number)

---

## 🚀 INSTALACIÓN Y CONFIGURACIÓN

### 1. Instalar dependencias
```bash
cd src/exam2p-mcp-gemini
npm install
```

### 2. Compilar TypeScript
```bash
npm run build
```

### 3. Iniciar MCP Server
```bash
npm start
```

Deberías ver:
```
🧠 MCP Server corriendo en puerto 4000
📋 Tools disponibles:
   - exam2p_query_audit: Consulta los registros de auditoría...
```

---

## 🧪 PRUEBAS

### OPCIÓN 1: Thunder Client / REST Client (Evidencia básica)

Usa el archivo `test-mcp.http`:

1. **Health Check**
```http
GET http://localhost:4000/health
```

2. **Listar tools**
```http
GET http://localhost:4000/tools
```

3. **Ejecutar tool (todos los registros)**
```http
POST http://localhost:4000/mcp
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "exam2p_query_audit",
  "params": {}
}
```

4. **Ejecutar tool (con límite)**
```http
POST http://localhost:4000/mcp
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "exam2p_query_audit",
  "params": {
    "limit": 5
  }
}
```

---

### OPCIÓN 2: Con Gemini AI (Evidencia completa) ⭐

#### Asegúrate de tener:
1. ✅ MCP Server corriendo (puerto 4000)
2. ✅ Microservicio NestJS corriendo (puerto 3001)
3. ✅ API Key de Gemini en `src/gemini-client.ts`

#### Ejecutar el cliente de Gemini:
```bash
npm run test-gemini
```

#### Qué verás:
```
🧠 CLIENTE GEMINI + MCP TOOL
🔗 Conectado a: http://localhost:4000
════════════════════════════════════════════════════════════

👤 Usuario: ¿Cuáles son los últimos registros de auditoría del sistema?
────────────────────────────────────────────────────────────

🤖 Gemini decidió usar la tool: exam2p_query_audit
📋 Argumentos: {}

✅ Resultado de la tool:
{
  "success": true,
  "total": 5,
  "registros": [...]
}

🤖 Gemini responde:
Los últimos registros de auditoría del sistema son:

1. Registro ID 5: Acción DELETE en entidad User...
2. Registro ID 4: Acción DELETE en entidad Product...
...
```

---

## 📂 ESTRUCTURA DEL PROYECTO

```
exam2p-mcp-gemini/
├── src/
│   ├── server.ts                    ← MCP Server principal
│   ├── gemini-client.ts             ← Cliente de prueba con Gemini
│   └── tools/
│       ├── registry.ts              ← Registro de tools
│       └── exam2p-query-audit.tool.ts ← Tool del examen
├── dist/                            ← Código compilado
├── package.json
├── tsconfig.json
├── test-mcp.http                    ← Pruebas Thunder Client
└── README.md                        ← Esta guía
```

---

## 🎯 EVIDENCIAS PARA EL EXAMEN

### ✅ Checklist

1. **Código de la tool** ✓
   - Archivo: `src/tools/exam2p-query-audit.tool.ts`
   - Nombre exacto: `exam2p_query_audit`
   - JSON Schema con parámetro `limit` opcional

2. **Código del endpoint** ✓
   - Archivo: `../../audit/audit.controller.ts`
   - Endpoint: `GET /exam2p-audit`
   - Query param: `?limit=5`

3. **Prueba desde Thunder Client** ✓
   - Screenshot del request POST a `/mcp`
   - Screenshot de la respuesta JSON con registros

4. **Prueba desde Gemini** ✓
   - Screenshot de la terminal ejecutando `npm run test-gemini`
   - Mostrar que Gemini llama automáticamente a la tool
   - Mostrar la respuesta interpretada por Gemini

---

## 🔧 PREGUNTAS FRECUENTES

### ¿Por qué puerto 4000 y no 3001?

- **Puerto 3001**: Microservicio NestJS (API REST)
- **Puerto 4000**: MCP Server (intermediario para Gemini)

Gemini llama al MCP Server (4000), que a su vez llama a la API (3001).

### ¿Cómo pruebo sin Gemini?

Usa Thunder Client / REST Client con el archivo `test-mcp.http`. Es suficiente para evidencia básica.

### ¿Qué debo mostrar en el examen?

**Mínimo**:
- Código de la tool
- Código del endpoint
- Screenshot de Thunder Client ejecutando la tool

**Completo** (mejor nota):
- Todo lo anterior +
- Screenshot de Gemini usando la tool automáticamente
- Mostrar que Gemini interpreta y explica los resultados

---

## 💡 COMANDOS RÁPIDOS

```bash
# Instalar
npm install

# Compilar
npm run build

# Iniciar MCP Server
npm start

# Probar con Gemini
npm run test-gemini
```

---

## ✨ RESULTADO ESPERADO

Cuando todo funcione:

1. ✅ MCP Server lista la tool `exam2p_query_audit`
2. ✅ Thunder Client puede ejecutarla y ver JSON de auditorías
3. ✅ Gemini AI puede:
   - Detectar cuándo usar la tool
   - Ejecutarla automáticamente
   - Interpretar los resultados
   - Responder en lenguaje natural

**Esto cumple 100% la Pregunta 3 del examen.** 🎓
