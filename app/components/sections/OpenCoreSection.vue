<script setup lang="ts">
import { OPEN_SOURCE_CAPABILITIES, COMMERCIAL_CAPABILITIES } from '~/content/openCoreContent'
</script>

<template>
  <section id="open-core" class="page-section page-section--sunken">
    <div class="page-container">
      <SectionHeading eyebrow="Open source" heading="The enforcement boundary is Apache-2.0." />

      <div class="prose-column section-intro">
        <p class="text-secondary">You can inspect, test and own the code that decides.</p>
        <p class="text-secondary">
          Histos Python, the policy format and deterministic enforcement are Apache-2.0. A future commercial
          layer would operate that same boundary across teams and services — not hide stronger enforcement.
        </p>
      </div>

      <div class="card-grid card-grid--two">
        <div class="open-core__column open-core__column--open">
          <div class="open-core__column-head">
            <TagChip tone="allow">Open · Apache-2.0</TagChip>
          </div>
          <TickList :items="OPEN_SOURCE_CAPABILITIES" marker="tick" />
        </div>
        <div class="open-core__column">
          <div class="open-core__column-head">
            <TagChip>Commercial</TagChip>
          </div>
          <TickList :items="COMMERCIAL_CAPABILITIES" marker="dot" />
        </div>
      </div>

      <p class="section-closing-line">
        Open source is the boundary. Any commercial layer begins with operating it at scale.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.open-core {
  &__column {
    @include surface-card;

    &--open {
      border-color: color-mix(in srgb, var(--verdict-allow) 40%, var(--border-subtle));
    }
  }

  &__column-head {
    margin-bottom: $space-base;
  }
}
</style>
