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
import { defineComponent, onMounted, onUnmounted } from '@nuxtjs/composition-api'
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

    onUnmounted(() => {
      location.reload()
    })

    return {}
  }
})
</script>

<style lang='scss'>
  @import '~/assets/reveal.scss';
</style>
