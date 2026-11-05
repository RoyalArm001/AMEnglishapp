# Google Search indexing

The public origin is `https://armeng.royalarm.uk` (`lib/site.ts`).

## Findings on 2026-11-05

The live home page, robots.txt and sitemap.xml returned HTTP 200. Robots allowed
the home page and there was no `X-Robots-Tag` header blocking indexing. However,
the initial HTML body only contained a loading message. The sitemap also listed
personal query tabs that all shared the home page canonical URL. These are
technical weaknesses, not proof of Google's reason for excluding the site;
that reason requires the owner's Search Console URL Inspection report.

Version 1.9.4 renders the public introduction in the initial HTML and retains it
on the first-visit onboarding screen. The sitemap now lists only the canonical
public home page. It no longer assigns artificial modification dates at build
time. Canonical, robots and sitemap URLs share one origin. The optional
`GOOGLE_SITE_VERIFICATION` environment variable supports HTML-tag verification;
structured data reads the current package version.

## Local validation (2026-11-05)

- `npm run build`: passed, including TypeScript checks.
- `npm run test:e2e -- tests/e2e/search-indexing.spec.ts`: 9 passed across desktop,
  tablet and mobile projects. Checks cover public content without JavaScript,
  canonical metadata, sitemap/robots responses, content after hydration,
  onboarding persistence, browser errors and horizontal overflow.
- `npm test`: 98 passed, 3 failed on Node 22.23.4. The failures are existing
  SQLite backup tests calling `db.serialize`, which is unavailable in this
  runtime. The SQLite implementation was not changed by this fix.
- No production deployment or Search Console submission was performed.

## After deployment

1. Open [Google Search Console](https://search.google.com/search-console) and
   select or add the URL-prefix property `https://armeng.royalarm.uk/`.
2. Verify ownership if needed. For HTML-tag verification, copy only the tag's
   `content` value into `GOOGLE_SITE_VERIFICATION` in the hosting environment
   and rebuild/redeploy. An already verified property or DNS verification does
   not require this variable.
3. Submit `https://armeng.royalarm.uk/sitemap.xml` in Sitemaps.
4. Inspect `https://armeng.royalarm.uk/` with URL Inspection, run Test Live URL,
   check that the rendered page contains the public description, and select
   Request Indexing. Review any reported indexing exclusion or crawl failure.
5. Monitor Page Indexing and Search Performance. A local build does not update
   production, and a successful deployment does not mean Google has indexed it.

Google says crawling can take days to weeks and inclusion is not guaranteed.
See [recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl),
[JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
