import { FormSubmission } from "../../src/components/Form";

export async function onRequestPost(context: {
  request: Request;
  env: { SENDGRID_API_KEY?: string; TO_EMAIL?: string; FROM_EMAIL?: string };
}) {
  const { request, env } = context;
  const form: FormSubmission = await request.json();
  console.log("Contact form submitted", JSON.stringify(form, null, 2));

  if (env.SENDGRID_API_KEY && env.TO_EMAIL && env.FROM_EMAIL) {
    const msg = {
      personalizations: [{ to: [{ email: env.TO_EMAIL }] }],
      from: { name: form.name, email: env.FROM_EMAIL },
      subject: `Message from: ${form.name}`,
      content: [{ type: "text/plain", value: JSON.stringify(form, null, 2) }],
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
