<script setup lang="ts">
import { OPEN_SOURCE_CAPABILITIES, COMMERCIAL_CAPABILITIES } from '~/content/openCoreContent'
</script>

<template>
  <section id="open-core" class="page-section page-section--sunken">
    <div class="page-container">
      <SectionHeading eyebrow="Open core" heading="Everything that enforces is open." />

      <div class="prose-column section-intro">
        <p class="text-secondary">The security boundary itself is open source.</p>
        <p class="text-secondary">
          Histos Python, the policy format and the deterministic enforcement logic are available under
          Apache-2.0. The commercial layer is not “better security for one deployment”. It is what
          organizations need when enforcement has to operate across teams, services and time.
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
        Open source gives you the boundary. The commercial layer helps you operate that boundary at scale.
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
