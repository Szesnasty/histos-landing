<script setup lang="ts">
import {
  SWEEP_READINGS,
  SWEEP_SCENARIOS,
  SWEEP_TEMPERATURES,
  SWEEP_TOTALS,
  SWEEP_METHOD,
} from '~/content/benchmarkContent'

/** A cell is "hot" when the attack landed on every run it was given. */
function isTotal(damage: number, runs: number) {
  return runs > 0 && damage === runs
}
</script>

<template>
  <section id="sweep" class="page-section benchmark">
    <div class="page-container">
      <SectionHeading
        eyebrow="Measured"
        heading="192 measurements, 4 models, 4 temperatures"
        subheading="The same three agents, driven twice each — as written, and behind a policy."
      />

      <p class="section-lede prose-column">
        Every number below came from running the demos in this repository. Counts, never
        percentages: five runs do not support a percentage, and rounding
        <code>4/5</code> to <code>80%</code> would invent precision the sample cannot carry.
      </p>

      <div class="benchmark__headline">
        <div class="benchmark__stat">
          <span class="benchmark__stat-value">{{ SWEEP_TOTALS.unprotectedDamage }}<span class="benchmark__stat-of">/{{ SWEEP_TOTALS.runs }}</span></span>
          <span class="benchmark__stat-label">runs reached the datastore as damage, as the application is written</span>
        </div>
        <div class="benchmark__stat benchmark__stat--accent">
          <span class="benchmark__stat-value">{{ SWEEP_TOTALS.protectedDamage }}<span class="benchmark__stat-of">/{{ SWEEP_TOTALS.runs }}</span></span>
          <span class="benchmark__stat-label">did so behind a policy — every model, every temperature, every scenario</span>
        </div>
      </div>

      <article v-for="scenario in SWEEP_SCENARIOS" :key="scenario.id" class="benchmark__scenario">
        <header>
          <h3>{{ scenario.title }}</h3>
          <code class="benchmark__demo">demo/{{ scenario.demo }}</code>
        </header>
        <p class="benchmark__agent text-secondary">{{ scenario.agent }}</p>
        <p class="benchmark__attack"><strong>The attack.</strong> {{ scenario.attack }}</p>

        <div class="benchmark__table-scroll">
          <table class="benchmark__table">
            <caption class="benchmark__caption">
              Runs in which the attack reached the datastore, unprotected, by model and sampling temperature
            </caption>
            <thead>
              <tr>
                <th scope="col">model</th>
                <th v-for="t in SWEEP_TEMPERATURES" :key="t" scope="col">t={{ t }}</th>
                <th scope="col" class="benchmark__protected-head">behind a policy</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in scenario.rows" :key="row.model">
                <th scope="row"><code>{{ row.model }}</code></th>
                <td
                  v-for="t in SWEEP_TEMPERATURES"
                  :key="t"
                  :class="{ 'is-total': isTotal(row.cells[t]!.damage, row.cells[t]!.runs) }"
                >
                  {{ row.cells[t]!.damage }}/{{ row.cells[t]!.runs }}
                </td>
                <td class="benchmark__protected">0/16</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="benchmark__control"><strong>What holds it.</strong> {{ scenario.control }}</p>
      </article>

      <p class="benchmark__note">
        The <code>t=0.0</code> column is <strong>one</strong> measurement, not five. Greedy
        decoding is deterministic, and we checked: all twelve <code>t=0.0</code> cells
        returned an identical outcome on all five runs. Reporting <code>5/5</code> there
        would claim a replication that never happened. Every total on this page uses the
        smaller denominator: 192 measurements out of 240 executed runs.
      </p>

      <ul class="benchmark__readings">
        <li v-for="reading in SWEEP_READINGS" :key="reading.title">
          <h3>{{ reading.title }}</h3>
          <p class="text-secondary">{{ reading.body }}</p>
        </li>
      </ul>

      <details class="benchmark__method">
        <summary>How this was measured, and what it does not show</summary>
        <ul>
          <li v-for="line in SWEEP_METHOD" :key="line">{{ line }}</li>
        </ul>
        <p>
          Raw per-run records, one JSON object per run:
          <a href="/sweep.jsonl" download>sweep.jsonl</a>. Re-run any cell with
          <code>OPS_MODEL=… OPS_TEMP=… python run.py compare 2</code> in the demo directory.
        </p>
      </details>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.benchmark {
  &__caption {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  &__headline {
    display: grid;
    gap: $space-base;
    margin-top: $space-xlarge;

    @include from-medium {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__stat {
    @include surface-card($space-medium);

    &--accent {
      @include accent-callout;
    }
  }

  &__stat-value {
    display: block;
    font-variant-numeric: tabular-nums;
    font-size: 44px;
    font-weight: $font-weight-strong;
    line-height: 1.05;
  }

  &__stat-of {
    font-size: 24px;
    color: var(--text-secondary);
  }

  &__stat-label {
    display: block;
    margin-top: $space-tiny;
    font-size: $font-size-body-small;
    color: var(--text-secondary);
    max-width: 36ch;
  }

  &__scenario {
    margin-top: $space-huge;

    header {
      display: flex;
      align-items: baseline;
      gap: $space-small;
      flex-wrap: wrap;
    }

    h3 {
      font-size: $font-size-body-large;
    }
  }

  &__demo {
    font-size: $font-size-caption;
    color: var(--text-secondary);
  }

  &__agent,
  &__attack,
  &__control {
    margin-top: $space-tiny;
    font-size: $font-size-body-small;
    max-width: 832px;
  }

  &__control {
    margin-top: $space-small;
  }

  &__table-scroll {
    overflow-x: auto;
    margin-top: $space-base;
  }

  &__table {
    border-collapse: collapse;
    font-size: $font-size-body-small;
    font-variant-numeric: tabular-nums;
    min-width: 520px;

    th,
    td {
      padding: $space-tiny $space-small;
      text-align: center;
      border-bottom: $border-hairline solid var(--border-subtle);
    }

    th[scope='row'] {
      text-align: left;
      font-weight: $font-weight-medium;
    }

    thead th {
      font-size: $font-size-caption;
      color: var(--text-secondary);
      font-weight: $font-weight-medium;
    }

    td.is-total {
      font-weight: $font-weight-strong;
    }
  }

  &__protected,
  &__protected-head {
    border-left: $border-hairline solid var(--border-subtle);
  }

  &__protected {
    color: var(--accent-text);
    font-weight: $font-weight-strong;
  }

  &__note {
    @include accent-rule-block;

    margin-top: $space-large;
    font-size: $font-size-body-small;
    max-width: 832px;
  }

  &__readings {
    @include hairline-stack;

    margin-top: $space-huge;

    li {
      padding: $space-base + 2px $space-medium - 2px;
    }

    h3 {
      font-size: $font-size-body-small;
      margin-bottom: $space-hair + 1px;
    }

    p {
      font-size: $font-size-body-small;
      max-width: 832px;
    }
  }

  &__method {
    margin-top: $space-large;
    font-size: $font-size-body-small;

    summary {
      cursor: pointer;
      color: var(--text-secondary);
    }

    ul {
      margin: $space-base 0 0;
      padding-left: $space-medium;
      display: grid;
      gap: $space-tiny;
      max-width: 832px;
    }

    p {
      margin-top: $space-base;
      max-width: 832px;
    }
  }
}
</style>
