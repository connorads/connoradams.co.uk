const errorHandler = async ({
  next,
}: {
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}) => {
  try {
    return await next();
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const onRequest = [errorHandler];
