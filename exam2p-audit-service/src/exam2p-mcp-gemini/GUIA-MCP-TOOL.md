# 🧠 MCP TOOL - exam2p_query_audit

## 📋 DEFINICIÓN DE LA TOOL

**Nombre exacto**: `exam2p_query_audit`

**Descripción**: Consulta los registros de auditoría del sistema exam2-audit-service

**Parámetros**:
- `limit` (opcional): Número máximo de registros a devolver

---

## 🚀 INSTRUCCIONES DE USO

### PASO 1: Iniciar el MCP Server

```bash
cd src/exam2p-mcp-gemini
node server.js
```

Deberías ver:
```
🧠 MCP Server escuchando en http://localhost:4000
📋 Tool disponible: exam2p_query_audit
🔗 Conecta a: http://localhost:3001/exam2p-audit
```

---

### PASO 2: Probar la Tool (sin IA)

#### Listar tools disponibles

**PowerShell**:
```powershell
curl.exe -X POST http://localhost:4000/tools/list -H "Content-Type: application/json" -d '{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}'
```

**O usa Invoke-RestMethod**:
```powershell
Invoke-RestMethod -Uri http://localhost:4000/tools/list -Method POST -ContentType "application/json" -Body '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

**Respuesta esperada**:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "exam2p_query_audit",
        "description": "Consulta los registros de auditoría...",
        "inputSchema": { ... }
      }
    ]
  }
}
```

#### Ejecutar la tool (con límite)

**PowerShell**:
```powershell
Invoke-RestMethod -Uri http://localhost:4000/tools/call -Method POST -ContentType "application/json" -Body '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"exam2p_query_audit","arguments":{"limit":5}}}'
```

#### Ejecutar sin límite

**PowerShell**:
```powershell
Invoke-RestMethod -Uri http://localhost:4000/tools/call -Method POST -ContentType "application/json" -Body '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"exam2p_query_audit","arguments":{}}}'
```

---

### PASO 3: Conectar con Gemini (IA)

#### Opción A: Usando Google AI Studio

1. Ve a: https://aistudio.google.com/
2. Crea un nuevo prompt
3. En la sección de "Tools", agrega:
   - **Nombre**: `exam2p_query_audit`
   - **URL**: `http://localhost:4000/tools/call`
   - **Método**: POST
   - **Schema**: (copia desde `tool-schema.json`)

4. Prueba preguntando:
   ```
   "¿Cuáles son los últimos 3 registros de auditoría?"
   "Muéstrame todas las auditorías del sistema"
   "¿Qué acciones se han registrado?"
   ```

#### Opción B: Usando Claude Desktop (Recomendado)

1. Edita tu archivo de configuración de Claude Desktop:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Agrega:
```json
{
  "mcpServers": {
    "exam2p-audit": {
      "command": "node",
      "args": ["server.js"],
      "cwd": "C:/Users/ASUS I7/Desktop/examen2/exam2p-audit-service/src/exam2p-mcp-gemini"
    }
  }
}
```

3. Reinicia Claude Desktop

4. Verifica que la tool aparezca con el ícono de herramienta 🔧

5. Pregunta:
   ```
   "Usa exam2p_query_audit para mostrarme los últimos 5 registros"
   "¿Qué auditorías tenemos registradas?"
   ```

---

## 🧪 PRUEBAS PARA EL EXAMEN

### ✅ Checklist de evidencias

- [ ] **Código del endpoint REST**: `GET /exam2p-audit`
- [ ] **Definición de la tool**: Ver `tool-schema.json`
- [ ] **Servidor MCP funcionando**: Screenshot del log
- [ ] **Respuesta de la tool**: Output de curl
- [ ] **Uso desde IA**: Screenshot de Gemini/Claude usando la tool

### Ejemplo de conversación con IA

**Usuario**: "¿Cuáles son los últimos 3 registros de auditoría?"

**IA (usando exam2p_query_audit)**:
```
He consultado el sistema de auditoría. Los últimos 3 registros son:

1. Acción DELETE en entidad "User", registro ID 1, por usuario "admin"
   Timestamp: 2026-01-27T18:26:09.000Z

2. [otros registros...]
```

---

## 📂 ARCHIVOS CREADOS

```
src/exam2p-mcp-gemini/
├── server.js                  ← Servidor MCP
├── package.json               ← Dependencias
├── tool-schema.json           ← Definición de la tool
├── mcp-config.json            ← Configuración MCP
└── GUIA-MCP-TOOL.md          ← Esta guía
```

---

## 🎯 NOMBRES EXACTOS DEL EXAMEN

- ✅ Tool: `exam2p_query_audit`
- ✅ Endpoint: `/exam2p-audit`
- ✅ Parámetro: `limit`
- ✅ Protocolo: JSON-RPC 2.0
- ✅ Puerto MCP: 4000
- ✅ Puerto API: 3001

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot find module 'express'"
```bash
cd src/exam2p-mcp-gemini
npm install
```

### Error: "ECONNREFUSED localhost:3001"
- Asegúrate de que el microservicio NestJS esté corriendo
- Verifica: `curl http://localhost:3001/exam2p-audit`

### La IA no ve la tool
- Reinicia el cliente de IA
- Verifica que el MCP server esté corriendo
- Revisa la configuración en `claude_desktop_config.json`

---

## ✨ RESULTADO FINAL

Cuando todo funcione, deberías poder:

1. ✅ Hacer `GET /exam2p-audit` manualmente
2. ✅ Listar la tool desde el MCP server
3. ✅ Ejecutar la tool con curl
4. ✅ Usar la IA para consultar auditorías naturalmente

**Esto cumple 100% con la Pregunta 3 del examen.** 🎓
