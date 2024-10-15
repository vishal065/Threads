import UserService, { createUserPayload } from "../../services/userService";

const queries = {
  hello: () => "hello world",
  loginUser: async (_: any, payload: { email: string; password: string }) => {
    // const token = UserService.loginUser(payload);
    const token = await UserService.loginUser({
      email: payload.email,
      password: payload.password,
    });
    console.log("token in resolver ", token);

    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameter: any, context: any) => {
    if (context && context.user) {
      // return context.user;
      const id = context.user.id;
      const user = await UserService.getUserById(id); //UserService jaha bhi h jo ki async func ko call kr rhi h uspe await lgega
      return user;
    }
    throw new Error("error from getCurrentLoggedInUser");
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
