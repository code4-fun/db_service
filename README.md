## Используемые технологии

- NestJS

- TypeORM

## Описание

После запуска проекта нужно выполнить миграцию. Миграция заполняет таблицу **usr** одним миллионом записей. В таблице есть **boolean** поле **hasIssues**. Сервисный метод **updateIssuesFlag** (вызывается с помощью POST запроса http://localhost:3000/users/reset-issues) подсчитывает количество значений **true** в поле **hasIssues**, после чего меняет все значения на **false**.

В методе реализована пакетная обработка данных внутри рекурсивной функции, что позволяет избежать длительных транзакций, которые могут заблокировать таблицу на длительное время.

## Сборка и запуск

`git clone https://github.com/code4-fun/db_service.git`

`cd db_service`

`docker-compose up -d`

`npm install`

`npm start`

`npx typeorm-ts-node-commonjs migration:run -d ./data-source.ts`

Выполнить POST запрос http://localhost:3000/users/reset-issues