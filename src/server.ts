import express from 'express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';

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

async function startApolloServer() {
  const endPoint = '/gql';
  const server = new ApolloServer({
    schema: schemaWithResolvers
  });

  const app = express();
  await server.start();
  server.applyMiddleware({
    path: endPoint,
    app
  });

  app.listen(4000, () => {
    console.info(`Server listening on http://localhost:4000${server.graphqlPath}`);
  });
}

startApolloServer();
