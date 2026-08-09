<script setup lang="ts">
import { GITHUB_REPOSITORY_URL, SECTION_ANCHORS, SPEC_SCHEMA_URL } from '~/content/siteLinks'

const { withBasePath } = useAssetPath()
</script>

<template>
  <section id="get-started" class="page-section page-section--sunken">
    <div class="page-container call-to-action">
      <h2>Start with the boundary.</h2>
      <p class="section-lede call-to-action__lede">
        Install Histos, protect a real tool surface, and decide the limits before the model meets the content
        that will try to move them.
      </p>

      <div class="call-to-action__actions">
        <AppButton :href="GITHUB_REPOSITORY_URL" variant="primary" external>Get started</AppButton>
        <AppButton :href="SECTION_ANCHORS.format">Read the docs</AppButton>
        <AppButton :href="withBasePath(SPEC_SCHEMA_URL)">The JSON Schema</AppButton>
      </div>

      <p class="call-to-action__note text-tertiary">
        If you are evaluating policy enforcement for production agents, start with the Python runtime and the
        policy format.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.call-to-action {
  text-align: center;
  display: grid;
  justify-items: center;

  &__lede {
    max-width: 640px;
    margin-inline: auto;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-small;
    margin-top: $space-large;
  }

  &__note {
    margin-top: $space-medium;
    font-size: $font-size-detail;
    max-width: 544px;
  }
}
</style>
