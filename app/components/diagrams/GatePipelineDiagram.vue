<script setup lang="ts">
import { PRE_TOOL_DIAGRAM_STEPS, POST_TOOL_DIAGRAM_STEPS } from '~/content/enforcementContent'

/**
 * PRE → TOOL → POST, drawn vertically on purpose: the order is the message.
 */
const ACCESSIBLE_DESCRIPTION =
  'The model proposes a tool call. A pre-tool gate checks role and tool access, arguments, trusted binding, ' +
  'resource ownership and conditions, rate limits, budgets, canary and secret screening and human confirmation, ' +
  'then allows or denies. The real tool runs. A post-tool gate checks the return shape, projects output, redacts ' +
  'sensitive fields, secrets and canaries, and redacts exceptions, then returns or redacts. Only then does ' +
  'anything reach the model again.'
</script>

<template>
  <div class="gate-pipeline" role="img" :aria-label="ACCESSIBLE_DESCRIPTION">
    <div class="gate-pipeline__node gate-pipeline__node--model">MODEL</div>

    <div class="gate-pipeline__link">
      <span class="gate-pipeline__link-label">proposes tool call</span>
    </div>

    <section class="gate-pipeline__gate">
      <header class="gate-pipeline__gate-header">
        <span class="gate-pipeline__gate-tag">PRE-TOOL</span>
        <span class="gate-pipeline__gate-note">before the function is ever called</span>
      </header>
      <ul class="gate-pipeline__steps">
        <li v-for="step in PRE_TOOL_DIAGRAM_STEPS" :key="step">{{ step }}</li>
      </ul>
      <footer class="gate-pipeline__verdict">
        <span class="gate-pipeline__verdict-allow">ALLOW</span>
        <span class="gate-pipeline__verdict-separator">/</span>
        <span class="gate-pipeline__verdict-deny">DENY</span>
      </footer>
    </section>

    <div class="gate-pipeline__link" />

    <div class="gate-pipeline__node gate-pipeline__node--tool">the real tool runs</div>

    <div class="gate-pipeline__link">
      <span class="gate-pipeline__link-label">result <em>or</em> exception</span>
    </div>

    <section class="gate-pipeline__gate">
      <header class="gate-pipeline__gate-header">
        <span class="gate-pipeline__gate-tag">POST-TOOL</span>
        <span class="gate-pipeline__gate-note">before anything re-enters the context window</span>
      </header>
      <ul class="gate-pipeline__steps">
        <li v-for="step in POST_TOOL_DIAGRAM_STEPS" :key="step">{{ step }}</li>
      </ul>
      <footer class="gate-pipeline__verdict">
        <span class="gate-pipeline__verdict-allow">RETURN</span>
        <span class="gate-pipeline__verdict-separator">/</span>
        <span class="gate-pipeline__verdict-warn">REDACT</span>
      </footer>
    </section>

    <div class="gate-pipeline__link" />

    <div class="gate-pipeline__node gate-pipeline__node--model">MODEL</div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

$gate-pipeline-max-width: 640px;
$gate-link-height: 36px;

.gate-pipeline {
  display: grid;
  justify-items: center;
  max-width: $gate-pipeline-max-width;
  margin-inline: auto;

  &__node {
    font-family: $font-family-mono;
    font-size: $font-size-caption;
    letter-spacing: 0.09em;
    padding: $space-tiny $space-base + 2px;
    border-radius: $radius-pill;
    border: $border-hairline solid var(--border-strong);
    background: var(--surface-raised);
    white-space: nowrap;

    &--model {
      font-weight: $font-weight-strong;
    }

    &--tool {
      border-style: dashed;
      color: var(--text-secondary);
      letter-spacing: 0.04em;
    }
  }

  &__link {
    width: 1px;
    height: $gate-link-height;
    background: var(--border-strong);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 6px solid var(--border-strong);
    }
  }

  &__link-label {
    position: absolute;
    left: $space-small;
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    font-size: $font-size-small;
    color: var(--text-tertiary);
  }

  &__gate {
    width: 100%;
    border: 1.5px solid var(--accent);
    border-radius: $radius-large;
    background: var(--accent-surface);
    overflow: hidden;
  }

  &__gate-header {
    display: flex;
    align-items: baseline;
    gap: $space-tiny + 2px;
    flex-wrap: wrap;
    padding: $space-small $space-base;
    border-bottom: $border-hairline solid color-mix(in srgb, var(--accent) 35%, transparent);
  }

  &__gate-tag {
    font-family: $font-family-mono;
    font-size: $font-size-caption;
    letter-spacing: $letter-spacing-eyebrow;
    font-weight: 700;
    color: var(--accent-text);
  }

  &__gate-note {
    font-size: $font-size-small;
    color: var(--text-tertiary);
  }

  &__steps {
    list-style: none;
    margin: 0;
    padding: $space-small $space-base;
    display: grid;
    gap: $space-hair + 3px $space-medium;
    background: var(--surface-raised);

    @media (min-width: 620px) {
      grid-template-columns: 1fr 1fr;
    }

    li {
      font-size: $font-size-detail;
      padding-left: $space-base + 2px;
      position: relative;
      color: var(--text-primary);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 9px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--accent);
      }
    }
  }

  &__verdict {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-tiny + 2px;
    padding: $space-tiny + 2px;
    border-top: $border-hairline solid color-mix(in srgb, var(--accent) 35%, transparent);
    font-family: $font-family-mono;
    font-size: $font-size-detail;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  &__verdict-allow {
    color: var(--verdict-allow);
  }

  &__verdict-deny {
    color: var(--verdict-deny);
  }

  &__verdict-warn {
    color: var(--verdict-warn);
  }

  &__verdict-separator {
    color: var(--text-tertiary);
    font-weight: $font-weight-regular;
  }
}
</style>
