# histos.dev - the site

Nuxt 4, statically generated, no runtime services and no third-party requests. It is
a set of files: `npm run generate` produces `.output/public`, which any static host
will serve.

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # → .output/public
npx serve .output/public
```

## It is not only a landing page

`public/spec/` is the reason this deploys before anything else does.

The policy format declares its own identity:

```json
"$id": "https://histos.dev/spec/policy-0.1.schema.json"
```

That string is now inside every policy anyone writes, in every `$ref`, and in the
`# yaml-language-server:` line that gives editors completion and inline validation.
**Deploying this site is what makes that URL answer.** An `$id` that 404s is worse
than a placeholder, because everything downstream - editor tooling, `$ref`
resolution, a second implementation - depends on it resolving.

So the site serves, at exactly the paths the artifacts claim:

| URL | file |
|---|---|
| `/spec/policy-0.1.schema.json` | the format, as JSON Schema |
| `/spec/decision-codes.json` | the RUNTIME / POLICY / REVIEW vocabulary |
| `/spec/conformance-manifest.json` | the corpus case list and what *passing* may mean |

`npm run sync:spec` copies them out of `../histos` and **fails the build** if the
schema's `$id` and the URL this site serves ever disagree. `npm run generate` runs it
first. Re-run it whenever the spec changes; the copies are committed, so a deploy
from a bare clone still ships the last known-good versions.

## The hero artwork

`art/hero-source.png` is the master (1916×821 pixel art, ~1.9 MB). It lives **outside**
`public/` on purpose, so it is never deployed. The three derivatives that are:

```bash
cwebp -q 88 -sharp_yuv -resize 1920 0 art/hero-source.png -o public/img/hero-1920.webp
cwebp -q 86 -sharp_yuv -resize 1200 0 art/hero-source.png -o public/img/hero-1200.webp
sips -Z 1920 -s format jpeg -s formatOptions 82 art/hero-source.png --out public/img/hero-1920.jpg
```

100 kB WebP, 44 kB for narrow viewports, a 247 kB JPEG for anything that cannot take
WebP. `-sharp_yuv` matters here: the artwork is dithered, and default chroma
subsampling smears the dither into mud.

The hero is dark in **both** themes - it is a painting and it brings its own light, so
fighting it with a light background would only lose. The section carries local palette
overrides rather than switching with the rest of the page. The parallax is a
rAF-throttled transform, clamped so the frame never runs out from under the image, and
skipped entirely under `prefers-reduced-motion`.

## Structure

```
app/
  app.vue                    shell, skip link, pre-paint theme script
  assets/css/main.css        design tokens, light + dark, reset
  pages/index.vue            the whole page - every section, every snippet
  components/
    SiteHeader.vue           sticky nav, theme toggle
    SiteFooter.vue
    MastMark.vue             ἱστός - the mark
    CodeBlock.vue            dependency-free highlighter (escapes first, then marks up)
    DiagramTrustBoundary.vue SVG: untrusted content → model → gate → allow/deny
    DiagramConstant.vue      everything is variable except the policy
    DiagramChain.vue         the PRE and POST chains
public/spec/                 the format artifacts, served at the $id
scripts/sync-spec.mjs        copy + verify the $id
```

## Editing the content

Every code sample, CLI transcript and number on the page is real output from the
library, not illustrative. If the library changes, the page is wrong until somebody
re-runs the command and pastes the new output. The snippets live at the top of
`app/pages/index.vue` as named constants so they are easy to find and diff.

## Release blockers

Do not deploy publicly until all four are true. Each one is a claim the page makes
that a reader can check in under a minute.

- [ ] **`histos.dev` is bought and this site is deployed to it.** The page shows
      `$schema=https://histos.dev/spec/policy-0.1.schema.json` and invites the reader
      to open it. Deploying *this* site is what makes that URL answer - on any other
      host the claim is false, and an `$id` that 404s is worse than a placeholder.
- [ ] **The GitHub repository is public.** The install command, every footer link and
      the closing call to action all point at it. *Repo first, then site* - a closed
      product with a promised-later OSS component is the weakest possible version.
- [ ] **`histos` is published to PyPI.** This is a hard precondition, not a nice-to-have.
      The hero states `pip install histos[yaml]` **with no caveat**, deliberately - the
      earlier "not on PyPI yet" wording was removed on the assumption that the site goes
      live *after* the release. Deploy this page before the package exists and the first
      command a visitor runs fails.
- [ ] **The Status section still tells the truth.** It currently claims the runtime,
      the format at Draft 0.1, and the CLI exist today, and that everything else
      *"evolves after real adoption"*. If that stops being accurate, this section is the
      first thing that has to change.

Two more that need re-checking on every deploy rather than once:

- **the honest-limits section** must still match `SECURITY.md`;
- **the microsecond claim** is scoped to *policy evaluation*, deliberately - a call
  with a `resource_resolver` or a `confirm` callback is as fast as those are, because
  looking up a resource's owner or waiting on a human is IO. Do not let it drift back
  to "every call in microseconds".

## Theme

Light on bare `:root`; dark redefined twice - under `prefers-color-scheme` (guarded
with `:root:not([data-theme="light"])`) and under `[data-theme="dark"]` - so an
explicit choice beats the system in both directions. A tiny script in `<head>` applies
the stored choice before first paint, so there is no flash.
