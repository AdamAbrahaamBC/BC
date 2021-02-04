<template>
  <div>
    <div class="menu mx-3 pt-2">
      <b-button class="tile is-child" type="is-primary" @click="$emit('hide-slides')">
        <b-icon
          icon="chevron-left"
          type="is-blue"
        />
      </b-button>

      <div class="tile is-ancestor my-0">
        <div class="tile is-parent">
          <b-button class="tile is-child" outlined type="is-blue" @click="$emit('open-grid-view')">
            <b-icon
              icon="view-grid-outline"
            />
          </b-button>
        </div>
        <div class="tile is-parent">
          <b-button class="tile is-child" outlined type="is-blue" @click="copyCurrentSlide">
            <b-icon
              icon="content-copy"
            />
          </b-button>
        </div>
        <div class="tile is-parent">
          <b-button class="tile is-child" :disabled="!copiedSlide" outlined type="is-blue" @click="pasteSlide">
            <b-icon
              icon="book-plus-multiple-outline"
            />
          </b-button>
        </div>
      </div>

      <div class="tile is-ancestor my-0">
        <div class="tile is-parent is-8">
          <b-button class="tile is-child" type="is-blue" @click="newSlide">
            <b-icon
              icon="card-plus-outline"
            />
          </b-button>
        </div>
        <div class="tile is-parent">
          <b-button class="tile is-child" type="is-danger" :disabled="slides.length === 1" @click="$emit('delete-slide')">
            <b-icon
              icon="delete"
              type="is-secondary"
            />
          </b-button>
        </div>
      </div>
    </div>

    <draggable
      v-model="draggableSlides"
      class="slide-list"
      ghost-class="ghost"
      @change="handleChange"
    >
      <div v-for="(slide, index) in slides" :key="slide + index" class="px-5 py-5" :class="{'has-background-secondary': currentSlide !== null && index === currentSlide}">
        <div class="box presentation-slide px-1 py-1 clickable" @click="$emit('switch-slide', index)">
          <viewer :initial-value="slide" />
        </div>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { usePresentationStore, PresentationStore } from '~/composable/presentationStore'
import { useToasts } from '~/composable/toasts'

export default defineComponent({
  props: {
    slides: {
      type: Array as () => string[],
      required: true
    },
    currentSlide: {
      type: Number,
      required: true
    }
  },

  emits: ['hide-slides', 'change-current-slide', 'delete-slide', 'switch-slide', 'open-grid-view', 'slides-changed'],

  setup (props, { emit }) {
    const { successToast } = useToasts()
    const presentationStore: PresentationStore = usePresentationStore()

    const draggableSlides = computed({
      get: () => props.slides,
      set: value => emit('slides-changed', value)
    })

    const copiedSlide = computed<string | null>(() => presentationStore.copiedSlide.value)

    function newSlide (): void {
      draggableSlides.value = [
        ...props.slides.slice(0, props.currentSlide + 1),
        '# Slide\ncontent',
        ...props.slides.slice(props.currentSlide + 1)]

      emit('change-current-slide', props.currentSlide + 1)
    }

    function handleChange (slide: any): void {
      if (slide && slide.moved) {
        emit('change-current-slide', slide.moved.newIndex)
      }
    }

    function pasteSlide (): void {
      if (!copiedSlide.value) {
        return
      }

      draggableSlides.value = [
        ...props.slides.slice(0, props.currentSlide + 1),
        copiedSlide.value,
        ...props.slides.slice(props.currentSlide + 1)]

      emit('change-current-slide', props.currentSlide + 1)
      successToast('Pasted!')
    }

    function copyCurrentSlide (): void {
      presentationStore.copySlide(props.slides[props.currentSlide])
      successToast('Copied!')
    }

    return {
      draggableSlides,
      newSlide,
      handleChange,
      copyCurrentSlide,
      pasteSlide,
      copiedSlide
    }
  }
})
</script>

<style scoped>

</style>
