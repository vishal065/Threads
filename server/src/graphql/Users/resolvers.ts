import UserService, { createUserPayload } from "../../services/userService";

const queries = {
  hello: () => "hello world",
  loginUser: async (_: any, payload: { email: string; password: string }) => {
    // const token = UserService.loginUser(payload);
    const token = UserService.loginUser({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },
};
const mutations = {
  createUser: async (_: any, payload: createUserPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

const resolvers = { queries, mutations };

export default resolvers;
