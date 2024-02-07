export const isClient = () => typeof window !== "undefined";
export const isServer = () => typeof window === "undefined";
export const isProduction = () => process.env.NODE_ENV === "production";
export const canSignUp = () => process.env.NEXT_PUBLIC_CAN_SIGNUP === "true";

export const Environment = { isClient, isServer, isProduction, canSignUp };
