# GoDaddy DNS Setup for digitalhealthcounsel.com

## Website (Vercel)

### Edit the A Record
- Find the row where **Type** is `A` and **Name** is `@`
- Change the **Value** to `76.76.21.21`
- Set **TTL** to 1 Hour

### Edit the CNAME Record for www
- Find the row where **Type** is `CNAME` and **Name** is `www`
- Change the **Value** to `201d69b786d13f45.vercel-dns-017.com.`
- Set **TTL** to 1 Hour

---

## Email (Resend)

### DKIM Record
- **Type:** TXT
- **Name:** `resend._domainkey`
- **Value:** `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrnM2JwZQOBb0zrDWb1RLTJpB4dXiXy55rVcbuXWGTGqChdfa72n/d+J5TGc6LkmjRPrZuRtxGkX68V2kGZfE76Mw/WeGbYvfKkEk/V0jNaBcrQ06FcBJurxRtv+NeHRw7IrU6emU7uQPuL0fPcd4LwRuNv2dF91c0U1qNOjjSdwIDAQAB`
- **TTL:** 1 Hour

### SPF — MX Record
- **Type:** MX
- **Name:** `send`
- **Value:** `feedback-smtp.us-east-1.amazonses.com`
- **Priority:** 10
- **TTL:** 1 Hour

### SPF — TXT Record
- **Type:** TXT
- **Name:** `send`
- **Value:** `v=spf1 include:amazonses.com ~all`
- **TTL:** 1 Hour

### DMARC Record
- **Type:** TXT
- **Name:** `_dmarc`
- **Value:** `v=DMARC1; p=none;`
- **TTL:** 1 Hour

---

## After DNS Changes

Once records propagate (15 min to a few hours):

1. Verify domain shows green checkmark in Vercel (Settings → Domains)
2. Verify domain in Resend dashboard (Domains → click Verify)
3. Update `EMAIL_FROM` in Vercel env vars to `noreply@digitalhealthcounsel.com`
4. Update `NEXT_PUBLIC_APP_URL` in Vercel env vars to `https://digitalhealthcounsel.com`
5. Redeploy
