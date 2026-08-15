<script setup lang="ts">
import {
  PRE_TOOL_CHECKS,
  POST_TOOL_CHECKS,
  POLICY_PRIMITIVE_GROUPS,
  TOTAL_POLICY_PRIMITIVE_COUNT,
} from '~/content/enforcementContent'
</script>

<template>
  <section id="enforcement" class="page-section page-section--sunken">
    <div class="page-container">
      <SectionHeading
        eyebrow="Runtime enforcement"
        heading="Two gates around every tool call."
        subheading="A hard boundary at the tool surface."
      />

      <div class="prose-column section-intro">
        <p class="text-secondary">Histos wraps the tool boundary on both sides.</p>
        <p class="text-secondary">
          Before execution, it decides whether the call is allowed at all. After execution, it decides what is
          allowed to return to the model.
        </p>
      </div>

      <GatePipelineDiagram class="enforcement__pipeline" />

      <div class="split-layout enforcement__gate-copy">
        <div>
          <p class="enforcement__gate-eyebrow">Before the tool runs</p>
          <h3>Stop the action before it exists.</h3>
          <p class="enforcement__paragraph text-secondary">
            Histos evaluates the proposed call against policy and trusted runtime context before the underlying
            function executes.
          </p>
          <dl class="enforcement__checks">
            <div v-for="check in PRE_TOOL_CHECKS" :key="check.name">
              <dt>
                {{ check.name }}
                <span v-if="check.kind === 'recognition'" class="enforcement__recognises">recognises</span>
              </dt>
              <dd class="text-secondary">{{ check.question }}</dd>
            </div>
          </dl>
          <p class="enforcement__rule">Any failed check means the tool does not run.</p>
        </div>

        <div>
          <p class="enforcement__gate-eyebrow">Before the result gets back</p>
          <h3>Once the call is allowed to execute, its output is still not trusted to re-enter the model.</h3>
          <p class="enforcement__paragraph text-secondary">
            Histos enforces the return contract before tool output - or an exception - re-enters the agent
            context.
          </p>
          <dl class="enforcement__checks">
            <div v-for="check in POST_TOOL_CHECKS" :key="check.name">
              <dt>
                {{ check.name }}
                <span v-if="check.kind === 'recognition'" class="enforcement__recognises">recognises</span>
              </dt>
              <dd class="text-secondary">{{ check.question }}</dd>
            </div>
          </dl>
          <p class="enforcement__rule">
            The boundary protects both what the agent can do and what the model gets to see next.
          </p>
        </div>
      </div>

      <p class="enforcement__kinds prose-column">
        <strong>Two different strengths, and the difference matters more than the count.</strong>
        Most of these decide from a declared fact — a role holds a grant or it does not, an argument
        matches a schema or it does not, a caller owns the resource or does not. There is no
        recognition step, so no class of input gets through by looking unfamiliar. The three marked
        <span class="enforcement__recognises">recognises</span> have to identify something inside a
        value: a secret, a planted token. They are worth having and they are not guarantees — what
        they have not seen, they do not catch. Read those three as defence in depth, and the rest as
        the boundary.
      </p>

      <div class="enforcement__primitives">
        <h3 class="enforcement__primitives-title">
          Policy primitives, shipping today
          <span class="enforcement__primitives-total">{{ TOTAL_POLICY_PRIMITIVE_COUNT }}</span>
        </h3>
        <div v-for="group in POLICY_PRIMITIVE_GROUPS" :key="group.groupLabel" class="enforcement__primitive-row">
          <span class="enforcement__primitive-group">
            {{ group.groupLabel }}
            <span class="enforcement__primitive-count">{{ group.primitives.length }}</span>
          </span>
          <ul>
            <li v-for="primitive in group.primitives" :key="primitive">{{ primitive }}</li>
          </ul>
        </div>
      </div>

      <div class="split-layout split-layout--centered enforcement__why">
        <div>
          <p class="enforcement__gate-eyebrow">Why this matters</p>
          <h3>The gate never reads the conversation</h3>
          <p class="enforcement__paragraph text-secondary">
            Untrusted content reaches the model; the model proposes a call. Everything the gate uses to decide -
            a trusted identity, your static policy, the request itself - comes from outside that channel.
          </p>
          <p class="enforcement__paragraph text-secondary">
            In <code>enforce</code> mode every step is <strong>fail-closed</strong>: an error inside a check is a
            denial. <code>observe</code> is the explicit calibration mode - it records the decision, then runs the
            original call unchanged and protects nothing. A denial answers two audiences at once: the developer
            gets the field, the bound and the fix; the agent gets a code that teaches it nothing about how to
            succeed on the next attempt.
          </p>
        </div>
        <TrustBoundaryDiagram />
      </div>

      <div class="enforcement__claim">
        <p class="enforcement__claim-headline">Hijacked.<br >Still bounded.</p>
        <div class="enforcement__claim-body">
          <p>
            Not <em>harmless</em>, and the difference is the point. A €400 refund to the right tenant, on an
            allowed order, with valid arguments goes through - because that is what your policy says. What a
            manipulated model cannot do is cross the bounds: wrong tenant, wrong tool, wrong resource, over
            budget, over limit, without the approval you required, carrying a value you marked.
          </p>
          <p class="text-secondary">
            The point is not to make the model perfect. The point is to keep a manipulated model bounded -
            whether or not anyone noticed the attack.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.enforcement {
  &__recognises {
    margin-left: 6px;
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-secondary);
    border: 1px dashed var(--border-strong);
  }

  &__kinds {
    margin-top: $space-large;
    font-size: $font-size-body-small;
  }

  &__pipeline {
    margin-top: $space-huge;
  }

  &__gate-copy {
    margin-top: $space-huge + 8px;
  }

  &__gate-eyebrow {
    @include monospace-label($font-size-small);

    color: var(--accent-text);
    font-weight: $font-weight-strong;
    margin-bottom: $space-tiny + 2px;
  }

  &__paragraph {
    margin-top: $space-base - 1px;
  }

  &__checks {
    @include hairline-stack;

    margin-top: $space-medium - 2px;
    border-radius: $radius-base;

    > div {
      padding: $space-tiny + 2px $space-small + 2px;
      display: grid;
      gap: 2px;

      @include from-small {
        grid-template-columns: 200px 1fr;
        gap: $space-base - 2px;
        align-items: baseline;
      }
    }

    dt {
      font-weight: $font-weight-strong;
      font-size: $font-size-detail;
    }

    dd {
      margin: 0;
      font-size: $font-size-detail;
    }
  }

  &__rule {
    @include accent-callout;

    margin-top: $space-base + 4px;
    font-size: $font-size-body-small;
    font-weight: $font-weight-semibold;
  }

  // ── capability wall ──────────────────────────────────────────────
  // The counts are the whole point: somebody who skips both prose columns
  // should still leave knowing the magnitude.
  &__primitives {
    @include surface-card($space-medium);

    margin-top: $space-huge + 8px;
  }

  &__primitives-title {
    display: flex;
    align-items: center;
    gap: $space-tiny + 2px;
    font-size: $font-size-body-small;
    margin-bottom: $space-medium - 4px;
  }

  &__primitives-total {
    font-family: $font-family-mono;
    font-size: $font-size-detail;
    font-weight: 700;
    color: var(--accent-text);
    background: var(--accent-surface);
    border: $border-hairline solid color-mix(in srgb, var(--accent) 45%, transparent);
    border-radius: $radius-pill;
    padding: 2px $space-tiny + 1px;
  }

  &__primitive-row {
    display: grid;
    gap: $space-tiny + 2px;
    padding-block: $space-small + 2px;

    + .enforcement__primitive-row {
      border-top: $border-hairline solid var(--border-subtle);
    }

    @include from-medium {
      grid-template-columns: 152px 1fr;
      gap: $space-medium - 4px;
      align-items: baseline;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      gap: $space-hair + 2px;
    }

    li {
      font-family: $font-family-mono;
      font-size: $font-size-small;
      padding: 4px $space-tiny + 2px;
      border-radius: 6px;
      border: $border-hairline solid var(--border-strong);
      background: var(--surface-sunken);
      color: var(--text-secondary);
      white-space: nowrap;
    }
  }

  &__primitive-group {
    @include monospace-label($font-size-micro);

    color: var(--text-tertiary);
  }

  &__primitive-count {
    font-family: $font-family-mono;
    font-size: $font-size-micro;
    color: var(--accent-text);
    opacity: 0.85;
    text-transform: none;
  }

  // ── the claim ────────────────────────────────────────────────────
  &__why {
    margin-top: $space-huge + 8px;

    @include from-large {
      grid-template-columns: 1fr 0.85fr;
    }
  }

  &__claim {
    margin-top: $space-huge + 8px;
    border: 1.5px solid var(--accent);
    background: var(--accent-surface);
    border-radius: $radius-large;
    padding: $space-medium;
    display: grid;
    gap: $space-base + 4px;

    @include from-medium {
      padding: $space-xlarge;
      grid-template-columns: auto 1fr;
      gap: $space-xlarge;
      align-items: center;
    }
  }

  &__claim-headline {
    font-size: $font-size-display-small - 6px;
    font-weight: $font-weight-bold;
    letter-spacing: -0.028em;
    line-height: 1.1;
    text-wrap: balance;

    @include from-medium {
      font-size: $font-size-display-small;
    }
  }

  &__claim-body {
    display: grid;
    gap: $space-small + 1px;
    font-size: $font-size-body-small;
  }
}
</style>
