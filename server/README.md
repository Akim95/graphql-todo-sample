## TODO GRAPHQL SERVER

#### Install dependencies:
```
  yarn install or
  npm install
```

#### Replace mysql/mariadb user and password:
```javascript
// connectors.js
const db = new Sequelize('Todos', '<user>', '<password>', {
  host: 'localhost',
  dialect: 'mariadb',
});
```

#### Start server:
```
  yarn start or 
  npm start
```

### NOTE:
Comment this code after first run:
```javascript
// connectors.js
/*
db.sync().then(() => {
  TodoModel.create({
    id: 1,
    task: 'demo data',
    completed: false,
  });
});
*/
```
