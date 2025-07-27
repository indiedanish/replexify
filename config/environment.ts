// Environment configuration
export const ENV = {
  // API Configuration
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/",

  // Environment
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_TEST: process.env.NODE_ENV === "test",

  // Feature flags
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true",

  // External services
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID,

  // App configuration
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Replexify",
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",

  // Auth configuration
  AUTH_COOKIE_NAME: process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || "auth-token",
  AUTH_REFRESH_COOKIE_NAME:
    process.env.NEXT_PUBLIC_AUTH_REFRESH_COOKIE_NAME || "refresh-token",
} as const;

// Validate required environment variables
export const validateEnvironment = () => {
  const required = ["NEXT_PUBLIC_API_URL"];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn("Missing environment variables:", missing);
  }
};

// Call validation in development
if (ENV.IS_DEVELOPMENT) {
  validateEnvironment();
}
