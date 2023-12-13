# bimitan

## start frontend server(Vite + Vue3)

```
$ pwd
*/binitan

$ cd client/

$ yarn install

$ yarn dev
Local:   http://localhost:5173/
```

Local:   http://localhost:5173/

## start docker

```
$ pwd
*/binitan

$ cd server/

$ docker-compose up -d

$ npx prisma migrate dev

$ mysql -uroot -p -h127.0.0.1 -P3306
Enter password:
```

## start backend server(Express)

```
$ pwd
*/binitan

$ cd server/

$ yarn install

$ yarn dev
dev server running at: http://localhost:3000/
```