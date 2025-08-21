# --------
# 1. STAGE: Build
# --------
FROM node:20 AS builder

# Diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar dependências
COPY package*.json ./

# Instalar dependências (inclui devDependencies para poder compilar)
RUN npm install

# Copiar todo o código
COPY . .

# Compilar o projeto (gera dist/)
RUN npm run build

# --------
# 2. STAGE: Production
# --------
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copiar apenas arquivos de dependências
COPY package*.json ./

# Instalar dependências sem dev (mais leve)
RUN npm install --omit=dev

# Copiar apenas os arquivos compilados da stage anterior
COPY --from=builder /usr/src/app/dist ./dist

# Expor a porta padrão
EXPOSE 3000

# Rodar a versão buildada
CMD ["node", "dist/main.js"]
