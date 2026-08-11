<script setup lang="ts">
import { INSTALL_COMMAND } from '~/content/codeSamples'
import { GITHUB_REPOSITORY_URL, SECTION_ANCHORS } from '~/content/siteLinks'

const { parallaxLayerElement } = useHeroParallax()
const { withBasePath } = useAssetPath()

const RUNTIME_BADGES = ['In-process', 'Fail-closed', 'Uses your identity layer'] as const
const PACKAGE_BADGES = ['Apache-2.0', 'Python ≥ 3.12', 'Core: 0 runtime deps', 'Policy Format Draft 0.1'] as const

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

        <p class="hero__pitch">The tool call is the security boundary - in both directions.</p>
        <p class="hero__lede">
          Control which tools an agent may call, with which arguments, against which resources, and what may
          leave the system.
        </p>

        <p class="hero__myth">
          Odysseus did not try to silence the Sirens. He bound himself to the mast before the singing began.
          Histos works the same way: it constrains an agent's future actions before the model encounters
          untrusted content.
        </p>

        <div class="hero__actions">
          <AppButton :href="GITHUB_REPOSITORY_URL" variant="primary" external>Quickstart</AppButton>
          <AppButton :href="SECTION_ANCHORS.format" variant="ghost">Read the policy format</AppButton>
          <AppButton :href="GITHUB_REPOSITORY_URL" variant="ghost" external>GitHub</AppButton>
        </div>

        <div class="hero__install">
          <CodeBlock :code="INSTALL_COMMAND" language="bash" />
          <p class="hero__install-note">Core has zero runtime dependencies. YAML support is optional.</p>
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
