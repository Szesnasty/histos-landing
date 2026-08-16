<script setup lang="ts">
import { POLICY_GUIDE_URL, PYPI_PROJECT_URL, QUICKSTART_URL, SPEC_SCHEMA_URL } from '~/content/siteLinks'
import { HISTOS_VERSION } from '~/content/statusContent'

const { withBasePath } = useAssetPath()
</script>

<template>
  <section id="get-started" class="page-section page-section--sunken">
    <div class="page-container call-to-action">
      <h2>Bound one real tool today.</h2>
      <p class="section-lede call-to-action__lede">
        Install Histos, wrap a real tool and make its limits explicit before the model reads untrusted content.
      </p>

      <div class="call-to-action__actions">
        <AppButton :href="QUICKSTART_URL" variant="primary" external>Run the quickstart</AppButton>
        <AppButton :href="POLICY_GUIDE_URL" external>Write a policy</AppButton>
        <AppButton :href="PYPI_PROJECT_URL" external>PyPI v{{ HISTOS_VERSION }}</AppButton>
        <AppButton :href="withBasePath(SPEC_SCHEMA_URL)">The JSON Schema</AppButton>
      </div>

      <p class="call-to-action__note text-tertiary">
        <code>histos {{ HISTOS_VERSION }}</code> and Policy Format Draft 0.1 are released under Apache-2.0.
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
