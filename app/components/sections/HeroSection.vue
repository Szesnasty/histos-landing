<script setup lang="ts">
import { INSTALL_COMMAND } from '~/content/codeSamples'
import { GITHUB_REPOSITORY_URL, POLICY_GUIDE_URL, PYPI_PROJECT_URL, QUICKSTART_URL } from '~/content/siteLinks'
import { HISTOS_VERSION } from '~/content/statusContent'

const { parallaxLayerElement } = useHeroParallax()
const { withBasePath } = useAssetPath()

const RUNTIME_BADGES = ['In-process', 'No proxy', 'Fail-closed in enforce mode', 'Bring your identity'] as const
const FRAMEWORK_BADGES = ['Raw Python', 'LangChain', 'LangGraph'] as const

// The version leads the package badges: the install command directly above is a
// promise that something answers it, and the release it resolves to is the first
// thing a reader checking that promise looks for.
const PACKAGE_BADGES = [
  `v${HISTOS_VERSION} on PyPI`,
  'Apache-2.0',
  'Python ≥ 3.12',
  'Core: 0 runtime deps',
  'Policy Format Draft 0.1',
] as const

const ARTWORK_ALT_TEXT =
  'Odysseus lashed to the mast of his ship under a full moon, ropes around his chest, as the Sirens sing from ' +
  'the rocks off the bow.'
</script>

<template>
  <section class="hero">
    <div ref="parallaxLayerElement" class="hero__artwork">
      <picture>
        <source :srcset="withBasePath('/img/hero-1200.webp')" media="(max-width: 760px)" type="image/webp" >
        <source :srcset="withBasePath('/img/hero-1920.webp')" type="image/webp" >
        <img
          :src="withBasePath('/img/hero-1920.jpg')"
          :alt="ARTWORK_ALT_TEXT"
          width="1920"
          height="823"
          fetchpriority="high"
        >
      </picture>
    </div>
    <div class="hero__scrim" aria-hidden="true" />

    <div class="page-container hero__inner">
      <div class="hero__copy">
        <p class="hero__eyebrow">ἱστός - the mast</p>
        <h1>The model proposes.<br >Policy decides.</h1>

        <p class="hero__pitch">Deterministic policy enforcement for Python agent tool calls.</p>
        <p class="hero__lede">
          Bound the tool, arguments, resource and returned data before model output can touch the real world —
          or flow back into context.
        </p>

        <div class="hero__frameworks" aria-label="Supported integration paths">
          <span>Works with</span>
          <ul>
            <li v-for="framework in FRAMEWORK_BADGES" :key="framework">{{ framework }}</li>
          </ul>
        </div>

        <p class="hero__myth">
          Odysseus did not silence the Sirens. He bound himself before they started singing. Histos makes the
          same move: decide the agent's capabilities before it reads untrusted content.
        </p>

        <div class="hero__actions">
          <AppButton :href="QUICKSTART_URL" variant="primary" external>Run the quickstart</AppButton>
          <AppButton :href="POLICY_GUIDE_URL" variant="ghost" external>Write a policy</AppButton>
          <AppButton :href="GITHUB_REPOSITORY_URL" variant="ghost" external>GitHub</AppButton>
        </div>

        <div class="hero__install">
          <CodeBlock :code="INSTALL_COMMAND" language="bash" />
          <p class="hero__install-note">
            Installs
            <a :href="PYPI_PROJECT_URL" target="_blank" rel="noopener">histos {{ HISTOS_VERSION }}</a>
            from PyPI and requires Python 3.12+. The core has zero runtime dependencies. For YAML policies,
            install the optional parser: <code>pip install "histos[yaml]"</code>.
          </p>
        </div>

        <ul class="hero__badges">
          <li v-for="badge in RUNTIME_BADGES" :key="badge">
            <TagChip tone="key">{{ badge }}</TagChip>
          </li>
          <li v-for="badge in PACKAGE_BADGES" :key="badge">
            <TagChip>{{ badge }}</TagChip>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

// The header is fixed and overlays this section, so the top padding has to
// clear it (60px) and still leave the copy breathing room.
$hero-padding-top-small: 104px;
$hero-padding-top-large: 152px;
$hero-padding-bottom-small: 56px;
$hero-padding-bottom-large: 96px;

.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: #05070a;
  padding-block: $hero-padding-top-small $hero-padding-bottom-small;

  @include from-medium {
    padding-block: $hero-padding-top-large $hero-padding-bottom-large;
  }

  // The hero is dark in both themes: it is a painting, and it brings its own
  // light. These overrides apply inside this section only.
  --text-primary: #f4f6f9;
  --text-secondary: #c3ccd8;
  --text-tertiary: #93a0b0;
  --border-subtle: rgb(255 255 255 / 16%);
  --border-strong: rgb(255 255 255 / 30%);
  --surface-raised: rgb(255 255 255 / 6%);
  --surface-sunken: rgb(255 255 255 / 8%);
  --accent-text: #f0c579;

  color: var(--text-primary);

  &__artwork {
    position: absolute;
    inset: -#{$hero-parallax-overscan} 0 0;
    z-index: -2;
    will-change: transform;

    picture,
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      // Keep the mast, the ropes and the Sirens in frame when the sides crop.
      object-position: 74% center;
    }
  }

  // The artwork's left half is open water and night sky, so the scrim there is
  // light - just enough to hold text, not enough to hide the painting.
  &__scrim {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(
        100deg,
        rgb(4 6 11 / 86%) 0%,
        rgb(4 6 11 / 74%) 30%,
        rgb(4 6 11 / 40%) 52%,
        rgb(4 6 11 / 10%) 72%,
        rgb(4 6 11 / 0%) 100%
      ),
      linear-gradient(
        to bottom,
        rgb(4 6 11 / 45%) 0%,
        transparent 20%,
        transparent 74%,
        rgb(4 6 11 / 90%) 100%
      );

    @include until-large {
      background: linear-gradient(
        to bottom,
        rgb(4 6 11 / 78%) 0%,
        rgb(4 6 11 / 86%) 55%,
        rgb(4 6 11 / 95%) 100%
      );
    }
  }

  &__inner {
    position: relative;
  }

  &__copy {
    max-width: $hero-copy-max-width;
  }

  &__eyebrow {
    @include monospace-label($font-size-caption);

    color: var(--accent-text);
    font-weight: $font-weight-strong;
    margin-bottom: $space-base;
  }

  h1 {
    text-shadow: 0 2px 24px rgb(0 0 0 / 55%);
  }

  // What you are installing, said before the mythology.
  &__pitch {
    margin-top: $space-medium - 2px;
    font-size: $font-size-heading-medium;
    font-weight: $font-weight-strong;
    letter-spacing: $letter-spacing-tight;
    max-width: 512px;
    text-wrap: balance;

    @include from-medium {
      font-size: 23px;
    }
  }

  &__lede {
    margin-top: $space-tiny + 2px;
    max-width: 544px;
    font-size: $font-size-lede-small;
    color: var(--text-secondary);

    @include from-medium {
      font-size: $font-size-body-large;
    }
  }

  &__frameworks {
    margin-top: $space-base;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $space-tiny $space-small;
    font-size: $font-size-body-small;
    color: var(--text-secondary);

    > span {
      font-weight: $font-weight-semibold;
      color: var(--text-primary);
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: $space-tiny;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      padding: 3px 9px;
      border: $border-hairline solid var(--border-strong);
      border-radius: $radius-base;
      background: var(--surface-raised);
      color: var(--text-primary);
      font-weight: $font-weight-semibold;
    }
  }

  // The metaphor keeps its gold rule, but it is now the third thing read.
  &__myth {
    margin-top: $space-medium + 2px;
    padding-left: $space-base + 2px;
    border-left: $border-emphasis solid var(--accent);
    font-size: $font-size-body-small;
    line-height: 1.6;
    color: var(--text-tertiary);
    max-width: 512px;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-small;
    margin-top: $space-large;

    // The hero overrides `--text-primary` to near-white for its dark palette,
    // and the default primary button paints itself with exactly that token. On
    // this section the primary action is the accent instead.
    :deep(.app-button--primary) {
      background: var(--accent);
      border-color: var(--accent);
      color: #12100a;

      &:hover {
        border-color: var(--accent);
      }
    }
  }

  &__install {
    margin-top: $space-large;
    max-width: $hero-copy-max-width;

    :deep(.code-block) {
      box-shadow: 0 18px 48px -24px rgb(0 0 0 / 90%);
    }
  }

  &__install-note {
    margin-top: $space-small;
    font-size: $font-size-detail;
    color: var(--text-tertiary);

    // `a` inherits its colour globally, which inside this note would render the
    // link as plain tertiary text with no affordance at all.
    a {
      color: var(--accent-text);
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: $space-tiny;
    list-style: none;
    padding: 0;
    margin-top: $space-medium;
  }
}
</style>
