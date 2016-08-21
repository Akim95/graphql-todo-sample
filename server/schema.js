import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql/type';

// data
import { Todos } from './connectors';

// todo type
const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    task: {
      type: GraphQLString,
    },
    completed: {
      type: GraphQLBoolean,
    },
  }),
});

// root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      resolve() {
        return Todos.findAll({ order: 'createdAt DESC' });
      },
    },
  }),
});

// root mutation
const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        task: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(root, args) {
        const todo = {
          id: args.id,
          task: args.task,
          completed: false,
        };
        Todos.create(todo);
        return todo;
      },
    },
  },
});

// export schema
export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
