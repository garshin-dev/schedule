FROM node:20

WORKDIR /app

# Копируем package.json и pnpm-lock.yaml (если есть)
COPY package.json ./
COPY pnpm-lock.yaml ./

# Устанавливаем pnpm, если еще не установлен
RUN npm install -g pnpm

# Устанавливаем все зависимости
RUN pnpm install

# Запускаем dev сервер
CMD ["pnpm", "run", "dev"]