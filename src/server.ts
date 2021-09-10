import express from 'express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';
import { graphqlHTTP } from 'express-graphql';

import { DB } from './db/db';
import { resolvers } from './resolvers/resolvers';

export const database = new DB({
  host: 'localhost',
  port: 5432,
  database: 'graphql-nodejs-tutorial',
  user: 'postgres',
  password: ''
});

const schema = loadSchemaSync(join(__dirname, './schemas/schema.graphql'), {
  loaders: [
    new GraphQLFileLoader()
  ]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const app = express();

app.use(
  graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.info('Server listening on http://localhost:4000');
});
