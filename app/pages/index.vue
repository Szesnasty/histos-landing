<script setup lang="ts">
/**
 * The landing page is composition only.
 *
 * Every section owns its own markup, styles and content module; this file exists
 * to state the order they appear in, which is the one thing that is genuinely a
 * property of the page rather than of any section.
 */
</script>

<template>
  <div id="top">
    <HeroSection />
    <ProblemSection />
    <AnswerSection />
    <RuntimeEnforcementSection />
    <IdentitySection />
    <PolicyFormatSection />
    <ScopeSection />
    <OpenCoreSection />
    <ReleaseStatusSection />
    <CallToActionSection />
  </div>
</template>
