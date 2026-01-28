import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
const app = express();
app.use(cors());
app.use(express.json());
const GEMINI_API_KEY = "AIzaSyD-p-hcobvgNEvfkw5lsGHVV98T9WxYyUc";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const AUDIT_DATA = [
    {
        logId: 77,
        exam2p_entity: "User",
        exam2p_recordId: 101,
        exam2p_action: "DELETE",
        exam2p_user: "admin",
        exam2p_timestamp: "2026-01-27T19:30:00Z",
        exam2p_detail: "Usuario eliminado del sistema"
    },
    {
        logId: 78,
        exam2p_entity: "Order",
        exam2p_recordId: 202,
        exam2p_action: "DELETE",
        exam2p_user: "system",
        exam2p_timestamp: "2026-01-27T19:25:00Z",
        exam2p_detail: "Orden cancelada automáticamente"
    },
    {
        logId: 79,
        exam2p_entity: "Product",
        exam2p_recordId: 303,
        exam2p_action: "DELETE",
        exam2p_user: "admin",
        exam2p_timestamp: "2026-01-27T19:20:00Z",
        exam2p_detail: "Producto descontinuado"
    },
    {
        logId: 80,
        exam2p_entity: "Customer",
        exam2p_recordId: 404,
        exam2p_action: "DELETE",
        exam2p_user: "support",
        exam2p_timestamp: "2026-01-27T19:15:00Z",
        exam2p_detail: "Cliente dado de baja por inactividad"
    },
    {
        logId: 81,
        exam2p_entity: "Invoice",
        exam2p_recordId: 505,
        exam2p_action: "DELETE",
        exam2p_user: "finance",
        exam2p_timestamp: "2026-01-27T19:10:00Z",
        exam2p_detail: "Factura anulada"
    }
];
const tools = [{
        functionDeclarations: [{
                name: "exam2p_query_audit",
                description: "Consulta los registros de auditoría del sistema. Devuelve información sobre acciones DELETE realizadas en el sistema, incluyendo entidad, usuario y fecha.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        limit: {
                            type: "NUMBER",
                            description: "Número máximo de registros a retornar"
                        }
                    }
                }
            }]
    }];
const systemInstruction = `Actúa como una IA integrada a un sistema empresarial mediante MCP (Model Context Protocol).

Dispones de la herramienta:
- exam2p_query_audit

Objetivo:
Consultar los registros de auditoría del sistema y responder de forma clara y estructurada.

Instrucciones:
1. Usa la herramienta exam2p_query_audit para obtener los registros de auditoría.
2. Analiza los datos recibidos.
3. Genera una respuesta en lenguaje natural que explique:
   - Qué acción se realizó
   - Sobre qué entidad
   - Quién la realizó
   - En qué fecha
4. Resume la información como si fuera un reporte de auditoría entendible para un usuario no técnico.

Formato de respuesta:
- Título: "Reporte de Auditoría del Sistema"
- Lista de eventos encontrados (máximo 150 palabras)
- Conclusión breve sobre el estado del sistema`;
app.post("/gemini/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Se requiere 'message'" });
    }
    console.log("\n👤 Usuario:", message);
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            tools: tools,
            systemInstruction: systemInstruction
        });
        const chat = model.startChat();
        let result = await chat.sendMessage(message);
        let functionCall = result.response.functionCalls()?.[0];
        if (functionCall && functionCall.name === "exam2p_query_audit") {
            console.log("✅ Gemini solicitó usar la tool");
            const limit = functionCall.args?.limit || 5;
            const data = AUDIT_DATA.slice(0, limit);
            console.log(`📊 Retornando ${data.length} registros`);
            result = await chat.sendMessage([{
                    functionResponse: {
                        name: "exam2p_query_audit",
                        response: {
                            success: true,
                            total: data.length,
                            registros: data
                        }
                    }
                }]);
        }
        const finalText = result.response.text();
        console.log("🤖 Respuesta:", finalText.substring(0, 100) + "...");
        res.json({
            success: true,
            message: finalText,
            usedTool: functionCall ? "exam2p_query_audit" : null
        });
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "MCP Server - Audit",
        timestamp: new Date().toISOString()
    });
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`\n🧠 MCP Server corriendo en puerto ${PORT}`);
    console.log(`📋 Tool: exam2p_query_audit`);
    console.log(`✨ Endpoint: POST http://localhost:${PORT}/gemini/chat\n`);
});
//# sourceMappingURL=server-simple.js.map