<script setup lang="ts">
import type { SupportedLanguage } from '~/composables/useSyntaxHighlight'

const props = withDefaults(
  defineProps<{
    code: string
    language?: SupportedLanguage
    label?: string
    caption?: string
  }>(),
  { language: 'text' },
)

const { highlightedHtml } = useSyntaxHighlight(
  () => props.code,
  () => props.language,
)
</script>

<template>
  <figure class="code-block">
    <div v-if="label" class="code-block__bar">
      <span class="code-block__label">{{ label }}</span>
    </div>
    <pre class="code-block__source"><code v-html="highlightedHtml" /></pre>
    <figcaption v-if="caption" class="code-block__caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.code-block {
  margin: 0;
  border: $border-hairline solid var(--border-subtle);
  border-radius: $radius-large;
  overflow: hidden;
  background: var(--surface-code);

  &__bar {
    padding: $space-tiny $space-base;
    border-bottom: $border-hairline solid rgb(255 255 255 / 7%);
    background: rgb(255 255 255 / 2.5%);
  }

  &__label {
    font-family: $font-family-mono;
    font-size: $font-size-caption;
    letter-spacing: 0.06em;
    color: var(--code-dim);
  }

  &__source {
    margin: 0;
    padding: $code-padding-block $code-padding-inline;
    overflow-x: auto;
    font-family: $font-family-mono;
    font-size: $font-size-code;
    line-height: $line-height-code;
    color: var(--code-text);
    tab-size: 2;

    :deep(.token-key) {
      color: var(--code-key);
    }

    :deep(.token-keyword) {
      color: var(--code-keyword);
    }

    :deep(.token-string) {
      color: var(--code-string);
    }

    :deep(.token-comment) {
      color: var(--code-comment);
      font-style: italic;
    }

    :deep(.token-deny) {
      color: #f08379;
      font-weight: $font-weight-strong;
    }

    :deep(.token-allow) {
      color: #6fca9b;
      font-weight: $font-weight-strong;
    }

    :deep(.token-warn) {
      color: #e2b563;
    }
  }

  &__caption {
    padding: $space-small $space-base;
    border-top: $border-hairline solid rgb(255 255 255 / 7%);
    font-size: $font-size-small;
    color: var(--code-dim);
    background: rgb(255 255 255 / 2%);
  }
}
</style>
