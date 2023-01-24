import { formSchema } from "../../src/components/Form";

// https://developers.cloudflare.com/pages/platform/functions
export async function onRequestPost(context: {
  // https://bit.ly/3r38OsV
  request: Request;
  env: { SENDGRID_API_KEY?: string; TO_EMAIL?: string; FROM_EMAIL?: string };
}) {
  const { request, env } = context;
  const body: unknown = await request.json();
  const result = formSchema.safeParse(body);
  if (result.success === false)
    return new Response(result.error.message, { status: 400 });

  if (env.SENDGRID_API_KEY && env.TO_EMAIL && env.FROM_EMAIL) {
    // https://docs.sendgrid.com/api-reference/mail-send/mail-send
    const msg = {
      personalizations: [{ to: [{ email: env.TO_EMAIL }] }],
      from: { name: result.data.name, email: env.FROM_EMAIL },
      subject: `Message from: ${result.data.name}`,
      content: [{ type: "text/plain", value: JSON.stringify(body, null, 2) }],
    };

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      body: JSON.stringify(msg),
      headers: {
        Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok)
      return new Response("Error whilst sending email", { status: 500 });
  }

  return new Response();
}
