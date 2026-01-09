# Práctica 3 - TypeORM Avanzado

## Descripción 
Se desarrolla un modelo completo de dominio y persistencia de datos para una aplicación de recomendaciones turísticas orientada a visitantes internacionales.
El proyecto está construido sin frameworks, empleando Node.js, TypeScript y TypeORM en su versión avanzada.

El sistema permite administrar información relacionada con:

Servicios turísticos (como hoteles, restaurantes, museos, etc.)

Opciones de transporte disponibles

Guías culturales y contenido informativo local

Opiniones y calificaciones proporcionadas por los usuarios

Incluye la implementación de operaciones CRUD para todas las entidades, la definición de relaciones complejas y un script de carga inicial (seeding) que valida la conexión, creación y manipulación de los datos.

## Tecnologías Utilizadas
-TypeScript
-TypeORM 
-Node.js
-SQLite como base de datos embebida
-Reflect-metadata — soporte para decoradores de TypeORM

## Estructura del Proyecto
practica3/
│
├── 📁 dist/                              # Archivos compilados de TypeScript (JS)
│   ├── 📁 entities/
│   │   ├── administrador.model.js
│   │   ├── administrador.model.js.map
│   │   ├── propietario.js
│   │   ├── propietario.js.map
│   │   ├── turista.model.js
│   │   ├── turista.model.js.map
│   │   ├── usuario.model.js
│   │   └── usuario.model.js.map
│   │
│   ├── 📁 services/
│   │   ├── servicio.js
│   │   ├── servicio.js.map
│   │   ├── data-source.js
│   │   ├── data-source.js.map
│   │   ├── index.js
│   │   └── index.js.map
│
├── 📁 node_modules/                      # Dependencias instaladas
│
├── 📁 src/                               # Código fuente TypeScript
│   ├── 📁 entities/
│   │   ├── administrador.model.ts
│   │   ├── atraccion.model.ts
│   │   ├── GuiaCultural.ts
│   │   ├── hoteles.model.ts
│   │   ├── lugares_turisticos.model.ts
│   │   ├── MedioTransporte.ts
│   │   └── propietario.model.ts
│   │
│   ├── 📁 services/
│   │   ├── servicio.ts
│   │   ├── data-source.ts
│   │   └── index.ts
│
├── package.json
├── package-lock.json
└── README.md


## Scripts 
-npm run dev (Ejecuta la aplicación en modo desarrollo utilizando ts-node.)
-npm start (Inicia la aplicación en modo de producción.)

## Ejecución
1. Accede al directorio del proyecto:
    cd practica3-proyecto
2. Instala las dependencias necesarias:
    npm install
3. Inicia la aplicación con el siguiente comando:
    npm run dev

## Notas
-El archivo de base de datos SQLite se genera automáticamente al iniciar la aplicación.
-Los archivos con extensión .db se excluyen del control de versiones.