<script setup lang="ts">
import { SCOPE_LIMITATIONS } from '~/content/scopeContent'
</script>

<template>
  <section id="scope" class="page-section">
    <div class="page-container">
      <SectionHeading eyebrow="Scope" heading="What Histos does not do" />

      <p class="section-lede prose-column">
        Every security boundary has limits. The useful thing is to say them out loud.
      </p>

      <ul class="scope__list">
        <li v-for="limitation in SCOPE_LIMITATIONS" :key="limitation.title">
          <h3>{{ limitation.title }}</h3>
          <p class="text-secondary">{{ limitation.body }}</p>
        </li>
      </ul>

      <p class="section-closing-line">
        Histos answers <strong>can</strong>. Other layers may help answer <strong>should</strong>.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.scope {
  &__list {
    @include hairline-stack;

    margin-top: $space-xlarge;

    li {
      padding: $space-base + 2px $space-medium - 2px;
    }

    h3 {
      font-size: $font-size-body-small;
      margin-bottom: $space-hair + 1px;
    }

    p {
      font-size: $font-size-body-small;
      max-width: 832px;
    }
  }
}
</style>
