<script setup lang="ts">
interface VariableInput {
  label: string
  note: string
}

const VARIABLE_INPUTS: VariableInput[] = [
  { label: 'the model', note: 'swappable, non-deterministic, persuadable' },
  { label: 'the conversation', note: 'attacker-reachable by definition' },
  { label: 'tool output', note: 'returns from systems you do not own' },
  { label: 'retrieved documents', note: 'the injection vector' },
  { label: 'the attacker', note: 'adaptive, and iterating faster than you' },
]

const ACCESSIBLE_DESCRIPTION =
  'Everything in an agent run is variable - the model, the conversation, tool output, retrieved documents, the ' +
  'attacker - except the policy, which is fixed before the run begins.'
</script>

<template>
  <div class="policy-constant" role="img" :aria-label="ACCESSIBLE_DESCRIPTION">
    <ul class="policy-constant__variables">
      <li v-for="input in VARIABLE_INPUTS" :key="input.label">
        <span class="policy-constant__label">{{ input.label }}</span>
        <span class="policy-constant__note">{{ input.note }}</span>
        <span class="policy-constant__marker">variable</span>
      </li>
    </ul>

    <div class="policy-constant__divider">
      <span>fixed before the agent met any of it</span>
    </div>

    <div class="policy-constant__constant">
      <div class="policy-constant__constant-head">
        <MastMark :size-in-pixels="20" />
        <span class="policy-constant__constant-label">policy</span>
      </div>
      <span class="policy-constant__note">
        static · developer-owned · never derived from anything above this line
      </span>
      <span class="policy-constant__marker policy-constant__marker--accent">constant</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.policy-constant {
  @include surface-card($space-base + 2px);

  &__variables {
    list-style: none;
    padding: 0;
    display: grid;
    gap: $space-hair + 2px;

    li {
      display: flex;
      align-items: baseline;
      gap: $space-small;
      padding: $space-tiny + 1px $space-small;
      border-radius: $radius-small;
      background: var(--surface-sunken);
      border: $border-hairline dashed var(--border-strong);
      flex-wrap: wrap;
    }
  }

  &__label {
    font-weight: $font-weight-strong;
    font-size: $font-size-body-small;
  }

  &__note {
    font-size: $font-size-detail;
    color: var(--text-tertiary);
    flex: 1;
    min-width: 160px;
  }

  &__marker {
    @include monospace-label($font-size-micro - 1px);

    color: var(--text-tertiary);
    white-space: nowrap;

    &--accent {
      color: var(--accent-text);
      font-weight: $font-weight-strong;
    }
  }

  &__divider {
    display: flex;
    align-items: center;
    gap: $space-small + 1px;
    margin: $space-base 0;
    color: var(--accent-text);
    font-size: $font-size-caption;
    font-family: $font-family-mono;
    letter-spacing: 0.04em;

    &::before,
    &::after {
      content: '';
      height: 1px;
      flex: 1;
      background: var(--accent);
      opacity: 0.55;
    }
  }

  &__constant {
    display: flex;
    align-items: center;
    gap: $space-small;
    padding: $space-small + 2px $space-base - 2px;
    border-radius: $radius-base;
    background: var(--accent-surface);
    border: 1.5px solid var(--accent);
    flex-wrap: wrap;
  }

  &__constant-head {
    display: flex;
    align-items: center;
    gap: $space-tiny;
    color: var(--accent-text);
  }

  &__constant-label {
    font-weight: 700;
    font-size: $font-size-lede-small;
    letter-spacing: $letter-spacing-tight;
    color: var(--text-primary);
  }

  &__constant &__note {
    color: var(--text-secondary);
    min-width: 192px;
  }
}
</style>
