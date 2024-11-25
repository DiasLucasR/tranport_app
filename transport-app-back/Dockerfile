# Usar imagem base do Node.js
FROM node:18

# Configurar diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY package*.json ./
RUN npm install

# Copiar o restante do projeto
COPY . .

# Compilar TypeScript
RUN npm run build

# Comando padrão
CMD ["node", "dist/index.js"]