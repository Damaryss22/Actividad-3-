// Cliente de Gemini AI para probar la tool exam2p_query_audit
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";

// ⚠️ IMPORTANTE: Coloca tu API key de Gemini aquí
const GEMINI_API_KEY = "AIzaSyD-p-hcobvgNEvfkw5lsGHVV98T9WxYyUc";
const MCP_SERVER_URL = "http://localhost:4000";

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Definición de la función para Gemini
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

// Función para ejecutar la tool en el MCP Server
async function executeToolOnMCPServer(functionName: string, args: any) {
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

  const data: any = await response.json();
  return data.result;
}

// Función principal
async function chatWithGemini(userMessage: string) {
  console.log("\n👤 Usuario:", userMessage);
  console.log("─".repeat(60));

  // Configurar el modelo con la tool
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  } as any);

  const chat = model.startChat({
    tools: [{
      functionDeclarations: [functionDeclaration]
    }]
  } as any);

  // Enviar mensaje del usuario
  let result = await chat.sendMessage(userMessage);
  let response: any = result.response;

  // Verificar si Gemini quiere usar la function
  const functionCall = response.functionCalls?.()?.[0];

  if (functionCall) {
    console.log("\n🤖 Gemini decidió usar la tool:", functionCall.name);
    console.log("📋 Argumentos:", JSON.stringify(functionCall.args, null, 2));

    // Ejecutar la tool en el MCP Server
    const toolResult = await executeToolOnMCPServer(
      functionCall.name,
      functionCall.args
    );

    console.log("\n✅ Resultado de la tool:");
    console.log(JSON.stringify(toolResult, null, 2));

    // Enviar el resultado de vuelta a Gemini
    result = await chat.sendMessage([{
      functionResponse: {
        name: functionCall.name,
        response: toolResult
      }
    } as any]);

    response = result.response;
  }

  // Obtener respuesta final de Gemini
  const finalText = response.text();
  console.log("\n🤖 Gemini responde:");
  console.log(finalText);
  console.log("─".repeat(60));
}

// Ejemplos de uso
async function main() {
  console.log("🧠 CLIENTE GEMINI + MCP TOOL");
  console.log("🔗 Conectado a:", MCP_SERVER_URL);
  console.log("═".repeat(60));

  // Prueba 1: Consultar todas las auditorías
  await chatWithGemini(
    "¿Cuáles son los últimos registros de auditoría del sistema?"
  );

  // Prueba 2: Consultar con límite
  await chatWithGemini(
    "Muéstrame solo los últimos 3 registros de auditoría"
  );

  // Prueba 3: Pregunta más natural
  await chatWithGemini(
    "¿Qué acciones se han registrado en el sistema de auditoría?"
  );
}

// Ejecutar
main().catch(console.error);
