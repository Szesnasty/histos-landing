<script setup lang="ts">
import {
  CHANGELOG_URL,
  GITHUB_REPOSITORY_URL,
  POLICY_GUIDE_URL,
  PYPI_PROJECT_URL,
  SECTION_ANCHORS,
  SPEC_CONFORMANCE_MANIFEST_URL,
  SPEC_DECISION_CODES_URL,
  SPEC_SCHEMA_URL,
  landingSection,
} from '~/content/siteLinks'
import { HISTOS_VERSION } from '~/content/statusContent'

const { withBasePath } = useAssetPath()

interface FooterColumn {
  title: string
  links: { label: string; href?: string; to?: string | { path: string; hash: string }; external?: boolean }[]
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'The library',
    links: [
      { label: `histos ${HISTOS_VERSION} on PyPI`, href: PYPI_PROJECT_URL, external: true },
      { label: 'Quickstart and installation', href: `${GITHUB_REPOSITORY_URL}#see-the-boundary-hold`, external: true },
      { label: 'Source', href: GITHUB_REPOSITORY_URL, external: true },
      { label: 'Changelog', href: CHANGELOG_URL, external: true },
      {
        label: 'SECURITY.md - where the guarantee stops',
        href: `${GITHUB_REPOSITORY_URL}/blob/main/SECURITY.md`,
        external: true,
      },
      {
        label: 'Roadmap and the adoption gate',
        href: `${GITHUB_REPOSITORY_URL}/blob/main/docs/roadmap.md`,
        external: true,
      },
      {
        label: 'Known debt, in the open',
        href: `${GITHUB_REPOSITORY_URL}/blob/main/docs/tech-debt.md`,
        external: true,
      },
    ],
  },
  {
    title: 'The format',
    links: [
      { label: 'How to write a policy', href: POLICY_GUIDE_URL, external: true },
      { label: 'Policy Format Draft 0.1', to: landingSection(SECTION_ANCHORS.format) },
      { label: 'JSON Schema', href: withBasePath(SPEC_SCHEMA_URL) },
      { label: 'Decision codes', href: withBasePath(SPEC_DECISION_CODES_URL) },
      { label: 'Conformance manifest', href: withBasePath(SPEC_CONFORMANCE_MANIFEST_URL) },
    ],
  },
  {
    title: 'Reading',
    links: [
      { label: 'The measurement', to: '/sweep' },
      { label: 'The problem', to: landingSection(SECTION_ANCHORS.problem) },
      { label: 'Why a policy', to: landingSection(SECTION_ANCHORS.whyPolicy) },
      { label: 'Scope and limits', to: landingSection(SECTION_ANCHORS.scope) },
      { label: 'Open-source boundary', to: landingSection(SECTION_ANCHORS.openCore) },
      { label: 'Status', to: landingSection(SECTION_ANCHORS.status) },
    ],
  },
]

const COPYRIGHT_YEAR = 2026
</script>

<template>
  <footer class="site-footer">
    <div class="page-container">
      <div class="site-footer__columns">
        <div class="site-footer__brand">
          <div class="site-footer__brand-row">
            <HistosMark :size-in-pixels="24" />
            <span class="site-footer__brand-name">Histos</span>
          </div>
          <p class="site-footer__tagline text-secondary">Deterministic policy enforcement at the Python tool boundary.</p>
          <p class="site-footer__etymology text-tertiary">
            ἱστός - the mast, from ἵστημι, <em>to stand</em>. The thing that stands.
          </p>
        </div>

        <nav v-for="column in FOOTER_COLUMNS" :key="column.title" class="site-footer__column" :aria-label="column.title">
          <h4>{{ column.title }}</h4>
          <ul>
            <li v-for="link in column.links" :key="link.label">
              <NuxtLink v-if="link.to" :to="link.to">{{ link.label }}</NuxtLink>
              <a v-else :href="link.href" :rel="link.external ? 'noopener' : undefined">{{ link.label }}</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="site-footer__baseline">
        <p class="text-tertiary">© {{ COPYRIGHT_YEAR }} Histos · Apache-2.0</p>
        <p class="text-tertiary">Policy Format Draft 0.1 - a draft, and it says so.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.site-footer {
  border-top: $border-hairline solid var(--border-subtle);
  background: var(--surface-sunken);
  padding-block: $space-huge $space-large;

  &__columns {
    display: grid;
    gap: $space-xlarge;

    @include from-medium {
      grid-template-columns: 1.4fr repeat(3, 1fr);
      gap: $space-large;
    }
  }

  &__brand-row {
    display: flex;
    align-items: center;
    gap: $space-tiny;
  }

  &__brand-name {
    font-weight: 660;
    font-size: $font-size-lede-small;
    letter-spacing: -0.02em;
  }

  &__tagline {
    margin-top: $space-tiny + 2px;
    font-size: $font-size-body-small;
  }

  &__etymology {
    margin-top: $space-tiny;
    font-size: $font-size-small;
    max-width: 352px;
  }

  &__column {
    h4 {
      @include monospace-label($font-size-caption);

      color: var(--text-tertiary);
      font-family: $font-family-sans;
      font-weight: $font-weight-strong;
      margin-bottom: $space-small + 2px;
    }

    ul {
      list-style: none;
      padding: 0;
      display: grid;
      gap: $space-tiny;
    }

    a {
      font-size: $font-size-detail;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color $transition-fast;

      &:hover {
        color: var(--text-primary);
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  &__baseline {
    margin-top: $space-xlarge;
    padding-top: $space-medium;
    border-top: $border-hairline solid var(--border-subtle);
    display: flex;
    flex-wrap: wrap;
    gap: $space-tiny $space-large;
    justify-content: space-between;
    font-size: $font-size-small;
  }
}
</style>
