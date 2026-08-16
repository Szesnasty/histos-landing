<script setup lang="ts">
import { REFUND_POLICY_YAML, PROTECT_TOOLS_PYTHON } from '~/content/codeSamples'
import { POLICY_FORMAT_PRINCIPLES } from '~/content/policyFormatContent'
import { POLICY_GUIDE_URL, SPEC_SCHEMA_URL } from '~/content/siteLinks'

const { withBasePath } = useAssetPath()
</script>

<template>
  <section id="format" class="page-section page-section--sunken">
    <div class="page-container">
      <SectionHeading eyebrow="The format" heading="Put the security boundary in the diff." />

      <div class="prose-column section-intro">
        <p class="text-secondary">The policy is the reviewable security artifact; Python is its first runtime.</p>
        <p class="text-secondary">
          Review it, diff it, validate it and version it like code.
        </p>
      </div>

      <div class="split-layout">
        <CodeBlock :code="REFUND_POLICY_YAML" language="yaml" label="security.policy.yaml" />
        <div>
          <CodeBlock :code="PROTECT_TOOLS_PYTHON" language="python" label="and in your host" />
          <p class="policy-format__note text-secondary">
            Your editor can validate it too: <code>$schema</code> points at
            <a :href="withBasePath(SPEC_SCHEMA_URL)">the schema served here</a>. Start with the
            <a :href="POLICY_GUIDE_URL" target="_blank" rel="noopener">policy-writing guide</a>.
          </p>
        </div>
      </div>

      <div class="card-grid card-grid--three">
        <ContentCard
          v-for="principle in POLICY_FORMAT_PRINCIPLES"
          :key="principle.title"
          :title="principle.title"
          :body="principle.body"
        />
      </div>

      <p class="section-closing-line">The policy is the contract. The runtime is an implementation.</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.policy-format {
  &__note {
    margin-top: $space-base + 2px;
    font-size: $font-size-detail;

    a {
      color: var(--accent-text);
      text-underline-offset: 3px;
    }
  }
}
</style>
