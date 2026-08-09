<script setup lang="ts">
import { PROBLEM_CARDS } from '~/content/problemContent'
</script>

<template>
  <section id="problem" class="page-section page-section--sunken">
    <div class="page-container">
      <SectionHeading eyebrow="The problem" heading="Agents do not fail where chatbots fail." />

      <div class="prose-column section-intro">
        <p>A chatbot can say something wrong. An agent can <em>do</em> something wrong.</p>
        <p class="text-secondary">
          Once a model can call tools, read internal data, modify records or trigger external systems, prompt
          injection is no longer only a content problem. It becomes an execution problem.
        </p>
      </div>

      <div class="card-grid card-grid--three">
        <ContentCard v-for="card in PROBLEM_CARDS" :key="card.title" :title="card.title" :body="card.body" />
      </div>

      <p class="section-closing-line">
        If the model can be manipulated, the boundary must live somewhere the model cannot negotiate with.
      </p>
    </div>
  </section>
</template>
