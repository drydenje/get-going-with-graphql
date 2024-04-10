import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { expressjwt } from "express-jwt";

import resolvers from "./graphql/resolvers.mjs";
import typeDefs from "./graphql/typeDefs.mjs";
import permissions from "./graphql/permissions.mjs";
import UniqueDirective from "./graphql/directives/UniqueDirective.mjs";
import JsonServerApi from "./graphql/dataSources/JsonServerApi.mjs";

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    unique: UniqueDirective,
  },
});

const schemaWithPermissions = applyMiddleware(schema, permissions);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema: schemaWithPermissions,
  // This is for the 'unique' directive, need to update it for apollo-v4
  schemaDirectives: {
    unique: UniqueDirective,
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/",
  express.json(),
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const user = req.auth || null;
      const { cache } = server;
      const token = req.headers.token;

      return {
        user,
        // token,
        dataSources: {
          jsonServerApi: new JsonServerApi({ cache, token }),
        },
      };
    },
  }),

  (err, req, res, next) => {
    if (err.code === "invalid_token") {
      return next();
    }
    return next(err);
  }
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`Server ready at http://localhost:4000/`);

// // This is for the 'unique' directive, need to update it for apollo-v4
// // import UniqueDirective from "./graphql/directives/UniqueDirective.mjs";

// const app = express();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const { url } = await startStandaloneServer(server, {
//   context: async ({ req }) => {
//     const { cache } = server;
//     const token = req.headers.token;
//     return {
//       dataSources: {
//         jsonServerApi: new JsonServerApi({ cache, token }),
//       },
//       // This is for the 'unique' directive, need to update it for apollo-v4
//       // schemaDirectives: {
//       //   unique: UniqueDirective,
//       // },
//     };
//   },
//   listen: { port: process.env.PORT || 4000 },
// });

// await server.start();

// app.use("/graphql", cors(), express.json(), expressMiddleware(server));

// // console.log(`Server ready at ${url}`);
