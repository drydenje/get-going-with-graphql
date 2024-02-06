import { ApolloServer } from "apollo-server";

import resolvers from "./graphql/resolvers.mjs";
import typeDefs from "./graphql/typeDefs.mjs";
import JsonServerApi from "./graphql/dataSources/JsonServerApi.mjs";

console.log("ENV:", process.env.NODE_ENV);
console.log("URL:", process.env.REST_API_BASE_URL);
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
