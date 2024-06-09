## Описание

Создается таблица usr с миллионом записей

## Сборка и запуск

`git clone https://github.com/code4-fun/db_service.git`

`cd db_service`

`docker-compose up -d`

`npm install`

`npm start`

`npx typeorm-ts-node-commonjs migration:run -d ./data-source.ts`

Выполнить POST запрос http://localhost:3000/users/reset-issues