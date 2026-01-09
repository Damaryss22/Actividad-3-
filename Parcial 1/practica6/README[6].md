## Práctica 6 – WebSockets y Comunicación en Tiempo Real

## Descripción
Esta práctica implementa un sistema de comunicación en tiempo real utilizando WebSockets en conjunto con APIs REST.
El objetivo es demostrar cómo integrar ambos enfoques para construir aplicaciones interactivas capaces de actualizar datos instantáneamente entre cliente y servidor.

## Tecnologías Utilizadas
-TypeScript
-TypeORM — ORM para la gestión de datos
-NestJS — Framework progresivo para Node.js
-WebSockets — Protocolo de comunicación bidireccional
-Socket.IO — Librería para la implementación de -WebSockets
-REST API — Para las operaciones CRUD convencionales
-SQLite — Base de datos ligera y embebida

## Estructura del Proyecto
practica6/
│
├── rest/
│   ├── db/
│   └── dist/
│
├── node_modules/
│
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
├── start-all.ps1
└── START-SERVERS.md

## Requisitos Previos
-Node.js versión 18 o superior
-npm o yarn
-PowerShell (para ejecutar el script de inicio automático en Windows)

## Instalación
🔹 Opción 1: Instalación manual por proyecto
    API REST
        cd websocket_practica6/rest
        npm install
    Servidor WebSocket
        cd websocket_practica6/ws
        npm install

🔹 Opción 2: Ejecución automática (recomendada)
El proyecto incluye un script start-all.ps1 que instala dependencias y ejecuta todos los servicios de forma simultánea.

## Ejecución
🧩 Inicio manual
1. Ejecutar la API REST
    practica6/rest
    npm run start:dev
2. Ejecutar el Servidor WebSocket
    cd practica6/ws
    npm run start:dev

⚡ Inicio automático (recomendado)
Desde la raíz del proyecto:
    .\start-all.ps1

## Scripts
-pm run dev o npm run start:dev (Ejecuta el proyecto en modo desarrollo con recarga automática (hot reload))
-pm start (Inicia el proyecto en modo producción)
-pm test (Ejecuta las pruebas unitarias)
-pm run build (Compila el proyecto para despliegue en producción)

## Notas
-Ambos servidores deben estar activos para el correcto funcionamiento.
-Los archivos .db están excluidos del control de versiones.
-El cliente de prueba (test-client.html) no requiere instalación.
-Se recomienda usar start-all.ps1 para simplificar la ejecución.