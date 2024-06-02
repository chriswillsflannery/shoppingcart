# shopping-cart

Application with React/Vite, TypeScript, Node.js, tRPC, Fastify, Zod, Prisma, SQLite

[Sys design document / scratch notes](https://docs.google.com/document/d/15kiyQMm545xbSEMeu7W12Kma_7qnyfGvV6WbvuNO7zk/edit?usp=sharing)

## Getting Started

Notes:

- I am currently using Node v20.13.1 locally. YMMV with dependencies installation if your node version differs.
- I decided to forego rolling this project into a docker container - trying to update docker version on my old macbook almost made it take off into orbit

### Install dependencies

```bash
cd into serv directory
npm i
```

### Database seed

```bash
you should currently be in 'serv' directory. execute:
npx prisma db seed
```

### Watch TS changes & gen JS bundle

```bash
in 'serv' directory execute:
npm run watch
```

### Run tRPC server

```bash
in 'serv' directory execute:
npm run dev
```

### Run client app

```bash
cd into client and execute:
npm i
npm run dev
```

Application is now running and accessible to the web user at localhost:5173.
