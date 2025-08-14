# Dockerfile para o server Strapi
FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  sqlite \
  && rm -rf /var/cache/apk/*

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S strapi -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile --production=false

# Copiar código fonte
COPY . .

# Criar diretório para uploads e garantir permissões
RUN mkdir -p /app/public/uploads && \
  chown -R strapi:nodejs /app

# Build da aplicação Strapi
RUN yarn run build

# Mudar para usuário não-root
USER strapi

# Expor porta 1337
EXPOSE 1337

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=.tmp/data.db

# Comando para iniciar Strapi
CMD ["yarn", "start"]
