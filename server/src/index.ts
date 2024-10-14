import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import graphqlServer from "./graphql/graphql";

const app = express();
const Port = process.env.PORT || 4100;

app.use(express.json());

async function startServer() {
  app.use(`/graphql`, expressMiddleware(await graphqlServer()));
  app.listen(Port, () => console.log("server is running at", Port));
}
startServer();

app.get("/", (req, res) => {
  res.send("hello");
});
