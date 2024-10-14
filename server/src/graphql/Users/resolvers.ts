const queries = {
  hello: () => "hello world",
};
const mutations = {
  createUser: (_:any, { email, password }: { email: string; password: string }) => {
    return `random id ${email} and ${password}`;
  },
};

const resolvers = { queries, mutations };

export default resolvers;
