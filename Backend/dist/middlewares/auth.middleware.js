import { auth } from 'express-oauth2-jwt-bearer';
const jwtCheck = auth({
    audience: 'https://dev-26caq3b55jx5o1cq.us.auth0.com/api/v2/',
    issuerBaseURL: 'https://dev-26caq3b55jx5o1cq.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});
export { jwtCheck };
