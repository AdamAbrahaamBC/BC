<template>
  <div id="app">
    <div class="reveal">
      <div class="slides">
        <section v-for="(slide, index) in presentation.slides" :key="index">
          <viewer :initial-value="slide" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import Reveal from 'reveal.js'

export default defineComponent({
  props: {
    presentation: {
      type: Object,
      required: true
    }
  },

  setup () {
    onMounted(() => {
      Reveal.initialize({
        disableLayout: true,
        center: false
      })
    })
    return {}
  }
})
</script>

<style lang='scss'>
  @import '~/node_modules//reveal.js/css/reveal.scss';
  @import '~/node_modules/reveal.js/dist/theme/white.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    padding: 32px 32px 0px 32px;
  }

  .reveal .slides {
    text-align: left !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }
</style>
