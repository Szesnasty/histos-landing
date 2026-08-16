<script setup lang="ts">
import { PROBLEM_CARDS } from '~/content/problemContent'
</script>

<template>
  <section id="problem" class="page-section page-section--sunken">
    <div class="page-container">
      <SectionHeading eyebrow="The problem" heading="A tool call turns model failure into a real action." />

      <div class="prose-column section-intro">
        <p>A chatbot can say something wrong. An agent can <em>do</em> something wrong.</p>
        <p class="text-secondary">
          Once a model can modify records or trigger external systems, prompt injection becomes an authorization
          problem at the tool boundary.
        </p>
      </div>

      <div class="card-grid card-grid--three">
        <ContentCard v-for="card in PROBLEM_CARDS" :key="card.title" :title="card.title" :body="card.body" />
      </div>

      <p class="section-closing-line">
        Assume the model can be manipulated. Put the boundary somewhere it cannot negotiate with.
      </p>
    </div>
  </section>
</template>
