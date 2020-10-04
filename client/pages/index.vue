<template>
  <section class="section">
    <b-button>{{ title }}</b-button>
  </section>
</template>

<script lang="ts">
import { ref } from "@nuxtjs/composition-api";

export default {
  setup() {
    const title = ref("Hello Type safety world!");

    return { title };
  },
};
</script>
