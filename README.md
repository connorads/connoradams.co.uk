# [connoradams.co.uk](https://connoradams.co.uk)

Ello ello 👋 I'm Connor Adams and [this is my personal website 🌐](https://connoradams.co.uk)

[![Demo of connoradams.co.uk](https://user-images.githubusercontent.com/10026538/153757840-f4c14a88-9826-4984-b87c-9d6c5e694d5c.gif)](https://connoradams.co.uk)

## 👨‍💻 Made with

- [Astro](https://astro.build/) 🚀
- [Tailwind CSS](https://tailwindcss.com/) 🎏
- [Cloudflare Workers](https://workers.cloudflare.com/) ⚡
- And many more, see [`package.json`](package.json)

## ⚙️ Environment Variables

The contact form requires the following environment variables:

### Email Configuration (Resend)
- `RESEND_API_KEY` - Your Resend API key for sending emails
- `CONTACT_RECIPIENT_EMAILS` - Comma-separated list of recipient emails
- `CONTACT_FROM_EMAIL` - The sender email address

### Spam Protection (Cloudflare Turnstile)
- `PUBLIC_TURNSTILE_SITE_KEY` - Your Cloudflare Turnstile site key (public)
- `TURNSTILE_SECRET_KEY` - Your Cloudflare Turnstile secret key (private)

Get your Turnstile keys from the [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile).

## 👀 Spotted something?

Noticed something unexpected or have an idea?

Feel free to open a PR or drop me a message on my ... [website 😉](https://connoradams.co.uk)
