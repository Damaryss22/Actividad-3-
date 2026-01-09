# Práctica 5 - REST y GraphQL

## Descripción
Esta práctica aborda la implementación paralela de APIs REST y GraphQL utilizando el framework NestJS, con el propósito de comparar ambos enfoques en el desarrollo de servicios web modernos.
El objetivo es analizar las ventajas, diferencias y desafíos que presenta cada tecnología dentro de una arquitectura backend modular.

## Tecnologías Utilizadas
-TypeScript
-TypeORM — ORM para la gestión de entidades
-NestJS — Framework progresivo para Node.js
-GraphQL — Lenguaje de consultas para APIs
-REST API — Enfoque clásico basado en endpoints HTTP
-SQLite — Base de datos liviana embebida

## Estructura del Proyecto
practica5/
│
├── 📁 graphql/                         # Esquemas o configuraciones relacionadas con GraphQL
│
├── 📁 node_modules/                       # Dependencias instaladas automáticamente por npm
│
├── 📁 src/                                # Código fuente principal de la aplicación
│   │
│   ├── 📁 administrador/                  # Módulo para gestión de administradores
│   ├── 📁 atraccion/                      # Módulo de atracciones turísticas
│   ├── 📁 guia-cultural/                  # Módulo para guías culturales
│   ├── 📁 hoteles/                        # Módulo para gestión de hoteles
│   ├── 📁 lugares-turisticos/             # Módulo de lugares turísticos
│   ├── 📁 medio-transporte/               # Módulo de medios de transporte
│   ├── 📁 propietario/                    # Módulo de propietarios de servicios
│   ├── 📁 resena/                         # Módulo para reseñas de usuarios
│   ├── 📁 restaurante/                    # Módulo de restaurantes y gastronomía
│   ├── 📁 servicio/                       # Módulo de servicios turísticos generales
│   ├── 📁 servicios/                      # Módulo de integración o utilidades de servicios
│   ├── 📁 turista/                        # Módulo para turistas o visitantes
│   ├── 📁 usuarios/                       # Módulo de gestión de usuarios del sistema
│   │
│   ├── app.controller.spec.ts             # Pruebas del controlador principal
│   ├── app.controller.ts                  # Controlador principal de la aplicación
│   ├── app.module.ts                      # Módulo raíz que importa todos los módulos
│   ├── app.service.ts                     # Servicio principal de la aplicación
│   ├── main.ts                  # Punto de entrada principal (bootstrap del servidor NestJS)
│   └── schema.gql                         # Esquema GraphQL generado automáticamente
│
├── 📁 test/                               # Pruebas unitarias y end-to-end
│
├── .gitignore                             # Archivos y carpetas ignoradas por Git
├── .prettierrc                            # Configuración del formateador de código Prettier
├── eslint.config.mjs                      # Configuración de ESLint
├── nest-cli.json                          # Configuración del CLI de NestJS
├── package.json                           # Dependencias, scripts y metadatos del proyecto
├── package-lock.json                      # Bloqueo de versiones de dependencias
├── README.md                              # Documentación general del proyecto
├── tsconfig.build.json                    # Configuración de compilación de TypeScript
└── tsconfig.json                          # Configuración base de TypeScript

## Requisitos Previos
-Node.js versión 18 o superior
-npm o yarn instalado en el sistema

## Proyectos Incluidos
1. REST API (rest/)
Implementación clásica de una API basada en endpoints HTTP, siguiendo los principios del estilo arquitectónico REST.
2. GraphQL API (graphql/)
Versión del mismo sistema implementada con GraphQL, permitiendo consultas más dinámicas y específicas según las necesidades del cliente.

## Ejecución 
🔹 Para la API REST
1. Accede al directorio correspondiente:
    cd practica-5/practica5/rest
2. Instala las dependencias necesarias:
    npm install
3. Ejecuta el servidor en modo desarrollo:
    npm run start:dev
4. La API REST estará disponible en:
    http://localhost:3000

🔹 Para la API GraphQL
1. Entra al directorio del proyecto GraphQL:
    cd practica-5/practica5/graphql
2. Instala las dependencias:
    npm install
3. Inicia la aplicación:
    npm run start:dev
4. La API GraphQL se ejecutará en:
    http://localhost:3001
5. Accede al GraphQL Playground en:
    http://localhost:3001/graphql

## Scripts
-npm run dev o npm run start:dev (Ejecuta la aplicación en modo desarrollo con hot reload)
-npm start (Lanza la aplicación en modo producción)
-npm tes (Ejecuta las pruebas unitarias)
-npm run build (Compila el proyecto para despliegue)

## Base de Datos
Ambas implementaciones utilizan SQLite como motor de base de datos.
El archivo .db se genera automáticamente al ejecutar cada aplicación por primera vez.

## Notas
-Las APIs REST y GraphQL pueden ejecutarse simultáneamente en puertos diferentes
-Los archivos de base de datos (.db) están excluidos del control de versiones
-Cada proyecto posee su propio package.json y conjunto de dependencias independientes