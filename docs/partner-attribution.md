# Partner Attribution Flow

## Partner link format

Partner traffic should use a normal site URL with attribution query parameters:

```txt
https://www.surfdanang.com/?partner=hotel_abc&utm_source=hotel_abc&utm_medium=partner&utm_campaign=partner_referral&utm_content=reception_qr
```

For Russian pages, the same parameters can be used on `/ru`:

```txt
https://www.surfdanang.com/ru?partner=hotel_abc&utm_source=hotel_abc&utm_medium=partner&utm_campaign=partner_referral&utm_content=reception_qr
```

## Supported parameters

The current first pass supports these attribution parameters:

- `partner`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`

## Storage

Attribution parameters are read from the current page URL and stored in `localStorage`.

Storage key:

```txt
epic_surf_attribution
```

Stored data may include the supported attribution parameters plus `landing_page` and `stored_at`.

## Events with partner attribution

The `partner` value is included in lead-related analytics events:

- `booking_cta_click`
- `whatsapp_click`
- `telegram_click`
- `zalo_click`
- `rental_cta_click`
- `partner_cta_click`

Other events may include UTM context, but `partner` is intentionally scoped to partner context and lead events.

## Language switch

The header language switch preserves the current query string when moving between language versions.

Example:

```txt
/?partner=hotel_abc&utm_source=hotel_abc
```

Switching to Russian keeps the attribution query:

```txt
/ru?partner=hotel_abc&utm_source=hotel_abc
```

## Messenger messages

WhatsApp, Telegram, and Zalo URLs are built with the current message text plus the stored partner code when one exists.

Example message suffix:

```txt
Partner code: hotel_abc
```

For Russian messages, the suffix uses the localized Russian label for "Partner code".

## Alteg booking URL

The Alteg booking URL is not modified in the current implementation.

Reason: the project does not yet confirm whether Alteg/YClients officially accepts or persists `partner` or `utm_*` parameters through the booking flow. Keeping the Alteg URL unchanged avoids breaking the booking iframe or depending on undocumented behavior.

Current attribution for Alteg bookings is captured before opening Alteg through the `booking_cta_click` analytics event.

## Manual checks

### Localhost

1. Start the local app:

```bash
npm run dev
```

2. Open a partner URL:

```txt
http://localhost:3000/?partner=hotel_abc&utm_source=hotel_abc&utm_medium=partner&utm_campaign=partner_referral&utm_content=reception_qr
```

3. Check browser `localStorage` for:

```txt
epic_surf_attribution
```

4. Click a booking CTA and verify `booking_cta_click` receives `partner` and UTM fields in the analytics payload.

5. Click WhatsApp, Telegram, or Zalo and verify the generated message includes the partner code.

6. Use the language switch and verify the query string remains on the next language URL.

### Production

1. Open:

```txt
https://www.surfdanang.com/?partner=hotel_abc&utm_source=hotel_abc&utm_medium=partner&utm_campaign=partner_referral&utm_content=reception_qr
```

2. Repeat the same checks:

- `localStorage.epic_surf_attribution`
- `booking_cta_click` analytics payload
- messenger message text
- language switch query preservation
- Alteg iframe still opens with the unchanged booking URL

## Next steps

- Check official Alteg/YClients documentation for supported source, comment, client field, or UTM parameters.
- Confirm whether query parameters survive the full booking flow and are visible in the booking record.
- If official support exists, add a small, URL-safe helper that appends approved parameters while preserving the existing Alteg `o` parameter.
- If official support does not exist, keep partner attribution in analytics and messenger messages, then reconcile Alteg bookings by time, source, and analytics records.
