<script setup lang="ts">
/**
 * The landing page is composition only.
 *
 * Every section owns its own markup, styles and content module; this file exists
 * to state the order they appear in, which is the one thing that is genuinely a
 * property of the page rather than of any section.
 */
import { CHANGELOG_URL, GITHUB_REPOSITORY_URL, PYPI_PROJECT_URL } from '~/content/siteLinks'
import { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from '~/content/siteMeta'
import { HISTOS_VERSION } from '~/content/statusContent'

/**
 * Structured data for the library the page is about.
 *
 * Every field is checkable against the repository: the licence, the Python
 * floor and the OS-independence are `pyproject.toml`, the repository URL is
 * where the page's own links point. Nothing that would have to be invented is
 * here - no rating, no user count, no price, no publisher - because a schema
 * property is a claim, and an unverifiable one is worse than an absent one.
 */
const SOFTWARE_APPLICATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  url: `${SITE_ORIGIN}/`,
  description: SITE_DESCRIPTION,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'OS Independent',
  softwareVersion: HISTOS_VERSION,
  softwareRequirements: 'Python >= 3.12',
  programmingLanguage: 'Python',
  license: 'https://www.apache.org/licenses/LICENSE-2.0',
  downloadUrl: PYPI_PROJECT_URL,
  installUrl: PYPI_PROJECT_URL,
  releaseNotes: CHANGELOG_URL,
  sameAs: [GITHUB_REPOSITORY_URL, PYPI_PROJECT_URL],
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(SOFTWARE_APPLICATION_JSON_LD),
    },
  ],
})
</script>

<template>
  <div id="top">
    <HeroSection />
    <ProblemSection />
    <AnswerSection />
    <RuntimeEnforcementSection />
    <BenchmarkSection />
    <WhyPolicySection />
    <IdentitySection />
    <PolicyFormatSection />
    <ScopeSection />
    <OpenCoreSection />
    <ReleaseStatusSection />
    <CallToActionSection />
  </div>
</template>
