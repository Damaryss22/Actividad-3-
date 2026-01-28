import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// � DEFINICIÓN DE LA TOOL MCP (EXACTA DEL EXAMEN)
const TOOL_DEFINITION = {
  name: "exam2p_query_audit",
  description: "Consulta los registros de auditoría del sistema exam2-audit-service. Permite obtener logs de auditoría con información sobre acciones realizadas (CREATE, UPDATE, DELETE) en diferentes entidades del sistema.",
  inputSchema: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        description: "Número máximo de registros de auditoría a consultar. Si no se especifica, devuelve todos los registros."
      }
    },
    required: []
  }
};

// 🔧 ENDPOINT MCP: Lista de herramientas disponibles
app.post("/tools/list", (req, res) => {
  res.json({
    jsonrpc: "2.0",
    id: req.body.id,
    result: {
      tools: [TOOL_DEFINITION]
    }
  });
});

// 🔧 ENDPOINT MCP: Ejecutar herramienta
app.post("/tools/call", async (req, res) => {
  const { params, id } = req.body;
  const { name, arguments: args } = params;

  if (name === "exam2p_query_audit") {
    const limit = args?.limit;

    let url = "http://localhost:3001/exam2p-audit";
    if (limit) {
      url += `?limit=${limit}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      return res.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2)
            }
          ]
        }
      });
    } catch (error) {
      return res.json({
        jsonrpc: "2.0",
        id,
        error: {
          code: -32603,
          message: `Error al consultar auditorías: ${error.message}`
        }
      });
    }
  }

  res.json({
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: "Herramienta no encontrada" }
  });
});

// 🔧 ENDPOINT LEGACY (para compatibilidad)
app.post("/mcp", async (req, res) => {
  const { method, params, id } = req.body;

  if (method === "exam2p_query_audit") {
    const limit = params?.limit;

    let url = "http://localhost:3001/exam2p-audit";
    if (limit) {
      url += `?limit=${limit}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      return res.json({
        jsonrpc: "2.0",
        id,
        result: data
      });
    } catch (error) {
      return res.json({
        jsonrpc: "2.0",
        id,
        error: { code: -32603, message: error.message }
      });
    }
  }

  res.json({
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: "Método no encontrado" }
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🧠 MCP Server escuchando en http://localhost:${PORT}`);
  console.log(`📋 Tool disponible: exam2p_query_audit`);
  console.log(`🔗 Conecta a: http://localhost:3001/exam2p-audit`);
});
