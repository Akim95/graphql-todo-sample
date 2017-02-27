import * as Sequelize from 'sequelize';

// create sql connection
const db = new Sequelize('Todos', 'user', 'password', {
  host: 'localhost',
  dialect: 'mariadb',
});

// todos model
const TodoModel = db.define('todos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  task: {
    type: Sequelize.STRING,
  },
  completed: {
    type: Sequelize.BOOLEAN,
  },
});

// create initial data and remove all data after restart server
db.sync().then(() => {
  TodoModel.create({
    id: 1,
    task: 'demo data',
    completed: false,
  });
});

const Todos = db.models.todos;

// export todos model
export { Todos };
