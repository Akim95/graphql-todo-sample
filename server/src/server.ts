import * as express from 'express';
import * as graphQLHTTP from 'express-graphql';
import { schema, root } from './schema';

const GraphQLPORT = 4000;
const app = express();

app.use('/graphql', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema,
  rootValue: root,
}));

app.listen(GraphQLPORT, () => {
  console.log(`GraphQL server run on port ${GraphQLPORT}`);
});
