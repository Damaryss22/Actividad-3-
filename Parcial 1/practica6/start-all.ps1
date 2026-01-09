# Script para iniciar ambos servidores
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Iniciando Sistema de Turismo Completo" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[*] Iniciando Servidor WebSocket (Puerto 3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd c:\Users\danna\Downloads\p5-ws\ws; Write-Host 'Servidor WebSocket' -ForegroundColor Cyan; npm run start:dev"

Start-Sleep -Seconds 3

Write-Host "[*] Iniciando Servidor REST API (Puerto 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd c:\Users\danna\Downloads\p5-ws\rest; Write-Host 'Servidor REST' -ForegroundColor Green; npm run start:dev"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[OK] Servidores iniciados en ventanas separadas" -ForegroundColor Green
Write-Host ""
Write-Host "URLs de los Servidores:" -ForegroundColor White
Write-Host "  - WebSocket: http://localhost:3001" -ForegroundColor Cyan
Write-Host "  - REST API:  http://localhost:3000" -ForegroundColor Green
Write-Host ""

Write-Host "Para probar:" -ForegroundColor Yellow
Write-Host "  1. Abre test-client.html en tu navegador" -ForegroundColor Gray
Write-Host "  2. Conecta como administrador" -ForegroundColor Gray
Write-Host "  3. Crea una resena desde la API REST" -ForegroundColor Gray
Write-Host "  4. Ve la notificacion en tiempo real" -ForegroundColor Gray
Write-Host ""

Write-Host "Comandos utiles:" -ForegroundColor Yellow
Write-Host "  Ver procesos: Get-Process -Name node" -ForegroundColor Gray
Write-Host "  Ver puertos:  netstat -ano | findstr 3000" -ForegroundColor Gray
Write-Host ""

Read-Host "Presiona Enter para abrir el cliente de prueba"
Start-Process "c:\Users\danna\Downloads\p5-ws\ws\test-client.html"
