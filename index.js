import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./src/schema";
import resolvers from "./src/resolvers";
import http from "http";

const PORT = 3030;
const MONGO_URL = "mongodb://localhost/node-graphql";
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

server.applyMiddleware({
  app
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(
    `:: Server ready at http://localhost:${PORT}${server.graphqlPath} ::`
  );
});

mongoose
  .connect(MONGO_URL, {
    // TODO check connections succesful and database name
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true
  })
  .then(() => console.log(`:: Connection successful: ${MONGO_URL} ::`))
  .catch(err => console.error(err));
