# Description

## Correr en dev

1. Clonar repositorio.
2. Renombrar el archivo ```.env.template``` y cambiar las variables de entorno
3. Instalar dependencias ```pnpm install```
4. Levantar la base de datos con docker ```docker compose up -d```
5. Correr las migraciones de prisma ```pnpm dlx prisma migrate```
6. Ejecutar seed ```pnpm run seed```
7. Borrar localStorage

6. Correr el proyecto ```pnpm run dev```

## Correr en prod