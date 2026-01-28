import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
const GEMINI_API_KEY = "AIzaSyD-p-hcobvgNEvfkw5lsGHVV98T9WxYyUc";
const MCP_SERVER_URL = "http://localhost:4000";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const functionDeclaration = {
    name: "exam2p_query_audit",
    description: "Consulta los registros de auditoría del sistema exam2-audit-service. Devuelve logs con información sobre acciones realizadas (CREATE, UPDATE, DELETE) en diferentes entidades del sistema.",
    parameters: {
        type: "OBJECT",
        properties: {
            limit: {
                type: "NUMBER",
                description: "Número máximo de registros a consultar (opcional)"
            }
        },
        required: []
    }
};
async function executeToolOnMCPServer(functionName, args) {
    const response = await fetch(`${MCP_SERVER_URL}/mcp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: Date.now(),
            method: functionName,
            params: args
        })
    });
    const data = await response.json();
    return data.result;
}
async function chatWithGemini(userMessage) {
    console.log("\n👤 Usuario:", userMessage);
    console.log("─".repeat(60));
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
    });
    const chat = model.startChat({
        tools: [{
                functionDeclarations: [functionDeclaration]
            }]
    });
    let result = await chat.sendMessage(userMessage);
    let response = result.response;
    const functionCall = response.functionCalls?.()?.[0];
    if (functionCall) {
        console.log("\n🤖 Gemini decidió usar la tool:", functionCall.name);
        console.log("📋 Argumentos:", JSON.stringify(functionCall.args, null, 2));
        const toolResult = await executeToolOnMCPServer(functionCall.name, functionCall.args);
        console.log("\n✅ Resultado de la tool:");
        console.log(JSON.stringify(toolResult, null, 2));
        result = await chat.sendMessage([{
                functionResponse: {
                    name: functionCall.name,
                    response: toolResult
                }
            }]);
        response = result.response;
    }
    const finalText = response.text();
    console.log("\n🤖 Gemini responde:");
    console.log(finalText);
    console.log("─".repeat(60));
}
async function main() {
    console.log("🧠 CLIENTE GEMINI + MCP TOOL");
    console.log("🔗 Conectado a:", MCP_SERVER_URL);
    console.log("═".repeat(60));
    await chatWithGemini("¿Cuáles son los últimos registros de auditoría del sistema?");
    await chatWithGemini("Muéstrame solo los últimos 3 registros de auditoría");
    await chatWithGemini("¿Qué acciones se han registrado en el sistema de auditoría?");
}
main().catch(console.error);
//# sourceMappingURL=gemini-client.js.map