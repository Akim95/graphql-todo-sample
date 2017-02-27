import { buildSchema } from 'graphql';

// sql model
import { Todos } from './connectors';

// GraphQL schema
const schema = buildSchema(`
  type Todo {
    id: Int
    task: String
    completed: Boolean
  }
  type Query {
    todos: [Todo]
  }
  type Mutation {
    createTodo(id: Int!, task: String!): Todo
  }
`);

// GraphQL resolver
const root = {
  todos: () => {
    return Todos.findAll({ order: 'createdAt DESC' });
  },
  createTodo: ({ id, task }) => {

    const todo = {
      id,
      task,
      completed: false,
    };

    Todos.create(todo);
    return todo;
  }
};

export { schema, root };
