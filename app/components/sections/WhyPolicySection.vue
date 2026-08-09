<script setup lang="ts">
import { POLICY_OVER_CODE_ARGUMENTS, POLICY_LIMIT_DIFF } from '~/content/whyPolicyContent'

/** Zero-padded so the numerals line up in a two-column grid. */
function formatOrdinal(index: number): string {
  return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <section id="why-policy" class="page-section">
    <div class="page-container">
      <SectionHeading eyebrow="Why a policy" heading="Why not just write the checks in code?" />

      <div class="prose-column section-intro">
        <p class="why-policy__concession">For one agent with three tools, you probably should.</p>
        <p class="text-secondary">
          Histos starts paying off when the same security boundary has to survive across more tools, agents,
          runtimes and teams.
        </p>
      </div>

      <ol class="why-policy__arguments">
        <li v-for="(argument, index) in POLICY_OVER_CODE_ARGUMENTS" :key="argument.title">
          <span class="why-policy__ordinal">{{ formatOrdinal(index) }}</span>
          <div>
            <h3>{{ argument.title }}</h3>
            <p class="text-secondary">{{ argument.body }}</p>
          </div>
        </li>
      </ol>

      <div class="why-policy__diff">
        <p class="why-policy__diff-label text-secondary">
          What “an obvious policy diff” means, since the whole claim is that you can see it:
        </p>
        <CodeBlock :code="POLICY_LIMIT_DIFF" language="yaml" label="pull request" />
      </div>

      <div class="why-policy__claim">
        <p class="why-policy__claim-headline">
          The value isn't avoiding the <code>if</code>.<br >
          It's making the boundary explicit, portable and verifiable.
        </p>
        <p class="why-policy__claim-note">
          Three tools? Write the ifs.<br >
          Thirty? Write the policy.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.why-policy {
  &__concession {
    font-size: $font-size-lede-small;
    font-weight: $font-weight-semibold;

    @include from-medium {
      font-size: $font-size-lede;
    }
  }

  &__arguments {
    list-style: none;
    padding: 0;
    margin: $space-xlarge 0 0;
    display: grid;
    gap: $space-medium;

    @include from-medium {
      grid-template-columns: 1fr 1fr;
      gap: $space-medium $space-large;
    }

    li {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: $space-base;
      align-items: start;
      padding: $space-base + 2px $space-base + 2px $space-base + 2px 0;
      border-top: $border-hairline solid var(--border-subtle);
    }

    h3 {
      font-size: $font-size-body-small;
      margin-bottom: $space-hair + 1px;
    }

    p {
      font-size: $font-size-detail;
    }
  }

  &__ordinal {
    font-family: $font-family-mono;
    font-size: $font-size-caption;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--accent-text);
    padding-top: 2px;
  }

  &__diff {
    margin-top: $space-xlarge;
    max-width: $measure-comfortable;
  }

  &__diff-label {
    font-size: $font-size-detail;
    margin-bottom: $space-small;
  }

  &__claim {
    margin-top: $space-huge;
    border: 1.5px solid var(--accent);
    background: var(--accent-surface);
    border-radius: $radius-large;
    padding: $space-medium;

    @include from-medium {
      padding: $space-xlarge;
    }
  }

  &__claim-headline {
    font-size: $font-size-heading-large;
    font-weight: $font-weight-bold;
    letter-spacing: -0.024em;
    line-height: $line-height-heading;
    text-wrap: balance;

    @include from-medium {
      font-size: 32px;
    }

    code {
      font-size: 0.9em;
      background: none;
      border: 0;
      padding: 0;
      color: var(--accent-text);
    }
  }

  &__claim-note {
    margin-top: $space-medium;
    padding-top: $space-base;
    border-top: $border-hairline solid color-mix(in srgb, var(--accent) 35%, transparent);
    font-family: $font-family-mono;
    font-size: $font-size-detail;
    line-height: 1.9;
    color: var(--text-secondary);
  }
}
</style>
