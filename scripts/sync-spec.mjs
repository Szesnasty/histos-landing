/**
 * Copy the format artifacts out of the library into `public/spec/`.
 *
 * This is not decoration. `spec/policy-0.1.schema.json` declares
 *
 *     "$id": "https://usehistos.dev/spec/policy-0.1.schema.json"
 *
 * and that string is now baked into every policy anyone writes. Deploying this
 * site is what makes the `$id` resolve - and an `$id` that 404s is worse than a
 * placeholder, because editors, `$ref` resolution and every future
 * implementation all depend on it answering.
 *
 * Run it before a build. If the library is not checked out next to this site the
 * script says so and leaves whatever is already committed alone, so a deploy from
 * a bare clone still ships the last known-good copies.
 */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const lib = resolve(here, '..', '..', 'histos')
const out = resolve(here, '..', 'public', 'spec')

const FILES = [
  ['spec/policy-0.1.schema.json', 'policy-0.1.schema.json'],
  // Its `$id` is `https://usehistos.dev/spec/tool-lock-0.1.schema.json`, so this
  // site has to serve it for the same reason it serves the policy schema.
  ['spec/tool-lock-0.1.schema.json', 'tool-lock-0.1.schema.json'],
  ['spec/decision-codes.json', 'decision-codes.json'],
  ['conformance/manifest.json', 'conformance-manifest.json'],
]

/** The schemas whose `$id` must name a URL this site actually serves. */
const SCHEMAS_WITH_ID = ['policy-0.1.schema.json', 'tool-lock-0.1.schema.json']

const SITE_ORIGIN = 'https://usehistos.dev'

if (!existsSync(lib)) {
  console.warn(`[sync-spec] no library at ${lib} - keeping the committed copies in public/spec/`)
  process.exit(0)
}

mkdirSync(out, { recursive: true })

let copied = 0
for (const [from, to] of FILES) {
  const src = join(lib, from)
  if (!existsSync(src)) {
    console.warn(`[sync-spec] missing ${src} - skipped`)
    continue
  }
  copyFileSync(src, join(out, to))
  copied += 1
  console.log(`[sync-spec] ${from} → public/spec/${to}`)
}

// The whole point of the exercise: what the $id promises must be what we serve.
const { readFile } = await import('node:fs/promises')

for (const name of SCHEMAS_WITH_ID) {
  const file = join(out, name)
  if (!existsSync(file)) {
    console.error(`[sync-spec] ${name} is not in public/spec/ - nothing would serve its $id`)
    process.exit(1)
  }
  const schema = JSON.parse(await readFile(file, 'utf8'))
  const expected = `${SITE_ORIGIN}/spec/${name}`
  if (schema.$id !== expected) {
    console.error(`[sync-spec] $id is ${schema.$id}, expected ${expected}`)
    console.error('[sync-spec] the deployed URL and the schema must agree, or every $ref breaks')
    process.exit(1)
  }
}

console.log(`[sync-spec] ${copied} file(s) in place; $id resolves to what this site serves`)
