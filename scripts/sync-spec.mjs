/**
 * Copy the format artifacts out of the library into `public/spec/`.
 *
 * This is not decoration. `spec/policy-0.1.schema.json` declares
 *
 *     "$id": "https://histos.dev/spec/policy-0.1.schema.json"
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
  ['spec/decision-codes.json', 'decision-codes.json'],
  ['conformance/manifest.json', 'conformance-manifest.json'],
]

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
const schema = JSON.parse(
  await import('node:fs/promises').then((fs) =>
    fs.readFile(join(out, 'policy-0.1.schema.json'), 'utf8'),
  ),
)
const expected = 'https://histos.dev/spec/policy-0.1.schema.json'
if (schema.$id !== expected) {
  console.error(`[sync-spec] $id is ${schema.$id}, expected ${expected}`)
  console.error('[sync-spec] the deployed URL and the schema must agree, or every $ref breaks')
  process.exit(1)
}

console.log(`[sync-spec] ${copied} file(s) in place; $id resolves to what this site serves`)
