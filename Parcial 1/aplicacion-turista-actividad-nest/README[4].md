## Práctica 4 – API REST con NestJS

## Descripción
Desarrollar una API REST completa utilizando el framework NestJS, aplicando una arquitectura modular y escalable.
El sistema está diseñado para gestionar distintos recursos turísticos e incluye controladores, servicios, DTOs y validaciones para garantizar la integridad de los datos.

## Tecnologías Utilizadas
TypeScript
TypeORM — ORM para la persistencia de datos
NestJS — Framework para Node.js
SQLite — Base de datos embebida
Class Validator — Validación de datos de entrada
Class Transformer — Transformación de objetos y mapeo de clases

## Estructura del Proyecto
aplicacion-turista-actividad-nest/
│
├── 📁 db/   
│   ├── my-database.sqlite        # Base de datos o scripts de inicialización
│
├── 📁 src/                               # Código fuente principal
│   │
│   ├── 📁 administrador/                 # Módulo para gestión de administradores
│   │   ├── administrador.controller.ts
│   │   ├── administrador.module.ts
│   │   ├── administrador.service.ts
│   │   └── entities/
│   │       └── administrador.entity.ts
│   │
│   ├── 📁 atraccion/                     # Módulo para atracciones turísticas
│   │   ├── atraccion.controller.ts
│   │   ├── atraccion.module.ts
│   │   ├── atraccion.service.ts
│   │   └── entities/
│   │       └── atraccion.entity.ts
│   │
│   ├── 📁 guia-cultural/                 # Módulo para guías culturales
│   │   ├── guia-cultural.controller.ts
│   │   ├── guia-cultural.module.ts
│   │   ├── guia-cultural.service.ts
│   │   └── entities/
│   │       └── guia-cultural.entity.ts
│   │
│   ├── 📁 hotel/                         # Módulo para hoteles
│   │   ├── hotel.controller.ts
│   │   ├── hotel.module.ts
│   │   ├── hotel.service.ts
│   │   └── entities/
│   │       └── hotel.entity.ts
│   │
│   ├── 📁 lugares-turisticos/            # Módulo para lugares turísticos
│   │   ├── lugares-turisticos.controller.ts
│   │   ├── lugares-turisticos.module.ts
│   │   ├── lugares-turisticos.service.ts
│   │   └── entities/
│   │       └── lugares-turisticos.entity.ts
│   │
│   ├── 📁 medio-transporte/              # Módulo para medios de transporte
│   │   ├── medio-transporte.controller.ts
│   │   ├── medio-transporte.module.ts
│   │   ├── medio-transporte.service.ts
│   │   └── entities/
│   │       └── medio-transporte.entity.ts
│   │
│   ├── 📁 propietario/                   # Módulo para propietarios
│   │   ├── propietario.controller.ts
│   │   ├── propietario.module.ts
│   │   ├── propietario.service.ts
│   │   └── entities/
│   │       └── propietario.entity.ts
│   │
│   ├── 📁 resena/                        # Módulo para reseñas de usuarios
│   │   ├── resena.controller.ts
│   │   ├── resena.module.ts
│   │   ├── resena.service.ts
│   │   └── entities/
│   │       └── resena.entity.ts
│   │
│   ├── 📁 restaurante/                   # Módulo para restaurantes
│   │   ├── restaurante.controller.ts
│   │   ├── restaurante.module.ts
│   │   ├── restaurante.service.ts
│   │   └── entities/
│   │       └── restaurante.entity.ts
│   │
│   ├── 📁 servicio/                      # Módulo para servicios turísticos generales
│   │   ├── servicio.controller.ts
│   │   ├── servicio.module.ts
│   │   ├── servicio.service.ts
│   │   └── entities/
│   │       └── servicio.entity.ts
│   │
│   ├── 📁 turista/                       # Módulo para turistas
│   │   ├── turista.controller.ts
│   │   ├── turista.module.ts
│   │   ├── turista.service.ts
│   │   └── entities/
│   │       └── turista.entity.ts
│   │
│   ├── 📁 usuarios/                      # Módulo para usuarios del sistema
│   │   ├── usuarios.controller.ts
│   │   ├── usuarios.module.ts
│   │   ├── usuarios.service.ts
│   │   └── entities/
│   │       └── usuario.entity.ts
│   │
│   ├── app.module.ts                     # Módulo raíz que importa todos los demás módulos
│   └── main.ts                          # Punto de entrada principal de la aplicación NestJS
│
├── 📁 test/                              # Pruebas automatizadas
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .eslintrc.cjs / eslint.config.mjs     # Configuración de ESLint
├── .prettierrc                           # Configuración de Prettier
├── nest-cli.json                         # Configuración del CLI de NestJS
├── package.json                          # Dependencias del proyecto
├── package-lock.json                     # Bloqueo de versiones de dependencias
├── tsconfig.json                         # Configuración principal de TypeScript
├── tsconfig.build.json                   # Configuración para compilación
└── README.md                             # Documentación general del proyecto

## Requisitos Previos
-Node.js versión 18 o superior
-npm o yarn como gestor de dependencias

## Instalación
1. Accede al directorio del proyecto:
    cd practica4
2. Instala las dependencias necesarias:
    npm install

## Scripts Disponibles
-npm run dev o npm run start:dev (Ejecuta la API en modo desarrollo con recarga automática (hot reload))
-npm start (Inicia la aplicación en modo producción)
-npm test (Ejecuta las pruebas unitarias.)
-npm run test:e2e (Corre las pruebas end-to-end)
-npm run build (Compila el proyecto para despliegue en producción)

## Ejecución
1. Asegúrate de encontrarte en la carpeta practica4
2. Instala las dependencias si aún no lo has hecho:
    npm install
3. Inicia el servidor en modo desarrollo:
    npm run start:dev
4. Accede a la API desde tu navegador o herramienta de pruebas en:
    http://localhost:3000

## Endpoints Principales
La API expone endpoints RESTful para cada recurso:
    GET /api/[recurso] — Obtener todos los registros
    GET /api/[recurso]/:id — Obtener un registro por ID
    POST /api/[recurso] — Crear un nuevo registro
    PUT /api/[recurso]/:id — Actualizar un registro existente
    DELETE /api/[recurso]/:id — Eliminar un registro

## Módulos Disponibles
/administrador
/atraccion
/guia-cultural
/hotel
/lugares-turisticos
/medio-transporte
/propietario
/resena
/restaurante
/servicio
/turista
/usuarios

## Pruebas
- Pruebas unitarias
npm test
- Pruebas end-to-end
npm run test:e2e
- Reporte de cobertura
npm run test:cov

## Base de Datos
El proyecto utiliza SQLite como base de datos.
El archivo correspondiente se genera automáticamente en la carpeta db/ al iniciar la aplicación por primera vez.

## Notas
-El servidor se ejecuta por defecto en el puerto 3000
-Los archivos .db están excluidos del control de versiones
-El modo desarrollo cuenta con hot reload para facilitar la actualización del código