<script setup lang="ts">
import { IDENTITY_ROLE_MAPPING } from '~/content/codeSamples'
import { RESPONSIBILITY_ROWS } from '~/content/identityContent'
</script>

<template>
  <section id="identity" class="page-section">
    <div class="page-container">
      <SectionHeading eyebrow="Identity" heading="Histos does not authenticate anybody." />

      <div class="prose-column section-intro">
        <p class="text-secondary">
          Identity belongs to your existing system, not to the model and not to Histos.
        </p>
        <p class="text-secondary">
          Your identity provider establishes who is calling. Histos receives a trusted principal and enforces
          what that identity may let the agent do.
        </p>
      </div>

      <dl class="identity__responsibilities">
        <div
          v-for="row in RESPONSIBILITY_ROWS"
          :key="row.question"
          class="identity__row"
          :class="{ 'identity__row--histos': row.isHistos }"
        >
          <dt>{{ row.question }}</dt>
          <dd>
            <span class="identity__answer">{{ row.answeredBy }}</span>
            <span class="identity__detail text-secondary">{{ row.detail }}</span>
          </dd>
        </div>
      </dl>

      <div class="split-layout">
        <div>
          <h3>The policy speaks your vocabulary, not your IdP's</h3>
          <p class="identity__paragraph text-secondary">
            A directory GUID in a <code>roles</code> block ties the policy to one tenant of one provider, and
            makes the file unreviewable - a security lead can tell you whether <code>refund_officer</code>
            should hold <code>make_refund</code>; nobody can tell you that about <code>a9481de2</code>.
          </p>
          <p class="identity__paragraph text-secondary">
            So the mapping lives in your host, and the same policy survives a change of identity provider, of
            runtime, and of customer.
          </p>
          <p class="identity__warning">
            The gate is exactly as strong as the principal you bind to it - and the library cannot check that
            binding. It says so, rather than implying otherwise with an API that looks safe.
          </p>
        </div>
        <CodeBlock
          :code="IDENTITY_ROLE_MAPPING"
          language="text"
          label="in your host, not in the policy"
          caption="Five ways to get this wrong - all of which compile and run - are written out in docs/identity.md."
        />
      </div>

      <p class="section-closing-line">The gate is only as strong as the identity bound to it.</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.identity {
  &__responsibilities {
    @include hairline-stack;

    margin-top: $space-xlarge;
  }

  &__row {
    padding: $space-base + 2px $space-medium - 4px;
    display: grid;
    gap: $space-hair + 2px;

    @include from-medium {
      grid-template-columns: 320px 1fr;
      gap: $space-medium;
      align-items: baseline;
    }

    &--histos {
      background: var(--accent-surface);

      .identity__answer {
        color: var(--accent-text);
      }
    }

    dt {
      font-weight: $font-weight-strong;
      font-size: $font-size-body-small;
    }

    dd {
      margin: 0;
      display: grid;
      gap: 4px;
    }
  }

  &__answer {
    font-weight: 650;
    font-size: $font-size-body-small;
  }

  &__detail {
    font-size: $font-size-detail;
  }

  &__paragraph {
    margin-top: $space-base - 1px;
  }

  &__warning {
    @include accent-callout;

    margin-top: $space-base + 4px;
    font-size: $font-size-body-small;
  }
}
</style>
