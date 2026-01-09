# 📚 Índice de Documentación

Bienvenido al proyecto de Práctica Resiliencia con microservicios Usuario-Reseña. Esta es tu guía para navegar toda la documentación disponible.

## 🚀 Para Empezar

Si es tu primera vez con este proyecto, sigue este orden:

1. **[QUICK-START.md](QUICK-START.md)** - ⚡ Inicio rápido en 5 minutos
   - Comandos esenciales para levantar el sistema
   - Prueba básica para verificar funcionamiento
   - Solución rápida a problemas comunes

2. **[README.md](README.md)** - 📖 Documentación completa
   - Arquitectura del sistema
   - Endpoints y API
   - Patrones de resiliencia implementados
   - Estructura del proyecto

3. **[INSTALLATION.md](INSTALLATION.md)** - 🔧 Guía detallada de instalación
   - Paso a paso con screenshots
   - Múltiples opciones de prueba (cURL, Postman, VS Code)
   - Troubleshooting detallado

## 📊 Para Entender el Sistema

4. **[RESUMEN.md](RESUMEN.md)** - 📊 Resumen ejecutivo
   - Objetivos del proyecto
   - Componentes y responsabilidades
   - Flujos de negocio detallados
   - Casos de prueba sugeridos

5. **[DIAGRAMAS.md](DIAGRAMAS.md)** - 🎨 Diagramas visuales
   - Arquitectura general
   - Flujos de proceso
   - Modelo de datos
   - Escenarios de fallo y recuperación

## 🛠️ Herramientas Útiles

6. **[requests.http](requests.http)** - 🧪 Colección de pruebas
   - Requests HTTP listos para usar
   - Ejemplos de creación de usuarios y reseñas
   - Casos de prueba de idempotencia

7. **[scripts/](scripts/)** - ⚙️ Scripts de automatización
   - `start-all.bat` - Iniciar todo automáticamente (Windows)
   - `start-all.sh` - Iniciar todo automáticamente (Linux/Mac)
   - `stop-all.bat` - Detener infraestructura

## 📂 Estructura de Microservicios

Cada microservicio tiene su propia documentación:

8. **[ms-gateway/README.md](ms-gateway/README.md)** - Gateway API
   - Punto de entrada HTTP
   - Generación de message_id
   - Emisión de eventos

9. **[ms-usuario/README.md](ms-usuario/README.md)** - Microservicio Usuario
   - Gestión de usuarios
   - Verificación de duplicados
   - Consumo de eventos

10. **[ms-resena/README.md](ms-resena/README.md)** - Microservicio Reseña
    - Gestión de reseñas
    - Patrón de idempotencia
    - Emisión de eventos

## 🗺️ Mapa de Navegación por Objetivo

### Quiero levantar el proyecto rápidamente
→ [QUICK-START.md](QUICK-START.md)

### Quiero entender cómo funciona
→ [README.md](README.md) → [DIAGRAMAS.md](DIAGRAMAS.md) → [RESUMEN.md](RESUMEN.md)

### Tengo problemas de instalación
→ [INSTALLATION.md](INSTALLATION.md) (sección Troubleshooting)

### Quiero probar los endpoints
→ [requests.http](requests.http) + [README.md](README.md) (sección Endpoints)

### Quiero entender la idempotencia
→ [RESUMEN.md](RESUMEN.md) (sección Patrones de Resiliencia) → [DIAGRAMAS.md](DIAGRAMAS.md) (sección Patrón de Idempotencia)

### Quiero modificar el código
→ [README.md](README.md) (sección Estructura) → Código fuente de cada microservicio

### Quiero hacer pruebas
→ [RESUMEN.md](RESUMEN.md) (sección Casos de Prueba) → [requests.http](requests.http)

## 📋 Checklist de Aprendizaje

Marca lo que has completado:

- [ ] Leí QUICK-START.md
- [ ] Levanté el proyecto exitosamente
- [ ] Probé crear un usuario
- [ ] Probé crear una reseña
- [ ] Vi los logs de los microservicios
- [ ] Accedí a RabbitMQ Management
- [ ] Entendí el flujo de mensajes
- [ ] Probé la idempotencia
- [ ] Simulé un fallo y recuperación
- [ ] Leí toda la documentación

## 🎓 Conceptos Clave por Documento

| Concepto | Dónde Aprenderlo |
|----------|------------------|
| Microservicios | README.md, RESUMEN.md |
| RabbitMQ | README.md, DIAGRAMAS.md |
| Idempotencia | RESUMEN.md, DIAGRAMAS.md |
| Event-Driven Architecture | DIAGRAMAS.md, RESUMEN.md |
| TypeORM | Código fuente, README.md |
| NestJS | Código fuente, README.md |
| ACK Manual | RESUMEN.md (Patrones) |
| Colas Duraderas | RESUMEN.md (Patrones) |
| Docker Compose | docker-compose.yml, INSTALLATION.md |
| PostgreSQL | DIAGRAMAS.md (Modelo de Datos) |

## 📞 Soporte

Si después de leer toda la documentación aún tienes dudas:

1. Revisa la sección de troubleshooting en [INSTALLATION.md](INSTALLATION.md)
2. Consulta los logs de cada microservicio
3. Verifica RabbitMQ Management Console
4. Revisa los diagramas en [DIAGRAMAS.md](DIAGRAMAS.md)

## 🔄 Orden Recomendado de Lectura

### Para Principiantes
```
QUICK-START.md → README.md → DIAGRAMAS.md → requests.http
```

### Para Desarrolladores
```
README.md → RESUMEN.md → Código fuente → DIAGRAMAS.md → INSTALLATION.md
```

### Para Arquitectos
```
RESUMEN.md → DIAGRAMAS.md → README.md → docker-compose.yml
```

### Para Evaluadores
```
RESUMEN.md → DIAGRAMAS.md → Código fuente → Casos de prueba
```

## 📚 Glosario Rápido

- **ms-**: Prefijo para microservicio
- **ACK**: Acknowledgment, confirmación de procesamiento de mensaje
- **Idempotencia**: Capacidad de procesar el mismo mensaje múltiples veces con el mismo resultado
- **Message ID**: Identificador único UUID para cada mensaje
- **RabbitMQ**: Message broker para comunicación asíncrona
- **TypeORM**: Object-Relational Mapping para TypeScript
- **NestJS**: Framework Node.js con arquitectura modular
- **Event-Driven**: Arquitectura basada en eventos
- **Durable Queue**: Cola que persiste en disco

---

**¿Por dónde empezar?** 
- Si tienes 5 minutos: [QUICK-START.md](QUICK-START.md)
- Si tienes 30 minutos: [README.md](README.md)
- Si tienes 1 hora: Lee toda la documentación en orden

**Happy Coding! 🚀**
