<template>
  <div class="columns mx-0 my-0" style="height: 100vh">
    <div class="column is-2 has-background-primary">
      <b-button>
        <b-icon
          icon="arrow-collapse-left"
          size="is-small"
        />
      </b-button>

      <div v-for="(slide, index) in slides" :key="index" :class="{'has-background-blue': index === currentSlide}">
        {{ index }}
      </div>

      <b-button @click="newSlide">
        +
      </b-button>
    </div>
    <div class="column px-5 py-5 has-background-secondary">
      <editor :options="options" :initial-value="slides[currentSlide]" height="100%" class="has-background-white" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'editor',

  setup () {
    const state = reactive({
      options: {
        usageStatistics: false,
        hideModeSwitch: true
      },
      slides: ['# Title\n\ncontent'],
      currentSlide: 0
    })

    function newSlide (): void {
      state.currentSlide = state.slides.push('# Title\n\ncontent') - 1
    }

    return {
      ...toRefs(state),
      newSlide
    }
  }
})
</script>

<style scoped>

</style>
