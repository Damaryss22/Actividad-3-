# 🚀 Inicio Rápido - 5 Minutos

## Prerrequisitos Rápidos

```bash
# Verificar instalaciones
node --version  # Necesitas Node.js 18+
docker --version  # Necesitas Docker
```

## Opción 1: Inicio Automático (Windows)

```bash
# Ejecutar desde la raíz del proyecto
scripts\start-all.bat
```

Esto abrirá automáticamente 3 ventanas con cada microservicio.

## Opción 2: Inicio Manual (Todas las plataformas)

### Paso 1: Infraestructura (10 segundos)
```bash
docker-compose up -d
```

### Paso 2: Instalar dependencias (primera vez, 2-3 minutos)
```bash
cd ms-gateway && npm install && cd ..
cd ms-usuario && npm install && cd ..
cd ms-resena && npm install && cd ..
```

### Paso 3: Iniciar servicios (3 terminales)

**Terminal 1:**
```bash
cd ms-gateway
npm run start:dev
```

**Terminal 2:**
```bash
cd ms-usuario
npm run start:dev
```

**Terminal 3:**
```bash
cd ms-resena
npm run start:dev
```

## 🧪 Prueba Rápida

Una vez todo esté corriendo, abre otra terminal y ejecuta:

```bash
# Crear un usuario
curl -X POST http://localhost:3000/usuarios ^
  -H "Content-Type: application/json" ^
  -d "{\"nombre\":\"Test User\",\"correo\":\"test@example.com\",\"contrasena\":\"pass123\"}"
```

Deberías ver logs en la terminal de ms-usuario confirmando la creación.

## 📊 Verificar que todo funciona

1. **RabbitMQ:** http://localhost:15672 (guest/guest)
   - Deberías ver 3 colas: usuario_queue, resena_queue

2. **Gateway:** http://localhost:3000
   - Responde con información del servicio

3. **Logs:** Cada terminal muestra:
   - ✅ Servicio iniciado en puerto X
   - 👂 Escuchando cola X

## 🛑 Detener Todo

```bash
# Presiona Ctrl+C en cada terminal de microservicio

# Detener Docker
docker-compose down
```

## 📖 Siguiente Paso

Lee el [README.md](README.md) completo para entender la arquitectura.

## ❌ ¿Problemas?

- **Puerto ocupado:** Cambia el puerto en `src/main.ts` de cada servicio
- **Docker no inicia:** Verifica que Docker Desktop esté corriendo
- **Módulos no encontrados:** Ejecuta `npm install` en cada carpeta

---

**¿Todo funcionando?** 🎉 Continúa con [INSTALLATION.md](INSTALLATION.md) para pruebas avanzadas.
