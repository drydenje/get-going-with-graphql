import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./graphql/resolvers.mjs";
import typeDefs from "./graphql/typeDefs.mjs";
import JsonServerApi from "./graphql/dataSources/JsonServerApi.mjs";

// This is for the 'unique' directive, need to update it for apollo-v4
// import UniqueDirective from "./graphql/directives/UniqueDirective.mjs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const { cache } = server;
    const token = req.headers.token;
    return {
      dataSources: {
        jsonServerApi: new JsonServerApi({ cache, token }),
      },
      // This is for the 'unique' directive, need to update it for apollo-v4
      // schemaDirectives: {
      //   unique: UniqueDirective,
      // },
    };
  },
  listen: { port: process.env.PORT || 4000 },
});

console.log(`Server ready at ${url}`);
