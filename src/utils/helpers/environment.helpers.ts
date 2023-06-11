export const isClient = () => typeof window !== "undefined";
export const isServer = () => typeof window === "undefined";
export const isProduction = () => process.env.NODE_ENV === "production";

export const Environment = { isClient, isServer, isProduction };
