const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type AuthResponse {
    token: String
    email: String
  }

  input AuthInput {
    accessToken: String!
  }

  type User {
    _id: ID!
    email: String
    zircoins: Int
  }

  type Mutation {
    authGoogle(input: AuthInput!): AuthResponse
  }
`;

module.exports = typeDefs;
