# HayLingo developer guide

Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion and browser speech tools.

## Run locally

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. No environment variables or API keys are required.

## Validate and build

```sh
npm test
npm run build
npm start
```

Tests cover bilingual lookup, keyless requests, response validation, quotas, cancellation, caching, and local study feedback. The production build checks TypeScript.

## Learning content

- `data/lessons.ts`, `data/vocabulary.ts`, `data/exercises.ts`: lessons, flashcards and answer keys.
- `data/professions.ts`, `data/it-english.ts`: professional examples and scripted dialogue.
- `data/common-translations.ts`: original starter phrasebook; add checked English–Armenian pairs by category.
- `lib/translation-dictionary.ts`: deduplicated bilingual lookup from the existing material.
- `lib/translation.ts`: dictionary-first lookup, MyMemory, timeout, quota handling and a bounded session cache.
- `lib/teacher-engine.ts`: prepared curriculum and local rules; no external model provider or server request.

Do not bulk-translate the curriculum through a public service. Online suggestions remain separate from checked study material. Update README counts when the content changes.

## Translation service

MyMemory is called directly from the browser after the learner submits a request. This avoids routing everyone through one application-server quota. The provider enforces its own limits; unlimited availability is not guaranteed.

- [API specification](https://mymemory.translated.net/doc/spec.php): `GET /get`, optional key, maximum 500 UTF-8 bytes per query.
- [Usage limits](https://mymemory.translated.net/doc/usagelimits.php): anonymous usage currently 5,000 characters/day.
- [Terms](https://mymemory.translated.net/terms-and-conditions): no archive crawling, bulk scraping or limit circumvention.

Requests omit credentials and contact email. This app does not log user text or call the provider's contribution endpoint. The external service still receives submitted text. Google Translate is a regular link fallback, not an undocumented endpoint integration.

## Vercel and armeng.royalarm.store

1. Import `RoyalArm001/AMEnglishapp` from GitHub into Vercel.
2. Choose **Next.js**, root `./`, production branch `main`, install command `npm ci`, build command `npm run build`.
3. Add `armeng.royalarm.store` in **Settings → Domains**.
4. At the DNS provider, create a `CNAME` named `armeng` with the exact target shown by Vercel. The parent domain must have working nameservers.
5. Wait for **Valid Configuration** and HTTPS. With Git integration enabled, pushes to `main` trigger deployments.

The domain in application metadata does not itself configure DNS or deploy the website.
