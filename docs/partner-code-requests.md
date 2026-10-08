# Partner code email requests

Primary partner CTA opens the library Dialog with one email field. The team sends the code manually after receiving the email. There is no automatic email delivery or automatic code issuance.

`POST /api/partner-code` validates email/EN-RU, limits JSON size, checks the browser origin and honeypot, forwards a plain-text message to Telegram and acknowledges only confirmed Telegram acceptance. Failed/unconfigured delivery keeps the form in retry/error state. Tracking records no email. Referral/UTM fields are bounded, carried to the bot and retained in existing analytics context.

Create the Telegram bot in BotFather and add it to the receiving chat first. Configure **server-only** environment variables locally and later in the hosting project:

```dotenv
PARTNER_TELEGRAM_BOT_TOKEN=
PARTNER_TELEGRAM_CHAT_ID=
```

No bot existed when this implementation was requested. No real credentials are included, no bot was created and no real test message was sent. Until configured, the endpoint responds 503; the page offers the locale's messenger as a fallback. Deployment remains a separate request.

The handler has a bounded, hashed-IP per-instance quota (three delivery attempts in ten minutes) and successful-email deduplication/in-flight sharing. It is not a distributed rate-limit store; multi-instance deployments should add platform rate limiting. Failed deliveries do not mark an email as sent.

Preferred partnership CTA destinations are centralized in `app/utils/partner-contact.js`: RU Telegram, EN WhatsApp, future VI Zalo. No Vietnamese page, route or SEO alternate is added.

Transport reference: [Telegram Bot API sendMessage](https://core.telegram.org/bots/api#sendmessage).
