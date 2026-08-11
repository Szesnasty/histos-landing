<script setup lang="ts">
/**
 * The claim, and a door to the evidence.
 *
 * This used to be the whole report — three tables of seven models, a controls table,
 * a policy comparison and a method note — sitting in the middle of the landing page,
 * where it buried every section after it. The report now lives at `/sweep`. What
 * belongs here is the one finding a reader should leave with, the number that makes
 * it checkable, and the sentence that says what it does *not* show.
 */
import { SWEEP_TOTALS } from '~/content/benchmarkContent'

const { withBasePath } = useAssetPath()
</script>

<template>
  <section id="sweep" class="page-section sweep-summary">
    <div class="page-container">
      <SectionHeading
        eyebrow="Measured"
        heading="The boundary is worth least where the attack looks like one"
        subheading="Seven models, six scenarios, four temperatures, 749 runs."
      />

      <div class="sweep-summary__grid">
        <div class="sweep-summary__stat">
          <span class="sweep-summary__value">0<span class="sweep-summary__of">/170</span></span>
          <p>
            Runs in which <code>gpt-4.1</code>, <code>gpt-4o-mini</code>, <code>o4-mini</code>,
            <code>gemma4:26b</code> and <code>gemma4:e4b</code> fell for an invoice fraud or an
            injected ops runbook. <strong>No policy involved</strong> — they refused unaided.
          </p>
        </div>
        <div class="sweep-summary__stat">
          <span class="sweep-summary__value">83<span class="sweep-summary__of">/85</span></span>
          <p>
            Runs in which those same five models sent a patient's appointment details to a
            stranger's phone, because a sentence in the patient's own intake note asked them to.
          </p>
        </div>
      </div>

      <p class="sweep-summary__thesis prose-column">
        The difference is not capability and not vendor — a 26B open-weight model reproduces
        <code>gpt-4.1</code> run for run. It is whether the attack <em>looks</em> like one. A bank
        account that disagrees with the supplier master does. A runbook ordering production to
        zero does. <em>“I do not use my own phone for messages”</em> does not, because it is an
        ordinary service request. There is nothing there to detect, and a reasoning model has
        nothing to reason about.
      </p>

      <p class="sweep-summary__caveat prose-column">
        Behind a policy: {{ SWEEP_TOTALS.gatedDamage }} of {{ SWEEP_TOTALS.runs }}. That column is
        not a discovery — a deterministic gate refuses the call it was written to refuse, and on
        two of the three scenarios it did nothing at all because the model had already declined.
        What the runs are for is the other question: <strong>where a boundary is worth its
        cost</strong>, and what that cost is. On accounts payable it is zero. On the clinic it is
        an entire legitimate feature.
      </p>

      <div class="sweep-summary__actions">
        <AppButton to="/sweep" variant="primary">See the full measurement</AppButton>
        <AppButton :href="withBasePath('/sweep.jsonl')">Raw records</AppButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.sweep-summary {
  &__grid {
    display: grid;
    gap: $space-base;
    margin-top: $space-xlarge;

    @include from-medium {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__stat {
    @include surface-card($space-medium);

    p {
      margin-top: $space-small;
      font-size: $font-size-body-small;
      color: var(--text-secondary);
    }
  }

  &__value {
    display: block;
    font-variant-numeric: tabular-nums;
    font-size: 52px;
    font-weight: $font-weight-strong;
    line-height: 1;
  }

  &__of {
    font-size: 26px;
    color: var(--text-secondary);
  }

  &__thesis {
    @include accent-rule-block;

    margin-top: $space-large;
  }

  &__caveat {
    margin-top: $space-medium;
    font-size: $font-size-body-small;
    color: var(--text-secondary);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-small;
    margin-top: $space-large;
  }
}
</style>
