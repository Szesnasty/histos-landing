<script setup lang="ts">
const { withBasePath } = useAssetPath()

const MAST_ARTWORK_ALT_TEXT =
  "Odysseus bound to the mast with heavy rope, looking past the Sirens on the rocks. The ship's tiller is out " +
  'of his reach.'
</script>

<template>
  <section id="answer" class="page-section">
    <div class="page-container">
      <SectionHeading eyebrow="The answer" heading="Do not ask the model to resist the Sirens." />

      <div class="split-layout split-layout--centered">
        <div class="prose-column">
          <p class="section-lede">
            He made the decision earlier, while he still could. That is what policy enforcement is:
            <strong>a commitment made before the model encounters the world.</strong>
          </p>
          <p class="answer-section__paragraph text-secondary">
            Histos does not try to interpret intent or guess whether a prompt is malicious. It evaluates a
            request against static policy and a trusted identity, then allows it or denies it before the tool
            executes.
          </p>
        </div>

        <figure class="answer-section__artwork">
          <picture>
            <source :srcset="withBasePath('/img/mast-600.webp')" media="(max-width: 700px)" type="image/webp" >
            <img
              :src="withBasePath('/img/mast-886.webp')"
              :alt="MAST_ARTWORK_ALT_TEXT"
              width="886"
              height="821"
              loading="lazy"
            >
          </picture>
        </figure>
      </div>

      <blockquote class="answer-section__pull-quote">
        <p class="answer-section__pull-quote-claim">
          Detection changes <em>probabilities</em>.<br >
          Enforcement changes <em>possibilities</em>.
        </p>
        <p class="text-secondary">Both have value. They are not the same layer.</p>
      </blockquote>

      <PolicyConstantDiagram class="answer-section__constant-diagram" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.answer-section {
  &__paragraph {
    margin-top: $space-base - 1px;
  }

  &__artwork {
    margin: 0;
    border-radius: $radius-large;
    overflow: hidden;
    border: $border-hairline solid var(--border-subtle);
    background: #05070a;
    box-shadow: var(--elevation-shadow);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__pull-quote {
    @include accent-rule-block;

    margin: $space-huge 0 0;
    max-width: $measure-comfortable;
    display: grid;
    gap: $space-small + 1px;
  }

  &__pull-quote-claim {
    font-size: $font-size-heading-large;
    font-weight: $font-weight-bold;
    letter-spacing: -0.022em;
    line-height: $line-height-heading;

    @include from-medium {
      font-size: 30px;
    }
  }

  &__constant-diagram {
    margin-top: $space-huge;
  }
}
</style>
