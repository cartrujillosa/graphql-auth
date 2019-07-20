const _ = require("lodash");
const userModel = require("../model/user");
const { authenticateGoogle } = require("./passport");

const resolvers = {
  Mutation: {
    authGoogle: async (_, { input: { accessToken } }, { req, res }) => {
      req.body = {
        ...req.body,
        access_token: accessToken
      };

      try {
        // data contains the accessToken, refreshToken and profile from passport
        const { data, info } = await authenticateGoogle(req, res);

        if (data) {
          const user = await userModel.upsertGoogleUser(data);

          if (user) {
            return {
              email: user.email,
              token: user.generateJWT()
            };
          }
        }

        if (info) {
          switch (info) {
            case "ETIMEDOUT":
              return new Error("Failed to reach Google: Try Again");
            default:
              return new Error(
                info.oauthError.statusCode + ": " + info.message
              );
          }
        }
        return Error("server error");
      } catch (error) {
        return error;
      }
    }
  }
};

module.exports = resolvers;
