import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { readFileSync } from "fs";
import mongoose from "mongoose";

import resolvers from "./resolvers.js";


import cors from "cors";
const app = express();

const typeDefs = gql(
  readFileSync("schema.graphql", {
    encoding: "utf-8",
  })
);

function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
 
  server
    .start()
    .then(() => {
      app.use("/graphql",  cors(), express.json(), expressMiddleware(server, {}));
    })
    .catch((error) => {
      console.log(error);
    });

  mongoose
    .connect(
      "mongodb+srv://awaisahmad:iW23X3mSwK68I2yX@cluster0.6zkkke7.mongodb.net/Node-Crud?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Connected to database!");

      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch(() => {
      console.log("connection failed!");
    });
}

startServer();
