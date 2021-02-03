<template>
  <draggable
    v-model="draggableSlides"
    ghost-class="ghost"
    tag="div"
    class="columns is-multiline"
  >
    <div v-for="(slide, index) in slides" :key="slide + index" class="column is-3">
      <div class="box grid-slide px-1 py-1 clickable" @click="$emit('switch-slide', index)">
        <viewer :initial-value="slide" />
      </div>
    </div>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    slides: {
      type: Array as () => string[],
      required: true
    }
  },

  emits: ['switch-slide', 'slides-changed'],

  setup (props, { emit }) {
    const draggableSlides = computed({
      get: () => props.slides,
      set: value => emit('slides-changed', value)
    })

    return {
      draggableSlides
    }
  }
})
</script>

<style scoped>

</style>
