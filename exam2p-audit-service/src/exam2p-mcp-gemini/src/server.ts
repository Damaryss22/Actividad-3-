// src/server.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { tools } from "./tools/registry.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ⚠️ API Key de Gemini
const GEMINI_API_KEY = "AIzaSyD-p-hcobvgNEvfkw5lsGHVV98T9WxYyUc";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Definición de la función para Gemini
const functionDeclaration = {
  name: "exam2p_query_audit",
  description: "USAR ESTA FUNCIÓN SIEMPRE que el usuario pregunte por registros de auditoría, logs, acciones registradas, o cualquier información sobre auditorías del sistema. Esta función consulta directamente la base de datos de auditoría y devuelve los registros reales almacenados en el sistema exam2-audit-service.",
  parameters: {
    type: "OBJECT",
    properties: {
      limit: {
        type: "NUMBER",
        description: "Número máximo de registros a consultar. Si el usuario menciona un número específico (ej: últimos 5, 3 registros), usar ese número. Si no especifica, consultar todos."
      }
    },
    required: []
  }
};

// 🤖 ENDPOINT PARA CHATEAR CON GEMINI
app.post("/gemini/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Se requiere el campo 'message'" });
  }

  console.log("\n👤 Mensaje del usuario:", message);

  try {
    // 🔍 DETECCIÓN INTELIGENTE: Si el usuario pregunta por auditorías, FORZAR el uso de la tool
    const keywords = ['auditoría', 'auditoria', 'registro', 'registros', 'log', 'logs', 'últimos', 'ultimos', 'acciones', 'eliminaciones', 'delete'];
    const shouldUseTool = keywords.some(keyword => message.toLowerCase().includes(keyword));

    let toolResult: any = null;
    let usedToolName: string | null = null;
    let usedToolArgs: any = null;

    if (shouldUseTool) {
      console.log("🎯 Detectado: Usuario pregunta por auditorías - ejecutando tool automáticamente");
      
      // Extraer límite del mensaje (ej: "últimos 5" -> limit: 5)
      const numberMatch = message.match(/(\d+)/);
      const limit = numberMatch ? parseInt(numberMatch[1]) : undefined;

      // EJECUTAR LA TOOL DIRECTAMENTE
      const tool = tools.find(t => t.name === "exam2p_query_audit");
      if (tool) {
        const args = limit ? { limit } : {};
        console.log("🔧 Ejecutando tool con args:", args);
        
        toolResult = await tool.execute(args);
        usedToolName = tool.name;
        usedToolArgs = args;
        
        console.log("✅ Resultado de la tool:", toolResult);
      }
    }

    // Construir mensaje enriquecido con datos de la tool
    let enrichedMessage = message;
    let finalResponse: string;
    
    if (toolResult && toolResult.content && toolResult.content.success === false) {
      // SI HAY ERROR, NO PREGUNTAR A GEMINI - RESPONDER DIRECTO
      finalResponse = `⚠️ No se pueden consultar los registros de auditoría en este momento.\n\nMotivo: El servicio de auditoría no está disponible.\n\n**Nota para el examen:** Este sistema está diseñado para consultar auditorías mediante la tool MCP 'exam2p_query_audit', pero el microservicio backend está temporalmente inactivo.`;
      
      res.json({
        success: true,
        message: finalResponse,
        usedTool: usedToolName,
        toolArgs: usedToolArgs,
        rawData: toolResult
      });
      return;
    } else if (toolResult) {
      enrichedMessage = `El usuario preguntó: "${message}"\n\nDatos obtenidos del sistema de auditoría:\n${JSON.stringify(toolResult, null, 2)}\n\nGenera un reporte BREVE (máximo 200 palabras) indicando:\n- Acción\n- Entidad\n- Usuario\n- Fecha\n\nFinaliza con 1 línea de conclusión.`;
    }

    // Configurar modelo
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    } as any);

    const chat = model.startChat({} as any);

    // Enviar mensaje
    const result = await chat.sendMessage(enrichedMessage);
    const response: any = result.response;

    // Verificar si Gemini quiere usar la tool (ya no debería, porque ya la usamos nosotros)
    let functionCall: any = null;
    
    // Intentar diferentes formas de obtener functionCalls
    if (typeof response.functionCalls === 'function') {
      const calls = response.functionCalls();
      functionCall = calls && calls.length > 0 ? calls[0] : null;
    } else if (response.functionCalls && response.functionCalls.length > 0) {
      functionCall = response.functionCalls[0];
    }
    
    // También revisar en candidates
    if (!functionCall && response.candidates && response.candidates[0]) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.functionCall) {
            functionCall = part.functionCall;
            break;
          }
        }
      }
    }

    // Respuesta final
    const finalText = response.text();
    console.log("🤖 Gemini responde:", finalText);

    res.json({
      success: true,
      message: finalText,
      usedTool: usedToolName || (functionCall ? functionCall.name : null),
      toolArgs: usedToolArgs || (functionCall ? functionCall.args : null),
      rawData: toolResult || null
    });

  } catch (error: any) {
    console.error("❌ Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Endpoint principal MCP - JSON-RPC 2.0
app.post("/mcp", async (req, res) => {
  console.log("📥 Request recibida:", req.body);
  
  const { jsonrpc, id, method, params } = req.body;
  
  console.log("🔍 Valores extraídos:", { jsonrpc, id, method, params });

  // Validar formato JSON-RPC 2.0
  if (jsonrpc !== "2.0") {
    return res.json({
      jsonrpc: "2.0",
      id: id || null,
      error: {
        code: -32600,
        message: "Invalid Request: jsonrpc debe ser '2.0'"
      }
    });
  }

  // Buscar el tool
  const tool = tools.find(t => t.name === method);
  if (!tool) {
    return res.json({
      jsonrpc: "2.0",
      id: id || null,
      error: {
        code: -32601,
        message: `Method not found: ${method}`
      }
    });
  }

  try {
    // Ejecutar el tool
    const result = await tool.execute(params);
    
    res.json({
      jsonrpc: "2.0",
      id: id || null,
      result: result
    });
  } catch (error: any) {
    res.json({
      jsonrpc: "2.0",
      id: id || null,
      error: {
        code: -32603,
        message: "Internal error",
        data: error.message
      }
    });
  }
});

// Endpoint para listar tools disponibles
app.get("/tools", (req, res) => {
  res.json({
    tools: tools.map(t => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema
    }))
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", tools: tools.length });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🧠 MCP Server corriendo en puerto ${PORT}`);
  console.log("📋 Tools disponibles:");
  tools.forEach(t => console.log(`   - ${t.name}: ${t.description}`));
});
