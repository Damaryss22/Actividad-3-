### PRUEBA RÁPIDA DEL WORKFLOW

# 1. Asegúrate que n8n esté corriendo
# Abre: http://localhost:5678

# 2. Importa el workflow desde: exam2p-audit-workflow.json

# 3. Actívalo (toggle verde)

# 4. Ejecuta este test desde PowerShell:

$body = @{
    event = "exam2p.audit.deletion"
    data = @{
        exam2p_entity = "User"
        exam2p_recordId = 123
        exam2p_action = "DELETE"
        exam2p_user = "admin"
    }
} | ConvertTo-Json

Invoke-WebRequest `
    -Uri "http://localhost:5678/webhook/exam2p-audit-deletion" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"

# RESULTADO ESPERADO:
# StatusCode: 200
# Content: {"success":true,"message":"Evento exam2p.audit.deletion procesado correctamente"}
