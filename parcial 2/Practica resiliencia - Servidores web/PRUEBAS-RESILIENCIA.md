# 🧪 GUÍA DE PRUEBAS MANUALES DE RESILIENCIA

## 📋 Índice
1. [Preparación del Entorno](#preparación-del-entorno)
2. [Prueba 1: Funcionamiento Normal](#prueba-1-funcionamiento-normal)
3. [Prueba 2: Idempotencia (Prevención de Duplicados)](#prueba-2-idempotencia-prevención-de-duplicados)
4. [Prueba 3: Fallo de RabbitMQ](#prueba-3-fallo-de-rabbitmq)
5. [Prueba 4: Fallo de Base de Datos](#prueba-4-fallo-de-base-de-datos)
6. [Prueba 5: Fallo de Microservicio](#prueba-5-fallo-de-microservicio)
7. [Prueba 6: Mensajes Duplicados](#prueba-6-mensajes-duplicados)
8. [Verificación de Resultados](#verificación-de-resultados)

---

## ⚙️ Preparación del Entorno

### 1. Iniciar Docker
```powershell
docker-compose up -d
```

### 2. Verificar que todos los contenedores estén corriendo
```powershell
docker-compose ps
```

**Resultado esperado:**
```
NAME                    STATUS      PORTS
postgres_resena         running     0.0.0.0:5436->5432/tcp
postgres_usuario        running     0.0.0.0:5435->5432/tcp
rabbitmq                running     0.0.0.0:5672->5672/tcp, 0.0.0.0:15672->15672/tcp
redis                   running     0.0.0.0:6379->6379/tcp
```

### 3. Abrir 3 terminales PowerShell

**Terminal 1 - Gateway:**
```powershell
cd "C:\Users\HP\Desktop\Proyecto Manta Travel - 5to\Proyecto Guia turistico\Practica resiliencia - Servidores web\ms-gateway"
npm run start:dev
```

**Terminal 2 - Usuario:**
```powershell
cd "C:\Users\HP\Desktop\Proyecto Manta Travel - 5to\Proyecto Guia turistico\Practica resiliencia - Servidores web\ms-usuario"
npm run start:dev
```

**Terminal 3 - Reseña:**
```powershell
cd "C:\Users\HP\Desktop\Proyecto Manta Travel - 5to\Proyecto Guia turistico\Practica resiliencia - Servidores web\ms-resena"
npm run start:dev
```

### 4. Herramientas necesarias
- **Postman** o **VS Code con extensión REST Client**
- **Navegador web** para RabbitMQ Management UI: http://localhost:15672 (user: `guest`, pass: `guest`)

---

## 🟢 Prueba 1: Funcionamiento Normal

### Objetivo
Validar que el sistema funciona correctamente sin fallos.

### Pasos

**1.1 Crear un Usuario**
```http
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "correo": "juan.perez@example.com",
  "contrasena": "password123",
  "tipo": "turista",
  "idiomaPreferido": "es"
}
```

**Resultado esperado:**
- Status: `201 Created`
- Response body con `message_id` (UUID)
- En terminal de **ms-usuario**: Logs mostrando la creación del usuario
- En RabbitMQ Management (http://localhost:15672 → Queues): Ver mensaje procesado

**1.2 Crear una Reseña**
```http
POST http://localhost:3000/resenas
Content-Type: application/json

{
  "autor": "Juan Pérez",
  "destino": "Playa de Manta",
  "mensaje": "Excelente lugar para visitar!",
  "calificacion": 5,
  "usuario_id": "COPIAR-UUID-DEL-USUARIO-CREADO"
}
```

**Resultado esperado:**
- Status: `201 Created`
- Response body con `message_id`
- En terminal de **ms-resena**: Logs de creación de reseña
- En terminal de **ms-usuario**: Logs de recepción de evento `resena.created`

### ✅ Criterios de Éxito
- [x] Ambos requests retornan 201
- [x] Los logs muestran procesamiento exitoso
- [x] RabbitMQ muestra las colas `usuario_queue` y `resena_queue` vacías después de procesar

---

## 🔁 Prueba 2: Idempotencia (Prevención de Duplicados)

### Objetivo
Validar que el sistema previene la creación de reseñas duplicadas usando el mismo `message_id`.

### Pasos

**2.1 Crear una Reseña con message_id específico**

Abre una terminal y ejecuta:
```powershell
curl -X POST http://localhost:3000/resenas `
  -H "Content-Type: application/json" `
  -d '{\"autor\":\"Test Idempotencia\",\"destino\":\"Lugar X\",\"mensaje\":\"Primera vez\",\"calificacion\":5,\"usuario_id\":\"00000000-0000-0000-0000-000000000001\"}'
```

**Anota el `message_id` que retorna en la respuesta.**

**2.2 Simular mensaje duplicado en RabbitMQ**

Abre la consola de RabbitMQ Management:
1. Ve a http://localhost:15672
2. Login: `guest` / `guest`
3. Ve a la pestaña **Queues and Streams**
4. Click en `resena_queue`
5. En la sección **Publish message**:
   - **Payload:**
   ```json
   {
     "pattern": "resena.request",
     "data": {
       "message_id": "PEGAR-MESSAGE-ID-ANTERIOR",
       "autor": "Test Duplicado",
       "destino": "Lugar X",
       "mensaje": "Intento duplicado",
       "calificacion": 3,
       "usuario_id": "00000000-0000-0000-0000-000000000001"
     }
   }
   ```
   - Click en **Publish message**

**2.3 Observar los logs de ms-resena**

Deberías ver un mensaje indicando que el `message_id` ya fue procesado.

### ✅ Criterios de Éxito
- [x] Primera reseña se crea exitosamente
- [x] Mensaje duplicado es rechazado por el IdempotencyGuard
- [x] Logs muestran: `"Mensaje duplicado detectado, ignorando..."`
- [x] No se crea una segunda reseña en la base de datos

---

## 🚨 Prueba 3: Fallo de RabbitMQ

### Objetivo
Validar que el sistema maneja correctamente la caída de RabbitMQ y se reconecta automáticamente.

### Pasos

**3.1 Estado inicial: Todos los servicios corriendo**

**3.2 Detener RabbitMQ**
```powershell
docker stop rabbitmq
```

**3.3 Intentar crear un Usuario**
```http
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nombre": "Test Sin RabbitMQ",
  "correo": "test.rabbitmq@example.com",
  "contrasena": "pass123",
  "tipo": "turista",
  "idiomaPreferido": "es"
}
```

**Observar:**
- El Gateway debería retornar un error (500 o timeout)
- Los logs del Gateway mostrarán errores de conexión a RabbitMQ

**3.4 Reiniciar RabbitMQ**
```powershell
docker start rabbitmq
```

**Esperar 10-15 segundos para que los microservicios se reconecten.**

**3.5 Intentar crear el Usuario nuevamente**

Repetir el request del paso 3.3.

### ✅ Criterios de Éxito
- [x] Con RabbitMQ caído, el request falla gracefully (no crashea el Gateway)
- [x] Logs muestran intentos de reconexión
- [x] Después de reiniciar RabbitMQ, el sistema se recupera automáticamente
- [x] El nuevo request se procesa exitosamente

---

## 💾 Prueba 4: Fallo de Base de Datos

### Objetivo
Validar el comportamiento cuando una base de datos no está disponible.

### Pasos - Escenario A: PostgreSQL Usuario

**4A.1 Detener PostgreSQL Usuario**
```powershell
docker stop postgres_usuario
```

**4A.2 Crear un Usuario**
```http
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nombre": "Test Sin DB",
  "correo": "test.nodb@example.com",
  "contrasena": "pass123",
  "tipo": "turista",
  "idiomaPreferido": "es"
}
```

**Observar:**
- Gateway acepta el request (201)
- ms-usuario intenta procesar pero falla al conectar con la BD
- Logs de ms-usuario muestran errores de conexión
- El mensaje **permanece en la cola** de RabbitMQ sin ACK

**4A.3 Reiniciar PostgreSQL Usuario**
```powershell
docker start postgres_usuario
```

**4A.4 Observar reprocesamiento**

Esperar 10 segundos. El mensaje en la cola será reprocesado automáticamente.

### Pasos - Escenario B: PostgreSQL Reseña

**4B.1 Detener PostgreSQL Reseña**
```powershell
docker stop postgres_resena
```

**4B.2 Crear una Reseña**
```http
POST http://localhost:3000/resenas
Content-Type: application/json

{
  "autor": "Test",
  "destino": "Lugar",
  "mensaje": "Mensaje de prueba",
  "calificacion": 5,
  "usuario_id": "00000000-0000-0000-0000-000000000001"
}
```

**Observar comportamiento similar al escenario A.**

**4B.3 Reiniciar PostgreSQL Reseña**
```powershell
docker start postgres_resena
```

### ✅ Criterios de Éxito
- [x] Gateway acepta requests incluso con BD caída
- [x] Mensajes quedan en cola RabbitMQ sin confirmar (ACK)
- [x] Logs muestran errores de conexión a BD
- [x] Al reiniciar la BD, mensajes se reprocesan automáticamente
- [x] No se pierden datos

---

## ⚡ Prueba 5: Fallo de Microservicio

### Objetivo
Validar que si un microservicio se cae, los mensajes esperan en la cola hasta que se recupere.

### Pasos

**5.1 Detener ms-usuario**

En la terminal donde corre ms-usuario, presiona `Ctrl + C`.

**5.2 Crear varios Usuarios**
```http
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nombre": "Usuario 1 sin MS",
  "correo": "usuario1@test.com",
  "contrasena": "pass123",
  "tipo": "turista",
  "idiomaPreferido": "es"
}
```

Repetir 3 veces con diferentes correos.

**5.3 Verificar RabbitMQ**

Ve a http://localhost:15672 → Queues:
- La cola `usuario_queue` debería tener 3 mensajes **Ready**

**5.4 Reiniciar ms-usuario**
```powershell
npm run start:dev
```

**5.5 Observar procesamiento**

Al iniciar, ms-usuario consumirá automáticamente los 3 mensajes de la cola.

### ✅ Criterios de Éxito
- [x] Con ms-usuario caído, Gateway acepta requests (201)
- [x] Mensajes se acumulan en `usuario_queue`
- [x] Al reiniciar ms-usuario, todos los mensajes pendientes se procesan
- [x] Todos los usuarios se crean correctamente

---

## 🔄 Prueba 6: Mensajes Duplicados (Reintentos)

### Objetivo
Validar que si un mensaje se reintenta (por error temporal), no se duplica la información.

### Pasos

**6.1 Crear una Reseña**
```http
POST http://localhost:3000/resenas
Content-Type: application/json

{
  "autor": "Test Reintento",
  "destino": "Lugar Reintento",
  "mensaje": "Prueba de reintentos",
  "calificacion": 4,
  "usuario_id": "00000000-0000-0000-0000-000000000001"
}
```

**Anota el `message_id` retornado.**

**6.2 Simular reintento manual**

Detener ms-resena (`Ctrl + C`), luego publicar manualmente en RabbitMQ:

1. Ve a http://localhost:15672 → Queues → `resena_queue`
2. Publica el mensaje:
```json
{
  "pattern": "resena.request",
  "data": {
    "message_id": "PEGAR-MESSAGE-ID-DEL-PASO-6.1",
    "autor": "Test Reintento",
    "destino": "Lugar Reintento",
    "mensaje": "Prueba de reintentos",
    "calificacion": 4,
    "usuario_id": "00000000-0000-0000-0000-000000000001"
  }
}
```

**6.3 Reiniciar ms-resena**
```powershell
npm run start:dev
```

**6.4 Observar logs**

Deberías ver que el mensaje duplicado es ignorado por idempotencia.

### ✅ Criterios de Éxito
- [x] Reseña se crea solo una vez
- [x] Mensaje duplicado es detectado y rechazado
- [x] Tabla `idempotency` contiene el registro del `message_id`

---

## 🔍 Verificación de Resultados

### Base de Datos - PostgreSQL Usuario

```powershell
docker exec -it postgres_usuario psql -U usuario_user -d usuario_db
```

Consultas SQL:
```sql
-- Ver todos los usuarios creados
SELECT * FROM usuario;

-- Contar usuarios
SELECT COUNT(*) FROM usuario;
```

Salir: `\q`

### Base de Datos - PostgreSQL Reseña

```powershell
docker exec -it postgres_resena psql -U resena_user -d resena_db
```

Consultas SQL:
```sql
-- Ver todas las reseñas
SELECT * FROM resena;

-- Ver tabla de idempotencia
SELECT * FROM idempotency ORDER BY processed_at DESC;

-- Verificar que no hay duplicados
SELECT message_id, COUNT(*) FROM idempotency GROUP BY message_id HAVING COUNT(*) > 1;
```

Salir: `\q`

### RabbitMQ Management

Ve a http://localhost:15672:
- **Connections:** Ver conexiones activas de los microservicios
- **Channels:** Ver canales de comunicación abiertos
- **Queues:** Ver `usuario_queue` y `resena_queue` (deberían estar vacías si todo está procesado)
- **Get messages:** Obtener mensajes de las colas para inspección

---

## 📊 Tabla de Resumen de Pruebas

| # | Prueba | Estrategia Probada | Estado |
|---|--------|-------------------|--------|
| 1 | Funcionamiento Normal | Comunicación Asíncrona | ⬜ |
| 2 | Idempotencia | Prevención de Duplicados | ⬜ |
| 3 | Fallo RabbitMQ | Reconexión Automática | ⬜ |
| 4 | Fallo Base de Datos | Reintentos + Cola Persistente | ⬜ |
| 5 | Fallo Microservicio | Cola de Mensajes | ⬜ |
| 6 | Mensajes Duplicados | Idempotencia | ⬜ |

---

## 🎯 Estrategias de Resiliencia Implementadas

### 1. **Comunicación Asíncrona (RabbitMQ)**
- Los servicios no dependen de respuestas síncronas
- Permite procesamiento independiente y escalabilidad

### 2. **Idempotencia**
- Tabla `idempotency` registra todos los `message_id` procesados
- `IdempotencyGuard` previene procesamiento duplicado
- Garantiza que reintentos no crean duplicados

### 3. **Colas Persistentes**
- Los mensajes no se pierden si un servicio cae
- Quedan en cola hasta ser procesados exitosamente

### 4. **ACK Manual**
- Los mensajes solo se confirman después de procesarse correctamente
- Si hay error, el mensaje vuelve a la cola para reintento

### 5. **Reconexión Automática**
- `amqp-connection-manager` reintenta conexiones automáticamente
- Los servicios se recuperan sin intervención manual

---

## 💡 Consejos para las Pruebas

1. **Mantén los logs visibles:** Abre las 3 terminales lado a lado para ver el flujo en tiempo real

2. **Usa RabbitMQ Management:** Es crucial para ver el estado de las colas y mensajes

3. **Documenta cada prueba:** Toma capturas de pantalla de los logs y resultados

4. **Prueba en orden:** Empieza con funcionamiento normal antes de simular fallos

5. **Verifica la BD después de cada prueba:** Asegúrate de que los datos se persistieron correctamente

6. **Limpia entre pruebas:** Si necesitas empezar de cero:
   ```powershell
   docker-compose down -v
   docker-compose up -d
   ```

---

## 🚀 Script de Pruebas Automatizado (Opcional)

Si quieres automatizar algunas verificaciones, crea `test-resiliencia.ps1`:

```powershell
# Verificar que todos los servicios estén corriendo
Write-Host "Verificando servicios Docker..." -ForegroundColor Cyan
docker-compose ps

Write-Host "`nVerificando Gateway (puerto 3000)..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5
    Write-Host "✓ Gateway respondiendo" -ForegroundColor Green
} catch {
    Write-Host "✗ Gateway no responde" -ForegroundColor Red
}

Write-Host "`nVerificando RabbitMQ (puerto 15672)..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:15672" -Method GET -TimeoutSec 5
    Write-Host "✓ RabbitMQ respondiendo" -ForegroundColor Green
} catch {
    Write-Host "✗ RabbitMQ no responde" -ForegroundColor Red
}

Write-Host "`n✓ Verificación completada!" -ForegroundColor Green
```

Ejecuta:
```powershell
.\test-resiliencia.ps1
```

---

## 📝 Entregables de la Práctica

Para tu profesor/evaluación, debes incluir:

1. **Capturas de pantalla:**
   - Logs mostrando procesamiento exitoso
   - RabbitMQ Management con colas
   - Resultados de consultas SQL
   - Logs mostrando detección de duplicados

2. **Documento de pruebas:**
   - Este archivo con casillas marcadas
   - Descripción de cada prueba realizada
   - Resultados obtenidos

3. **Evidencia de fallos simulados:**
   - Capturas con servicios caídos
   - Logs de errores
   - Recuperación automática

---

**¡Éxito en tus pruebas de resiliencia! 🎉**
