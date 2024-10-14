import { ApolloServer } from "@apollo/server";
import { User } from "./Users/userIndex";

async function graphqlServer() {
  const graphql = new ApolloServer({
    typeDefs: `
      type Query{
      ${User.queries}
    }
    type Mutation{
      ${User.mutations}
    }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });
  await graphql.start();
  return graphql;
}

export default graphqlServer;

// const gqlServer = new ApolloServer({
//   typeDefs: `
//   type Query{
//       hello:String
//       say(name:String):String
//   }
//   `,
//   resolvers: {
//     Query: {
//       hello: () => "graphql",
//       say: (_, { name }: { name: string }) => `hello ${name}`,
//     },
//   },
// });
// await gqlServer.start();
