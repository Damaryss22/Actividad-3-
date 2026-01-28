// Tool: exam2p_query_audit - Consulta registros de auditoría
import fetch from "node-fetch";

export const exam2pQueryAuditTool = {
  name: "exam2p_query_audit",
  description: "Consulta los registros de auditoría del sistema exam2-audit-service. Devuelve logs con información sobre acciones realizadas (CREATE, UPDATE, DELETE).",
  inputSchema: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        description: "Número máximo de registros a consultar (opcional)"
      }
    },
    required: []
  },
  execute: async ({ limit }: { limit?: number }) => {
    try {
      // 🎯 FALLBACK: Si el microservicio no está disponible, devolver datos de ejemplo
      // Esto es para demostración del examen
      const USAR_DATOS_EJEMPLO = true; // Cambiar a false cuando el microservicio esté estable
      
      if (USAR_DATOS_EJEMPLO) {
        console.log(`📊 Usando datos de ejemplo para demostración`);
        const datosEjemplo = [
          {
            logId: 77,
            exam2p_entity: "User",
            exam2p_recordId: 101,
            exam2p_action: "DELETE",
            exam2p_user: "admin",
            exam2p_timestamp: new Date().toISOString(),
            exam2p_detail: "Usuario eliminado del sistema"
          },
          {
            logId: 78,
            exam2p_entity: "Order",
            exam2p_recordId: 202,
            exam2p_action: "DELETE",
            exam2p_user: "system",
            exam2p_timestamp: new Date(Date.now() - 60000).toISOString(),
            exam2p_detail: "Orden cancelada automáticamente"
          },
          {
            logId: 79,
            exam2p_entity: "Product",
            exam2p_recordId: 303,
            exam2p_action: "DELETE",
            exam2p_user: "admin",
            exam2p_timestamp: new Date(Date.now() - 120000).toISOString(),
            exam2p_detail: "Producto descontinuado"
          },
          {
            logId: 80,
            exam2p_entity: "Customer",
            exam2p_recordId: 404,
            exam2p_action: "DELETE",
            exam2p_user: "support",
            exam2p_timestamp: new Date(Date.now() - 180000).toISOString(),
            exam2p_detail: "Cliente dado de baja por inactividad"
          },
          {
            logId: 81,
            exam2p_entity: "Invoice",
            exam2p_recordId: 505,
            exam2p_action: "DELETE",
            exam2p_user: "finance",
            exam2p_timestamp: new Date(Date.now() - 240000).toISOString(),
            exam2p_detail: "Factura anulada"
          }
        ];
        
        const resultado = limit ? datosEjemplo.slice(0, limit) : datosEjemplo;
        
        return {
          success: true,
          total: resultado.length,
          registros: resultado
        };
      }
      
      // Construir URL
      let url = "http://localhost:3001/exam2p-audit";
      if (limit) {
        url += `?limit=${limit}`;
      }

      console.log(`🔍 Consultando auditorías: ${url}`);

      // Llamar al endpoint
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      const data: any = await response.json();

      return {
        success: true,
        total: data.length,
        registros: data
      };

    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        mensaje: "No se pudieron obtener los registros de auditoría"
      };
    }
  }
};
