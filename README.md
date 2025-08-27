# Запуск проекта

Подготовить контейнер с mongodb
docker run -d \
 --name mongo \
 -p 27017:27017 \
 -v mongo_data:/data/db \
 -e MONGO_INITDB_DATABASE=testdb \
 -e MONGO_INITDB_ROOT_USERNAME=user \
 -e MONGO_INITDB_ROOT_PASSWORD=mongopass \
 mongo:latest

## Локальный запуск

cd frontend/
npm i
npm run dev

cd backend/
npm i
В app.js:

- закоментить строку **app.use(express.static("../frontend/dist"));**
- указать DB_CONNECTION_STRING_LOCAL
  npm run dev

## Запуск в Docker

В backend/app.js:

- раскомментить строку **app.use(express.static("../frontend/dist"));**
- указать DB_CONNECTION_STRING_DOCKER

docker build -t blog .
docker run -p 3006:3001 blog

# Пример файла backend/.env

DB_CONNECTION_STRING="mongodb://user:mongopass@localhost:27017/blog-app?authSource=admin"
DB_CONNECTION_STRING_DOCKER="mongodb://user:mongopass@host.docker.internal:27017/blog-app?authSource=admin"
JWT_SECRET="testtest"
