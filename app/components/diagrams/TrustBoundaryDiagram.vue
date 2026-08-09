<script setup lang="ts">
const ACCESSIBLE_DESCRIPTION =
  'An injected instruction reaches the model through untrusted content. The model proposes a tool call. ' +
  'Histos evaluates it against static policy and a trusted identity, and allows or denies it before anything ' +
  'reaches the real world.'
</script>

<template>
  <figure class="trust-boundary">
    <svg viewBox="0 0 460 600" role="img" :aria-label="ACCESSIBLE_DESCRIPTION">
      <defs>
        <marker id="tb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 10 5 0 10z" fill="var(--border-strong)" />
        </marker>
        <marker id="tb-arrow-accent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 10 5 0 10z" fill="var(--accent)" />
        </marker>
      </defs>

      <rect x="8" y="8" width="444" height="118" rx="12" class="zone-untrusted" />
      <text x="24" y="32" class="zone-label-untrusted">UNTRUSTED</text>
      <text x="230" y="62" class="text-large" text-anchor="middle">Content the agent reads</text>
      <text x="230" y="88" class="text-small" text-anchor="middle">
        documents · tool output · retrieved data · user input
      </text>
      <text x="230" y="110" class="text-warning" text-anchor="middle">
        any of which may carry an instruction you did not write
      </text>

      <path d="M230 126 v34" class="connector" marker-end="url(#tb-arrow)" />

      <rect x="98" y="164" width="264" height="76" rx="12" class="box-neutral" />
      <text x="230" y="196" class="text-large" text-anchor="middle">The model</text>
      <text x="230" y="220" class="text-small" text-anchor="middle">may be manipulated - assume it is</text>

      <path d="M230 240 v34" class="connector" marker-end="url(#tb-arrow)" />
      <text x="238" y="262" class="text-tiny">proposes a tool call</text>

      <rect x="8" y="278" width="444" height="186" rx="14" class="zone-gate" />
      <text x="24" y="304" class="zone-label-gate">HISTOS</text>
      <text x="436" y="304" class="text-tiny" text-anchor="end">deterministic · in-process · local checks in µs</text>

      <rect x="26" y="320" width="122" height="30" rx="8" class="chip" />
      <text x="87" y="340" class="text-chip" text-anchor="middle">trusted identity</text>

      <rect x="160" y="320" width="122" height="30" rx="8" class="chip" />
      <text x="221" y="340" class="text-chip" text-anchor="middle">static policy</text>

      <rect x="294" y="320" width="140" height="30" rx="8" class="chip" />
      <text x="364" y="340" class="text-chip" text-anchor="middle">the request itself</text>

      <text x="230" y="378" class="text-small" text-anchor="middle">may THIS principal call THIS tool,</text>
      <text x="230" y="398" class="text-small" text-anchor="middle">
        with THESE arguments, on THIS resource?
      </text>

      <line x1="26" y1="416" x2="434" y2="416" class="hairline" />
      <text x="230" y="444" class="text-note" text-anchor="middle">
        nothing here is read from the conversation
      </text>

      <path d="M150 464 v26 h-30 v20" class="connector-accent" marker-end="url(#tb-arrow-accent)" />
      <path d="M310 464 v26 h30 v20" class="connector" marker-end="url(#tb-arrow)" />

      <rect x="34" y="512" width="172" height="62" rx="11" class="box-deny" />
      <text x="120" y="538" class="text-deny" text-anchor="middle">DENY</text>
      <text x="120" y="559" class="text-tiny" text-anchor="middle">recorded, non-coaching</text>

      <rect x="254" y="512" width="172" height="62" rx="11" class="box-allow" />
      <text x="340" y="538" class="text-allow" text-anchor="middle">the real world</text>
      <text x="340" y="559" class="text-tiny" text-anchor="middle">only within the bounds</text>
    </svg>
  </figure>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

$diagram-max-width: 460px;

.trust-boundary {
  margin: 0;

  svg {
    width: 100%;
    height: auto;
    max-width: $diagram-max-width;
    margin-inline: auto;
  }

  .zone-untrusted {
    fill: var(--verdict-deny-surface);
    stroke: color-mix(in srgb, var(--verdict-deny) 32%, transparent);
    stroke-dasharray: 4 4;
  }

  .zone-gate {
    fill: var(--accent-surface);
    stroke: var(--accent);
    stroke-width: 1.6;
  }

  .box-neutral,
  .chip {
    fill: var(--surface-raised);
    stroke: var(--border-strong);
  }

  .box-deny {
    fill: var(--verdict-deny-surface);
    stroke: color-mix(in srgb, var(--verdict-deny) 45%, transparent);
  }

  .box-allow {
    fill: var(--verdict-allow-surface);
    stroke: color-mix(in srgb, var(--verdict-allow) 45%, transparent);
  }

  .connector {
    stroke: var(--border-strong);
    stroke-width: 1.6;
    fill: none;
  }

  .connector-accent {
    stroke: var(--accent);
    stroke-width: 1.6;
    fill: none;
  }

  .hairline {
    stroke: color-mix(in srgb, var(--accent) 40%, transparent);
    stroke-width: 1;
  }

  text {
    font-family: $font-family-sans;
    fill: var(--text-primary);
  }

  .zone-label-untrusted,
  .zone-label-gate {
    font-family: $font-family-mono;
    font-size: 10px;
    letter-spacing: $letter-spacing-eyebrow;
    font-weight: $font-weight-strong;
  }

  .zone-label-untrusted {
    fill: var(--verdict-deny);
  }

  .zone-label-gate {
    fill: var(--accent-text);
    font-weight: 700;
  }

  .text-large {
    font-size: 15px;
    font-weight: $font-weight-strong;
  }

  .text-small {
    font-size: 12px;
    fill: var(--text-secondary);
  }

  .text-warning {
    font-family: $font-family-mono;
    font-size: 10.5px;
    fill: var(--verdict-deny);
  }

  .text-tiny {
    font-size: 10.5px;
    fill: var(--text-tertiary);
  }

  .text-note {
    font-size: 11px;
    fill: var(--accent-text);
    font-style: italic;
  }

  .text-chip {
    font-family: $font-family-mono;
    font-size: 10px;
    fill: var(--text-secondary);
  }

  .text-deny {
    font-family: $font-family-mono;
    font-size: 15px;
    font-weight: 700;
    fill: var(--verdict-deny);
    letter-spacing: 0.06em;
  }

  .text-allow {
    font-size: 14px;
    font-weight: $font-weight-strong;
    fill: var(--verdict-allow);
  }
}
</style>
