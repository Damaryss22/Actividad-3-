# Guía de Instalación y Ejecución

## Paso 1: Verificar Requisitos Previos

Asegúrate de tener instalado:

```bash
# Node.js (versión 18 o superior)
node --version

# Docker y Docker Compose
docker --version
docker-compose --version

# npm
npm --version
```

## Paso 2: Levantar Infraestructura

```bash
# Desde la raíz del proyecto
docker-compose up -d

# Verificar que todo esté corriendo
docker-compose ps

# Ver logs si hay problemas
docker-compose logs
```

## Paso 3: Instalar Dependencias

Instala las dependencias de cada microservicio:

```bash
# ms-gateway
cd ms-gateway
npm install
cd ..

# ms-usuario
cd ms-usuario
npm install
cd ..

# ms-resena
cd ms-resena
npm install
cd ..
```

## Paso 4: Ejecutar los Microservicios

Abre 3 terminales:

### Terminal 1: ms-gateway
```bash
cd ms-gateway
npm run start:dev
```

Deberías ver:
```
🚀 ms-gateway running on port 3000
   POST http://localhost:3000/usuarios - Crear usuario
   POST http://localhost:3000/resenas - Crear reseña
```

### Terminal 2: ms-usuario
```bash
cd ms-usuario
npm run start:dev
```

Deberías ver:
```
ms-usuario running on port 3003
👂 Listening to usuario_queue...
```

### Terminal 3: ms-resena
```bash
cd ms-resena
npm run start:dev
```

Deberías ver:
```
ms-resena running on port 3004
👂 Listening to resena_queue...
```

## Paso 5: Probar el Sistema

### Opción A: Usando cURL

```bash
# Crear un usuario
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "contrasena": "password123",
    "tipo": "turista",
    "idiomaPreferido": "es"
  }'

# Crear una reseña (reemplaza el UUID)
curl -X POST http://localhost:3000/resenas \
  -H "Content-Type: application/json" \
  -d '{
    "autor": "Juan Pérez",
    "destino": "Playa de Manta",
    "mensaje": "Excelente lugar!",
    "calificacion": 5,
    "usuario_id": "UUID-aqui"
  }'
```

### Opción B: Usando Postman

1. Importa las requests desde `requests.http`
2. Envía POST a `http://localhost:3000/usuarios`
3. Copia el UUID del usuario creado (verlo en logs de ms-usuario)
4. Envía POST a `http://localhost:3000/resenas` con el UUID

### Opción C: Usando VS Code REST Client

1. Instala la extensión "REST Client"
2. Abre el archivo `requests.http`
3. Haz clic en "Send Request" sobre cada request

## Paso 6: Verificar Logs

Observa los logs en cada terminal:

**ms-usuario:**
```
📥 usuario.create recibido
   Message ID: 550e8400-e29b-41d4-a716-446655440000
   Nombre: Juan Pérez, Correo: juan@example.com
✅ Usuario CREADO: 123e4567-e89b-12d3-a456-426614174000
```

**ms-resena:**
```
📥 Procesando resena.request...
✅ Reseña creada y evento emitido a ms-usuario
```

## Paso 7: Probar Idempotencia

Para probar que la idempotencia funciona:

1. Envía una reseña y copia el `message_id` de la respuesta
2. Modifica el código de ms-gateway temporalmente para usar el mismo `message_id`
3. Envía la misma reseña 2 veces
4. En los logs de ms-resena verás:
   ```
   [IDEMP] Mensaje duplicado ignorado: 550e8400-e29b-41d4-a716-446655440000
   ```

## Solución de Problemas Comunes

### Error: EADDRINUSE (Puerto en uso)

```bash
# Windows - Matar proceso en puerto 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Cambiar puerto en main.ts si es necesario
```

### Error: Cannot connect to RabbitMQ

```bash
# Verificar que RabbitMQ esté corriendo
docker-compose ps

# Reiniciar RabbitMQ
docker-compose restart rabbitmq

# Ver logs
docker-compose logs rabbitmq
```

### Error: PostgreSQL connection refused

```bash
# Verificar bases de datos
docker-compose ps

# Reiniciar PostgreSQL
docker-compose restart postgres_usuario postgres_resena
```

### Error: Module not found

```bash
# Reinstalar dependencias
cd ms-usuario
rm -rf node_modules package-lock.json
npm install

# Repetir para otros microservicios
```

## Comandos Útiles

```bash
# Ver logs de Docker Compose
docker-compose logs -f

# Acceder a RabbitMQ Management
# URL: http://localhost:15672
# Usuario: guest / Contraseña: guest

# Conectar a PostgreSQL
docker exec -it [CONTAINER_ID] psql -U pguser -d usuario_db

# Detener todo
docker-compose down

# Eliminar volúmenes (limpia las bases de datos)
docker-compose down -v
```

## Siguiente Paso

Lee el README.md principal para entender la arquitectura y patrones implementados.
