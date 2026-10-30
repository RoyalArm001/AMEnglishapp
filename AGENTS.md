# Project instructions

## Versioning — explicit user preference

- Increment the application version for every completed change, including small fixes. Do not reuse the previous version for a new change set.
- Keep the root versions in `package.json` and `package-lock.json`, `APP_VERSION` in `lib/pwa.ts`, the cache version in `public/sw.js`, and the displayed README version consistent. Never change dependency versions as part of this operation.
- Add a dated entry to `CHANGELOG.md` explaining what changed and where. Report the new version to the user.
- Use patch increments for fixes and small changes, minor increments for new features, and major increments for breaking changes.
- A version increment, GitHub push, and production deployment are separate actions. Do not imply that a pushed branch is live. Production deployment requires the user's authorization.
- Respect explicit read-only audit instructions: do not modify application/version files or deploy during an audit. Report findings without claiming untested functionality passes.
