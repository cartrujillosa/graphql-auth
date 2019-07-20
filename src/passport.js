const passport = require("passport");
const { Strategy: GoogleTokenStrategy } = require("passport-google-token");

// GOOGLE STRATEGY
const GoogleTokenStrategyCallback = (
  accessToken,
  refreshToken,
  profile,
  done
) =>
  done(null, {
    accessToken,
    refreshToken,
    profile
  });

passport.use(
  new GoogleTokenStrategy(
    {
      clientID:
        "98042758787-g1h3nu96qn0qnbp4q9s5sitj6gss0di4.apps.googleusercontent.com",
      clientSecret: "NB5oEGuCeC5nODtDz7xgLZKC"
    },
    GoogleTokenStrategyCallback
  )
);

// promisified authenticate functions
const authenticateGoogle = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      "google-token",
      { session: false },
      (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
      }
    )(req, res);
  });

module.exports = { authenticateGoogle };
