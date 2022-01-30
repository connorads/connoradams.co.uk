import Toucan from "toucan-js";

const errorHandler = async ({
  request,
  waitUntil,
  next,
  env,
}: {
  request: Request;
  waitUntil: (promise: Promise<any>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: { SENTRY_DSN?: string; ENVIRONMENT?: string };
}) => {
  let sentry: Toucan | undefined;
  if (env.SENTRY_DSN)
    sentry = new Toucan({
      dsn: env.SENTRY_DSN,
      environment: env.ENVIRONMENT || "development",
      context: { waitUntil, request },
      allowedHeaders: ["user-agent"],
      allowedSearchParams: /(.*)/,
    });
  try {
    return await next();
  } catch (err) {
    if (sentry) sentry.captureException(err);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const onRequest = [errorHandler];
