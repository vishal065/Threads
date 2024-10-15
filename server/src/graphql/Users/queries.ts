//typeDefs wali h
export const queries = `#graphgql
    hello:String
    loginUser(email: String! , password: String!):String
    getCurrentLoggedInUser: UserTypeDefs
    `;


// getCurrentLoggedInUser: UserTypeDefs; // custom type to return
