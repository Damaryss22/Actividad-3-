#!/usr/bin/env pwsh
# Script de prueba para verificar integración n8n

Write-Host "🧪 Iniciando pruebas de integración n8n..." -ForegroundColor Cyan
Write-Host ""

# Variables
$n8nUrl = "http://localhost:5678"
$workflow1Url = "$n8nUrl/webhook/tourist-event-workflow"
$workflow3Url = "$n8nUrl/webhook/tourist-critical-alert"

Write-Host "📋 Checklist de verificación:" -ForegroundColor Yellow
Write-Host "  [ ] n8n corriendo en puerto 5678" -ForegroundColor Gray
Write-Host "  [ ] Workflows importados y activados en n8n" -ForegroundColor Gray
Write-Host "  [ ] ms-usuario corriendo (puerto 3003)" -ForegroundColor Gray
Write-Host "  [ ] ms-resena corriendo (puerto 3004)" -ForegroundColor Gray
Write-Host ""

Read-Host "Presiona Enter cuando todo esté listo"

Write-Host ""
Write-Host "🧪 Test 1: Webhook usuario.creado" -ForegroundColor Green
Write-Host "Enviando evento a: $workflow1Url" -ForegroundColor Gray

$body1 = @{
    evento = "usuario.creado"
    timestamp = (Get-Date).ToString("o")
    data = @{
        usuario_id = "test-123"
        nombre = "Juan Pérez Test"
        correo = "juan.test@example.com"
        tipo = "usuario"
        idioma_preferido = "es"
        fecha_registro = (Get-Date).ToString("o")
    }
    metadata = @{
        source = "ms-usuario"
        environment = "development"
        correlation_id = "test-correlation-123"
    }
} | ConvertTo-Json -Depth 10

try {
    $response1 = Invoke-RestMethod -Uri $workflow1Url -Method POST -Body $body1 -ContentType "application/json"
    Write-Host "✅ Respuesta recibida: $($response1 | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "⏳ Esperando 3 segundos..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "🧪 Test 2: Webhook resena.creada" -ForegroundColor Green
Write-Host "Enviando evento a: $workflow1Url" -ForegroundColor Gray

$body2 = @{
    evento = "resena.creada"
    timestamp = (Get-Date).ToString("o")
    data = @{
        resena_id = "test-456"
        autor = "María López Test"
        destino = "Galápagos"
        mensaje = "Excelente experiencia de prueba"
        calificacion = 5
        usuario_id = "test-123"
        fecha_creacion = (Get-Date).ToString("o")
    }
    metadata = @{
        source = "ms-resena"
        environment = "development"
        correlation_id = "test-correlation-456"
    }
} | ConvertTo-Json -Depth 10

try {
    $response2 = Invoke-RestMethod -Uri $workflow1Url -Method POST -Body $body2 -ContentType "application/json"
    Write-Host "✅ Respuesta recibida: $($response2 | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "⏳ Esperando 3 segundos..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "🧪 Test 3: Alerta Crítica - Calificación Baja" -ForegroundColor Red
Write-Host "Enviando evento a: $workflow3Url" -ForegroundColor Gray

$body3 = @{
    evento = "resena.calificacion_baja"
    timestamp = (Get-Date).ToString("o")
    data = @{
        resena_id = "test-789"
        autor = "Cliente Insatisfecho"
        destino = "Quito Centro Histórico"
        mensaje = "Muy mala experiencia, no lo recomiendo"
        calificacion = 1
        usuario_id = "test-789"
        nivel_urgencia = "alta"
        fecha_creacion = (Get-Date).ToString("o")
    }
    metadata = @{
        source = "ms-resena"
        environment = "development"
        correlation_id = "test-correlation-789"
    }
} | ConvertTo-Json -Depth 10

try {
    $response3 = Invoke-RestMethod -Uri $workflow3Url -Method POST -Body $body3 -ContentType "application/json"
    Write-Host "✅ Respuesta recibida: $($response3 | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Pruebas completadas" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Verifica en tu Telegram:" -ForegroundColor Yellow
Write-Host "   - 2 notificaciones normales (usuario y reseña)" -ForegroundColor Gray
Write-Host "   - 1 alerta crítica (calificación baja)" -ForegroundColor Gray
Write-Host ""
Write-Host "📊 Verifica en Google Sheets:" -ForegroundColor Yellow
Write-Host "   - 3 nuevas filas con los eventos registrados" -ForegroundColor Gray
Write-Host ""
Write-Host "🔍 Verifica en n8n:" -ForegroundColor Yellow
Write-Host "   - http://localhost:5678" -ForegroundColor Gray
Write-Host "   - Usuario: admin / Contraseña: uleam2025" -ForegroundColor Gray
Write-Host "   - Ve a 'Executions' para ver el historial" -ForegroundColor Gray
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
