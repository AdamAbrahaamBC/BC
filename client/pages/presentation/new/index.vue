<template>
  <div class="columns mx-0 my-0" style="height: 100vh">
    <div class="column is-2 has-background-primary px-0 py-0">
      <div class="menu">
        <div class="tile is-ancestor my-0 mx-3">
          <div class="tile is-parent is-8">
            <b-button class="tile is-child" outlined type="is-secondary" @click="newSlide">
              <b-icon
                icon="card-plus-outline"
                type="is-blue"
              />
            </b-button>
          </div>
          <div class="tile is-parent">
            <b-button class="tile is-child" type="is-danger" :disabled="slides.length === 1" @click="deleteSlide">
              <b-icon
                icon="delete"
                type="is-secondary"
              />
            </b-button>
          </div>
        </div>
      </div>

      <div class="slide-list">
        <div v-for="(slide, index) in slides" :key="slide" class="px-5 py-3" :class="{'has-background-secondary': index === currentSlide}">
          <div class="box" style="cursor: pointer" @click="currentSlide = index">
            <viewer :initial-value="slide" class="has-background-white slide" />
          </div>
        </div>
      </div>
    </div>

    <div class="column px-5 py-5 has-background-secondary">
      <editor
        v-if="slides.length"
        :key="currentSlide"
        ref="editorRef"
        :options="options"
        :initial-value="slides[currentSlide]"
        height="100%"
        class="has-background-white"
        @blur="saveSlideContent"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { DialogProgrammatic as dialog } from 'buefy'

export default defineComponent({
  layout: 'editor',

  setup () {
    const state = reactive({
      options: {
        usageStatistics: false,
        hideModeSwitch: true
      },
      slides: ['# Title\n\ncontent'],
      currentSlide: 0,
      slideContent: '',
      editorRef: null
    })

    function newSlide (): void {
      state.slides.splice(state.currentSlide + 1, 0, '# Title\n\ncontent')
      state.currentSlide++
    }

    function saveSlideContent (): void {
      const content = state.editorRef.invoke('getMarkdown')
      state.slides[state.currentSlide] = content
    }

    function deleteSlide (): void {
      dialog.confirm({
        title: 'Deleting slide',
        message: 'Are you sure you want to <b>delete</b> this slide? This action cannot be undone.',
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          state.slides.splice(state.currentSlide, 1)
          state.currentSlide = state.currentSlide >= state.slides.length ? state.slides.length - 1 : state.currentSlide
        }
      })
    }

    return {
      ...toRefs(state),
      newSlide,
      saveSlideContent,
      deleteSlide
    }
  }
})
</script>

<style scoped>
  .menu {
    height: 10vh;
  }

  .slide-list {
    overflow-y: auto;
    height: 90vh;
  }

  .slide {
    overflow: hidden;
    height: 10vh;
  }

</style>
