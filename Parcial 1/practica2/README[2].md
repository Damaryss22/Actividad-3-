## Práctica 2 – Introducción a TypeORM

## Descripción
Su objetivo es introducir el uso de TypeORM para la gestión de bases de datos relacionales. Se implementan entidades y servicios orientados a una aplicación de turismo, utilizando TypeScript y SQLite como tecnologías principales.

## Tecnologías Utilizadas
- TypeScript
- TypeORM
- Node.js
- SQLite

## Estructura del Proyecto
practica2/
│
├── 📁 src/
│   │
│   ├── 📁 domain/                 # Modelos de datos (clases o interfaces)
│   │   ├── administrador.model.ts
│   │   ├── atraccion.model.ts
│   │   ├── guia_cultural.model.ts
│   │   ├── hoteles.model.ts
│   │   ├── lugares_turisticos.model.ts
│   │   ├── propietario.model.ts
│   │   ├── resena.model.ts
│   │   ├── restaurantes.model.ts
│   │   ├── servicio.model.ts
│   │   ├── transporte.model.ts
│   │   ├── turista.model.ts
│   │   └── usuario.model.ts
│   │
│   ├── 📁 service/                # Servicios (lógica de negocio o API)
│   │   ├── administrador_servicio.ts
│   │   ├── atraccion_servicio.ts
│   │   ├── hoteles_servicio.ts
│   │   ├── propietario_servicio.ts
│   │   ├── restaurante_servicio.ts
│   │   ├── transporte_servicio.ts
│   │   └── turista_servicio.ts
│   │
│   ├── app.ts                     # Punto de entrada principal (inicializa la app)
│   └── app.d.ts                   # Tipos globales o definiciones (opcional)
│
├── package.json                   # Dependencias y scripts del proyecto
├── package-lock.json              # Bloqueo de versiones
└── README.md                      # Documentación del proyecto

## Requisitos Previos
- Tener instalado Node.js (version 18 o superior)
- npm o yarn

## Instalación
1. Accede al directorio del proyecto:
    cd practica2
2. Instala las dependencias necesarias:
    npm install

## Scripts Disponibles
npm run dev

Ejecuta la aplicación en modo desarrollo utilizando ts-node.

npm start

Inicia la aplicación en modo normal.

npm test

Ejecuta los tests (pendiente de implementación).

## Ejecución
1. Asegúrate de estar dentro del directorio practica2
2. Si aún no instalaste las dependencias, ejecútalo:
    npm install
3. Luegose inicia la aplicación con:
    npm run dev

## Entidades Implementadas
-Administrador: Representa a los usuarios encargados de la gestión general del sistema.
-Atracción: Representa las atracciones turísticas disponibles.
-Guía Cultural: Contiene información sobre los guías turísticos.
-Hoteles: Registra los alojamientos disponibles.
-Lugares Turísticos: Define los principales sitios de interés.
-Propietario: Contiene los datos de los dueños de hoteles, restaurantes u otros servicios.
-Reseña: Guarda las opiniones y valoraciones de los usuarios.
-Restaurantes: Registra las opciones gastronómicas.
-Servicio: Agrupa los servicios turísticos generales.
-Transporte: Incluye los medios de transporte disponibles.
-Turista: Contiene la información de los visitantes o clientes.
-Usuario: Define los datos generales de los usuarios del sistema.

## Base de Datos
El proyecto utiliza SQLite como sistema de base de datos.
El archivo .db se genera automáticamente al iniciar la aplicación por primera vez.

## Notas
-La base de datos se crea de forma automática en la primera ejecución
-Los archivos de base de datos (.db) están excluidos del control de versiones

