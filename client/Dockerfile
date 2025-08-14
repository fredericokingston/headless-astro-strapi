# Multi-stage build para o client Astro
FROM node:lts-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Build da aplicação
RUN pnpm run build

# Stage de produção com Node.js
FROM node:lts-alpine AS runtime

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instalar apenas dependências de produção
RUN pnpm install --frozen-lockfile --prod

# Copiar arquivos buildados do stage anterior
COPY --from=builder /app/dist ./dist

# Expor porta 3000
EXPOSE 3000

# Comando para iniciar Astro
CMD ["pnpm", "run", "preview"]
