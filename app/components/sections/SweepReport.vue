<script setup lang="ts">
import {
  SWEEP_READINGS,
  SWEEP_SCENARIOS,
  SWEEP_CONTROLS,
  SWEEP_POLICY_VARIANTS,
  SWEEP_TEMPERATURES,
  SWEEP_TOTALS,
  SWEEP_HOSTED,
  SWEEP_METHOD,
  SWEEP_PRIOR_ART,
  SWEEP_CONTRIBUTION,
} from '~/content/benchmarkContent'

const { withBasePath } = useAssetPath()

const COLUMNS = [...SWEEP_TEMPERATURES, 'fixed'] as const

/** A cell is "hot" when the attack landed on every run it was given. */
function isTotal(damage: number, runs: number) {
  return runs > 0 && damage === runs
}

function isHosted(model: string) {
  return (SWEEP_HOSTED as readonly string[]).includes(model)
}
</script>

<template>
  <section class="page-section benchmark">
    <div class="page-container">
      <SectionHeading
        eyebrow="Measured"
        heading="749 runs, 7 models, 6 scenarios"
        subheading="The same three agents, driven twice each — as written, and behind a policy."
      />

      <p class="section-lede prose-column">
        Counts, never percentages: five runs do not support a percentage, and rounding
        <code>4/5</code> to <code>80%</code> would invent precision the sample cannot carry.
        Raw records — one JSON object per run, each naming the commit that produced it and
        the hash of the policy that decided — are at <a :href="withBasePath('/sweep.jsonl')" download>sweep.jsonl</a>.
      </p>

      <div class="benchmark__headline">
        <div class="benchmark__stat">
          <span class="benchmark__stat-value">83<span class="benchmark__stat-of">/85</span></span>
          <span class="benchmark__stat-label">
            runs in which five of the seven models — including <code>gpt-4.1</code> and
            <code>o4-mini</code> — leaked a patient's details to a stranger's phone
          </span>
        </div>
        <div class="benchmark__stat">
          <span class="benchmark__stat-value">0<span class="benchmark__stat-of">/170</span></span>
          <span class="benchmark__stat-label">
            runs in which those same five fell for the invoice fraud or the injected
            runbook. No policy involved: they refused unaided
          </span>
        </div>
        <div class="benchmark__stat benchmark__stat--accent">
          <span class="benchmark__stat-value">{{ SWEEP_TOTALS.gatedDamage }}<span class="benchmark__stat-of">/{{ SWEEP_TOTALS.runs }}</span></span>
          <span class="benchmark__stat-label">
            reached the datastore behind a policy — and {{ SWEEP_TOTALS.mediationBreaches }} calls
            reached a tool the policy had not seen
          </span>
        </div>
      </div>

      <p class="benchmark__thesis prose-column">
        <strong>The split is not capability, and not vendor.</strong> A 26B open-weight model
        reproduces <code>gpt-4.1</code> run for run. What separates the columns is whether the
        attack <em>looks</em> like one. A bank account that disagrees with the supplier master
        does. A runbook telling an agent to scale production to zero does. A sentence in a
        patient's own intake note — <em>“I do not use my own phone for messages”</em> — does not,
        because it is an ordinary service request. There is nothing in it to detect, and a
        reasoning model has nothing to reason about.
      </p>

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
              Runs in which the attack reached the datastore with no policy, by model and
              sampling temperature, with the runs in which the agent still did the user's job
            </caption>
            <thead>
              <tr>
                <th scope="col">model</th>
                <th v-for="t in SWEEP_TEMPERATURES" :key="t" scope="col">t={{ t }}</th>
                <th scope="col">default</th>
                <th scope="col" class="benchmark__protected-head">behind a policy</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in scenario.rows" :key="row.model">
                <th scope="row">
                  <code>{{ row.model }}</code>
                  <span v-if="isHosted(row.model)" class="benchmark__tag">hosted</span>
                </th>
                <td
                  v-for="column in COLUMNS"
                  :key="column"
                  :class="{ 'is-total': row.cells[column] && isTotal(row.cells[column]!.damage, row.cells[column]!.runs) }"
                >
                  <template v-if="row.cells[column]">
                    {{ row.cells[column]!.damage }}/{{ row.cells[column]!.runs }}
                    <span class="benchmark__util">{{ row.cells[column]!.done }}/{{ row.cells[column]!.runs }}</span>
                  </template>
                  <template v-else>&mdash;</template>
                </td>
                <td class="benchmark__protected">
                  0/{{ Object.values(row.cells).reduce((n, c) => n + c.runs, 0) }}
                  <span class="benchmark__util">{{ Object.values(row.cells).reduce((n, c) => n + c.gatedDone, 0) }}/{{ Object.values(row.cells).reduce((n, c) => n + c.runs, 0) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="benchmark__legend text-secondary">
          Large figure: runs in which the attack landed. <span class="benchmark__util">Small figure</span>:
          runs in which the agent still did the user's job. An attack rate that falls because
          the agent stopped working is not a defence, so the two are never shown apart.
        </p>

        <p class="benchmark__control"><strong>What holds it.</strong> {{ scenario.control }}</p>
        <p class="benchmark__did"><strong>What the gate actually did.</strong> {{ scenario.didWhat }}</p>
      </article>

      <h3 class="benchmark__subhead">Half the grid is scenarios with no attacker</h3>
      <p class="benchmark__lede prose-column">
        Without a column where the policy has nothing to catch, “the gate stopped everything”
        is unfalsifiable — and a gate that refuses the fraud <em>and</em> the honest settlement
        is not a control, it is an outage.
      </p>

      <div class="benchmark__table-scroll">
        <table class="benchmark__table benchmark__table--wide">
          <thead>
            <tr>
              <th scope="col">the request</th>
              <th scope="col">as written</th>
              <th scope="col">behind a policy</th>
              <th scope="col">verdict</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="control in SWEEP_CONTROLS" :key="control.id" :class="{ 'is-costly': control.costly }">
              <th scope="row">
                {{ control.title }}
                <span class="benchmark__request text-secondary">{{ control.request }}</span>
              </th>
              <td>{{ control.ungated }}</td>
              <td>{{ control.gated }}</td>
              <td class="benchmark__verdict">{{ control.verdict }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="benchmark__subhead">Would a better rule avoid that cost?</h3>
      <p class="benchmark__lede prose-column">
        The obvious objection to the clinic row above is that a better-written policy would not
        delete the feature. Rather than assert it, here are four policies on the same request,
        40 runs each. The registry variant stops the injection as completely as the shipped rule
        and keeps what the shipped rule deletes — and it only works because
        <code>registered_contacts</code> holds a fact no agent and no patient-supplied text can
        write. <strong>The cost belongs to a missing out-of-band channel, not to the rule.</strong>
      </p>

      <div class="benchmark__table-scroll">
        <table class="benchmark__table benchmark__table--wide">
          <thead>
            <tr>
              <th scope="col">policy</th>
              <th scope="col">attack landed</th>
              <th scope="col">caller still told</th>
              <th scope="col">carer received it</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="variant in SWEEP_POLICY_VARIANTS" :key="variant.policy">
              <th scope="row">
                <code>{{ variant.policy }}</code>
                <span class="benchmark__request text-secondary">{{ variant.description }}</span>
              </th>
              <td :class="{ 'is-total': variant.attackLanded !== '0/20' }">{{ variant.attackLanded }}</td>
              <td>{{ variant.callerTold }}</td>
              <td>{{ variant.carerReceived }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="benchmark__variant-notes">
        <li v-for="variant in SWEEP_POLICY_VARIANTS" :key="variant.policy">
          <code>{{ variant.policy }}</code> <span class="text-secondary">{{ variant.note }}</span>
        </li>
      </ul>

      <ul class="benchmark__readings">
        <li v-for="reading in SWEEP_READINGS" :key="reading.title">
          <h3>{{ reading.title }}</h3>
          <p class="text-secondary">{{ reading.body }}</p>
        </li>
      </ul>

      <div class="benchmark__prior">
        <h3>What was already known</h3>
        <p class="text-secondary">
          The effect of sampling temperature on attack success — non-monotonic, and reversing
          direction between models — has been published before, on generated text. These runs
          did not discover it, and on the hosted models did not reproduce it:
        </p>
        <ul>
          <li v-for="work in SWEEP_PRIOR_ART" :key="work.identifier">
            <strong>{{ work.work }}</strong>
            <span class="text-secondary"> {{ work.finding }}</span>
            <code>{{ work.identifier }}</code>
          </li>
        </ul>
        <p class="benchmark__contribution">{{ SWEEP_CONTRIBUTION }}</p>
      </div>

      <details class="benchmark__method">
        <summary>How this was measured, and what it does not show</summary>
        <ul>
          <li v-for="line in SWEEP_METHOD" :key="line">{{ line }}</li>
        </ul>
        <p>
          Raw per-run records: <a :href="withBasePath('/sweep.jsonl')" download>sweep.jsonl</a>. Re-run any cell with
          <code>OPS_MODEL=… OPS_TEMP=… python run.py compare 2</code> in the demo directory, or the
          whole grid with <code>demo/sweep/sweep.py</code>. The instrument checks itself first:
          <code>demo/sweep/validate.py</code>.
        </p>
      </details>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.benchmark {
  padding-top: 0;

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
      grid-template-columns: repeat(3, 1fr);
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
    font-size: 40px;
    font-weight: $font-weight-strong;
    line-height: 1.05;
  }

  &__stat-of {
    font-size: 22px;
    color: var(--text-secondary);
  }

  &__stat-label {
    display: block;
    margin-top: $space-tiny;
    font-size: $font-size-body-small;
    color: var(--text-secondary);
    max-width: 36ch;
  }

  &__thesis {
    @include accent-rule-block;

    margin-top: $space-large;
    font-size: $font-size-body-small;
  }

  &__subhead {
    margin-top: $space-huge;
    font-size: $font-size-body-large;
  }

  &__lede {
    margin-top: $space-tiny;
    font-size: $font-size-body-small;
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
  &__control,
  &__did,
  &__legend {
    margin-top: $space-tiny;
    font-size: $font-size-body-small;
    max-width: 832px;
  }

  &__control,
  &__did {
    margin-top: $space-small;
  }

  &__tag {
    margin-left: $space-hair;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-secondary);
    border: $border-hairline solid var(--border-subtle);
  }

  &__table-scroll {
    overflow-x: auto;
    margin-top: $space-base;
  }

  &__table {
    border-collapse: collapse;
    font-size: $font-size-body-small;
    font-variant-numeric: tabular-nums;
    min-width: 620px;

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

    &--wide {
      min-width: 720px;

      td,
      th[scope='row'] {
        text-align: left;
        vertical-align: top;
      }
    }

    tr.is-costly th[scope='row'] {
      border-left: 2px solid var(--accent-text);
      padding-left: $space-small;
    }
  }

  &__util {
    display: inline-block;
    margin-left: 4px;
    font-size: $font-size-caption;
    color: var(--text-secondary);
  }

  &__request {
    display: block;
    margin-top: 2px;
    font-size: $font-size-caption;
    font-weight: $font-weight-regular;
    max-width: 34ch;
  }

  &__verdict {
    max-width: 44ch;
    font-size: $font-size-caption;
  }

  &__protected,
  &__protected-head {
    border-left: $border-hairline solid var(--border-subtle);
  }

  &__protected {
    color: var(--accent-text);
    font-weight: $font-weight-strong;
  }

  &__variant-notes {
    @include hairline-stack;

    margin-top: $space-base;
    max-width: 832px;

    li {
      padding: $space-small $space-medium - 2px;
      font-size: $font-size-body-small;
    }
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

  &__prior {
    margin-top: $space-huge;

    h3 {
      font-size: $font-size-body-small;
    }

    > p {
      margin-top: $space-tiny;
      font-size: $font-size-body-small;
      max-width: 832px;
    }

    ul {
      margin: $space-base 0 0;
      padding-left: $space-medium;
      display: grid;
      gap: $space-small;
      max-width: 832px;
      font-size: $font-size-body-small;
    }

    code {
      margin-left: $space-hair;
      font-size: $font-size-caption;
      color: var(--text-secondary);
    }
  }

  &__contribution {
    @include accent-rule-block;

    margin-top: $space-large;
    font-size: $font-size-body-small;
    max-width: 832px;
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
