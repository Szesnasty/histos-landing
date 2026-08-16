<script setup lang="ts">
/**
 * The measurement, in full.
 *
 * It lives on its own route rather than inside the landing page because it is a
 * report, not a section: seven models, six scenarios, three tables of counts, a
 * policy comparison and a method note. Folded into the one-page flow it buried
 * everything after it, and the reader who wants the claim and the reader who wants
 * the evidence are not the same reader arriving on the same visit.
 *
 * The landing page keeps the claim and one link. This keeps the evidence.
 */
import { SWEEP_TOTALS } from '~/content/benchmarkContent'

useHead({
  title: 'Histos - what 1,498 agent executions measured',
  meta: [
    {
      name: 'description',
      content:
        'Seven models, six scenarios, four temperatures. Five of seven refuse an invoice fraud and an injected runbook unaided, and hand a patient\'s details to a stranger in 83 of 85 runs. Counts, controls, and what the policy actually did — from its own audit trail.',
    },
    { property: 'og:title', content: 'Histos - what 1,498 agent executions measured' },
    {
      property: 'og:description',
      content: 'The split is not capability. It is whether the attack looks like one.',
    },
    // Without these the card would carry this page's `og:` pair on some
    // renderers and the site-wide `twitter:` pair on others.
    { name: 'twitter:title', content: 'Histos - what 1,498 agent executions measured' },
    {
      name: 'twitter:description',
      content: 'The split is not capability. It is whether the attack looks like one.',
    },
  ],
})
</script>

<template>
  <div id="top" class="sweep-page">
    <header class="sweep-page__masthead">
      <div class="page-container">
        <NuxtLink to="/" class="sweep-page__back">&larr; Histos</NuxtLink>
        <p class="sweep-page__eyebrow">The measurement</p>
        <h1>What {{ SWEEP_TOTALS.executions.toLocaleString('en-GB') }} agent executions measured</h1>
        <p class="sweep-page__lede">
          Six scenarios — three attacks and three controls — across seven models and four
          sampling temperatures. Each run drives the same agent twice: once as the
          application is written, once with the identical tools behind a policy.
        </p>
      </div>
    </header>

    <SweepReport />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.sweep-page {
  &__masthead {
    padding: $space-huge 0 $space-large;
    border-bottom: $border-hairline solid var(--border-subtle);

    h1 {
      margin-top: $space-tiny;
      max-width: 20ch;
    }
  }

  &__back {
    display: inline-block;
    margin-bottom: $space-medium;
    font-size: $font-size-body-small;
    color: var(--text-secondary);
  }

  &__eyebrow {
    font-size: $font-size-caption;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent-text);
  }

  &__lede {
    margin-top: $space-base;
    max-width: 68ch;
    color: var(--text-secondary);
  }
}
</style>
