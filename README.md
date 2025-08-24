Запуск проекта

npm i
npm run dev
json-server --watch src/db.json -p 3005
npx json-server@0.17.4 --watch src/db.json -p 3005

Области хранения данных:

- База данных на json-server
- BFF
- редакс стор

Сущности приложения:

- пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
- роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)
- статья: бд (список статей), стор (отображение в браузере)
- комментарий: БД (список комментариев), стор (отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registered_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url / content / published_at
- комментарии - comments: id / author_id / post_id / content / published_at

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

- user: id / login / role_id / session
- posts: массив post: id / title / imageUrl / publishedAt / commentsCount
- posts: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
- users: массив user: id / login / registeredAt / role
