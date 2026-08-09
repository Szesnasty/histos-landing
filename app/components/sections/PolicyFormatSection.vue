<script setup lang="ts">
import { REFUND_POLICY_YAML, PROTECT_TOOLS_PYTHON } from '~/content/codeSamples'
import { POLICY_FORMAT_PRINCIPLES } from '~/content/policyFormatContent'
import { SPEC_SCHEMA_URL } from '~/content/siteLinks'

const { withBasePath } = useAssetPath()
</script>

<template>
  <section id="format" class="page-section page-section--sunken">
    <div class="page-container">
      <SectionHeading eyebrow="The format" heading="Policy is the portable artifact." />

      <div class="prose-column section-intro">
        <p class="text-secondary">Histos is not just a Python library. The deeper idea is portable policy.</p>
        <p class="text-secondary">
          A policy should be something you can review, diff, validate, version and eventually enforce across
          more than one runtime.
        </p>
      </div>

      <div class="split-layout">
        <CodeBlock :code="REFUND_POLICY_YAML" language="yaml" label="security.policy.yaml" />
        <div>
          <CodeBlock :code="PROTECT_TOOLS_PYTHON" language="python" label="and in your host" />
          <p class="policy-format__note text-secondary">
            The policy is the artifact; the library is what reads it. Your editor can read it too -
            <code>$schema</code> points at <a :href="withBasePath(SPEC_SCHEMA_URL)">a file this site serves</a>, so a typo is
            underlined where you wrote it rather than refused at load time.
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
