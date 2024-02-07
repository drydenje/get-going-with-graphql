import { ApolloServer } from "apollo-server";

import resolvers from "./graphql/resolvers.mjs";
import typeDefs from "./graphql/typeDefs.mjs";
import JsonServerApi from "./graphql/dataSources/JsonServerApi.mjs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      jsonServerApi: new JsonServerApi(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at: ${url}`);
});
