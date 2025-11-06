import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z.preprocess(
        (val) => val || "",
        z.string().min(2, "Name must be at least 2 characters"),
      ),
      email: z.preprocess(
        (val) => val || "",
        z.string().email("Please enter a valid email address"),
      ),
      message: z.preprocess(
        (val) => val || "",
        z.string().min(15, "Message must be at least 15 characters"),
      ),
      company: z.preprocess((val) => val || "", z.string()),
      renderTime: z.preprocess((val) => val || "", z.string()),
      "cf-turnstile-response": z.preprocess(
        (val) => val || "",
        z.string().min(1, "Please complete the captcha verification"),
      ),
    }),
    handler: async (input, context) => {
      // Honeypot validation - company field should be empty
      if (input.company) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Invalid form submission",
        });
      }

      // Render time validation - must be at least 3 seconds
      const renderTime = parseInt(input.renderTime);
      const currentTime = Date.now();
      const timeDiff = (currentTime - renderTime) / 1000; // Convert to seconds

      if (isNaN(renderTime) || timeDiff < 3) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Form submitted too quickly. Please try again.",
        });
      }

      // Access environment variables via Cloudflare runtime
      const env = context.locals.runtime.env;

      // Verify Cloudflare Turnstile token
      const turnstileSecret = env.TURNSTILE_SECRET_KEY;
      if (!turnstileSecret) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Captcha service is not configured",
        });
      }

      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            secret: turnstileSecret,
            response: input["cf-turnstile-response"],
          }),
        },
      );

      const turnstileResult = await turnstileResponse.json();

      if (!turnstileResult.success) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Captcha verification failed. Please try again.",
        });
      }

      const resendApiKey = env.RESEND_API_KEY;
      const recipientEmails = env.CONTACT_RECIPIENT_EMAILS.split(",").map(
        (email: string) => email.trim(),
      );
      const fromEmail = env.CONTACT_FROM_EMAIL;

      // Validate environment variables
      if (!resendApiKey) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Email service is not configured",
        });
      }

      if (!recipientEmails || recipientEmails.length === 0) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No recipient email addresses configured",
        });
      }

      if (!fromEmail) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Sender email is not configured",
        });
      }

      // Initialize Resend
      const resend = new Resend(resendApiKey);

      // Send email
      try {
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: recipientEmails,
          subject: `New Contact Form Submission from ${input.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p>New message on connoradams.co.uk contact form:</p>
            <p><strong>From:</strong> ${input.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${input.email}">${input.email}</a></p>
            <p><strong>Message:</strong></p>
            <p>${input.message.replace(/\n/g, "<br>")}</p>
          `,
          replyTo: input.email,
        });

        if (error) {
          console.error("Resend error:", error);
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to send email. Please try again later.",
          });
        }

        return {
          success: true,
          message: "Thank you for your message! I'll get back to you soon.",
          emailId: data?.id,
        };
      } catch (err) {
        console.error("Error sending email:", err);

        if (err instanceof ActionError) {
          throw err;
        }

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    },
  }),
};
