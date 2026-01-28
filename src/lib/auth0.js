// lib/auth0.js

import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Helper function to clean environment variable values (remove quotes)
const cleanEnv = (value) => {
  if (!value) return undefined;
  return value.replace(/^['"]|['"]$/g, "").trim();
};

// Clean domain - remove https:// if present (Auth0 domain should be just the domain)
const getDomain = () => {
  const domain = cleanEnv(process.env.AUTH0_DOMAIN);
  if (!domain) return undefined;
  return domain.replace(/^https?:\/\//, "");
};

// Initialize the Auth0 client 
export const auth0 = new Auth0Client({
  domain: getDomain(),
  clientId: cleanEnv(process.env.AUTH0_CLIENT_ID),
  clientSecret: cleanEnv(process.env.AUTH0_CLIENT_SECRET),
  appBaseUrl: cleanEnv(process.env.APP_BASE_URL),
  secret: cleanEnv(process.env.AUTH0_SECRET),

  authorizationParameters: {
    // In v4, the AUTH0_SCOPE and AUTH0_AUDIENCE environment variables for API authorized applications are no longer automatically picked up by the SDK.
    // Instead, we need to provide the values explicitly.
    scope: cleanEnv(process.env.AUTH0_SCOPE),
    audience: cleanEnv(process.env.AUTH0_AUDIENCE)
  }
});