# Deploy silverbackai.agency — 4 Steps

## 1. Upload the worker

Go to **Cloudflare dashboard** → Workers & Pages → `silverbackai` → Edit Code

Paste the entire contents of `worker.js` into the editor → **Deploy**

(Or run `wrangler deploy` from this folder if you have the CLI set up)

## 2. Add the route

Go to `silverbackai` worker → Settings → Triggers → Add Route:

- Route: `silverbackai.agency/*`
- Zone: `silverbackai.agency`
- Also add: `www.silverbackai.agency/*`

## 3. Add the Anthropic key

Go to `silverbackai` worker → Settings → Variables and Secrets → Add:

- Type: **Secret**
- Name: `ANTHROPIC_API_KEY`
- Value: (paste from https://console.anthropic.com/settings/keys)

## 4. Done

- Homepage: https://silverbackai.agency
- Samantha: https://silverbackai.agency/samantha
- Health check: https://silverbackai.agency/health
