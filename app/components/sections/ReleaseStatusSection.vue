<script setup lang="ts">
import { RELEASE_STATUS_ENTRIES } from '~/content/statusContent'
</script>

<template>
  <section id="status" class="page-section page-section--compact">
    <div class="page-container">
      <div class="release-status">
        <header class="release-status__head">
          <p class="release-status__eyebrow">Status</p>
          <h2 class="release-status__title">What ships in v0.1.1</h2>
        </header>

        <ul class="release-status__entries">
          <li
            v-for="entry in RELEASE_STATUS_ENTRIES"
            :key="entry.title"
            :class="{ 'release-status__entry--future': !entry.availableNow }"
          >
            <div class="release-status__entry-head">
              <TagChip :tone="entry.availableNow ? 'allow' : 'neutral'">
                {{ entry.availableNow ? 'now' : 'later' }}
              </TagChip>
              <h3>{{ entry.title }}</h3>
            </div>
            <p class="text-secondary">{{ entry.body }}</p>
          </li>
        </ul>

        <p class="release-status__note text-secondary">
          Histos stays narrow until real deployments prove which next layer is worth adding.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.release-status {
  @include surface-card($space-medium);

  @include from-medium {
    padding: $space-large;
  }

  &__head {
    display: flex;
    align-items: baseline;
    gap: $space-base - 2px;
    flex-wrap: wrap;
    margin-bottom: $space-medium - 2px;
  }

  &__eyebrow {
    @include monospace-label($font-size-caption);

    color: var(--accent-text);
    font-weight: $font-weight-strong;
  }

  &__title {
    font-size: $font-size-heading-medium;

    @include from-medium {
      font-size: 24px;
    }
  }

  &__entries {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: $space-base + 2px $space-large;

    @include from-medium {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__entry-head {
    display: flex;
    align-items: center;
    gap: $space-tiny + 2px;
    margin-bottom: $space-hair + 1px;
    flex-wrap: wrap;

    h3 {
      font-size: $font-size-body-small;
    }
  }

  &__entry--future {
    opacity: 0.72;
  }

  li p {
    font-size: $font-size-detail;
  }

  &__note {
    margin-top: $space-medium;
    padding-top: $space-base + 4px;
    border-top: $border-hairline solid var(--border-subtle);
    font-size: $font-size-detail;
    max-width: $measure-comfortable;
  }
}
</style>
