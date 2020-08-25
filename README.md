## Simple Todo List CRUD API with Express

#### 1. Create PostgreSQL DB
```
createdb todo-express-server
```

#### 2. Create 'todo table

Can use PSQL CLI: `psql todo-express-server`

```
CREATE TABLE todo (
 id serial PRIMARY KEY,
 content VARCHAR(100),
 done BOOLEAN DEFAULT FALSE,
 added TIMESTAMP NOT NULL
);
```

#### 3. Start server using `node server.js`
