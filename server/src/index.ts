import express, { Request } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import graphqlServer from "./graphql/graphql";
import UserService from "./services/userService";

const app = express();
const Port = process.env.PORT || 4100;

app.use(express.json());

async function startServer() {
  app.use(
    `/graphql`,
    expressMiddleware(await graphqlServer(), {
      context: async ({ req }: { req: Request }) => {
        const token = req.headers.token || req.headers["token"];
        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (error) {
          console.error("JWT decoding error:", error);
          return { user: null };
        }
      },
    })
  );
  app.listen(Port, () => console.log("server is running at", Port));
}
startServer();

app.get("/", (req, res) => {
  res.send("hello");
});
