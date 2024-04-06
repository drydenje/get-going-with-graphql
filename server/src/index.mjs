import resolvers from "./graphql/resolvers.mjs";
import typeDefs from "./graphql/typeDefs.mjs";
import JsonServerApi from "./graphql/dataSources/JsonServerApi.mjs";

// npm install @apollo/server express graphql cors
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { expressjwt } from "express-jwt";

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

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // dataSources: {
  //   // jsonServerApi: new JsonServerApi({ cache, token }),
  //   jsonServerApi: new JsonServerApi(),
  // },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/",
  // cors(
  //   {
  //   origin: ["https://studio.apollographql.com", "localhost:3000"],
  // }
  // ),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      // console.log("REQ:", req.headers);
      const user = req.auth || null;
      // console.log("REQ");

      // console.log(req);
      // console.log(req.headers.authorization);

      const { cache } = server;
      const token = req.headers.token;
      // console.log("TOKEN:", token);
      return {
        user,
        token,
        dataSources: {
          jsonServerApi: new JsonServerApi({ cache, token }),
          // jsonServerApi: new JsonServerApi(),
        },
      };
    },
  }),
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.query && req.query.token) {
        console.log(req.query.token);
        return req.query.token;
      }
      return null;
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
