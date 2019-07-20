# graphql-auth

Authentication project to get token and then use in other projects

## Installation

```bash
git clone git@github.com:cartrujillo/graphql-auth.git
cd graphql-auth
npm install
npm start
```

## Usage

1. Go to: https://developers.google.com/oauthplayground/
2. Looking for: *Google OAuth2 API v2*
3. Check 3 options and *Authorize APIs*
4. Select your account
5. Now you can get the **access_token**
6. Go to http://localhost:3030/graphql and do the request using the **access_token**
```
mutation{
  authGoogle(input: {accessToken: <access_token>})
	{
    token
  }
}
```
7. Now you can use the returned token in your applications