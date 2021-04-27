<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        open
        position="static"
        type="is-primary"
        :fullheight="true"
        :overlay="false"
        :reduce="!showSlides"
      >
        <EditorSlideList
          v-if="showSlides"
          :slides="presentation.slides"
          :current-slide="currentSlide"
          @hide-slides="showSlides = false"
          @delete-slide="deleteSlide"
          @switch-slide="switchSlide($event)"
          @open-grid-view="openGridView"
          @slides-changed="presentation.slides = $event"
          @change-current-slide="currentSlide = $event"
        />

        <EditorMenu
          v-else
          @to-homescreen="toHomescreen"
          @toggle-save-panel="showSavePanel = !showSavePanel"
          @open-preview="openPreview"
          @download="download"
          @show-slides="showSlides = true"
        />
      </b-sidebar>

      <div class="px-6 py-6 width-100 has-background-secondary">
        <EditorSlideGrid
          v-if="showGridView"
          :slides="presentation.slides"
          @switch-slide="switchSlide($event)"
          @slides-changed="presentation.slides = $event"
        />
        <editor
          v-else-if="currentSlide !== null && presentation.slides.length && !showSavePanel"
          :key="currentSlide"
          ref="editorRef"
          :options="options"
          :initial-value="presentation.slides[currentSlide]"
          height="100%"
          class="box px-2 py-2"
          @blur="saveSlideContent"
        />
        <PresentationSavePanel
          v-else-if="showSavePanel"
          :presentation="presentation"
          @presentation-changed="presentation = $event"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, useContext } from '@nuxtjs/composition-api'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'
import { useDialogs } from '~/composable/dialogs'
import { PresentationStore, usePresentationStore } from '~/composable/presentationStore'
import EditorSlideList from '~/components/EditorSlideList.vue'
import EditorMenu from '~/components/EditorMenu.vue'
import EditorSlideGrid from '~/components/EditorSlideGrid.vue'
import PresentationSavePanel from '~/components/PresentationSavePanel.vue'

interface State {
  options: {
    usageStatistics: boolean
    hideModeSwitch: boolean
  }
  presentation: PresentationEditable
  currentSlide: number | null
  slideContent: string
  editorRef: any
  showSavePanel: boolean
  showSlides: boolean
  showGridView: boolean
}

export default defineComponent({
  components: { EditorSlideList, EditorMenu, EditorSlideGrid, PresentationSavePanel },

  layout: 'editor',

  props: {
    presentationDetails: {
      type: Object as () => PresentationEditable,
      required: true
    }
  },

  setup (props: any) {
    const { app: { router } } = useContext()
    const { deleteSlideDialog, toHomescreenDialog } = useDialogs()
    const presentationStore: PresentationStore = usePresentationStore()
    const state: any = reactive<State>({
      options: {
        usageStatistics: false,
        hideModeSwitch: true
      },
      presentation: { ...props.presentationDetails },
      currentSlide: 0,
      slideContent: '',
      editorRef: null,
      showSavePanel: false,
      showSlides: false,
      showGridView: false
    })

    function saveSlideContent (): void {
      const content = state.editorRef.invoke('getMarkdown')
      state.presentation.slides[state.currentSlide] = content
      presentationStore.savePresentation({ ...state.presentation })
    }

    function toHomescreen (): void {
      presentationStore.presentation.value &&
      presentationStore.presentation.value.id === state.presentation.id &&
      presentationStore.presentation.value.versionNumber === state.presentation.versionNumber
        ? toHomescreenDialog()
        : router?.push('/')
    }

    function deleteSlide (): void {
      deleteSlideDialog(state.presentation, state.currentSlide)
    }

    function switchSlide (index: number): void {
      state.currentSlide = index
      state.showSavePanel = false
      state.showGridView = false
    }

    function openPreview (): void {
      presentationStore.savePresentation({ ...state.presentation })
      router?.push(
        state.presentation.id
          ? `/presentation/${state.presentation.id}/${state.presentation.versionNumber}/preview`
          : '/presentation/new/preview')
    }

    function download (): void {
      presentationStore.savePresentation({ ...state.presentation })
      router?.push(
        state.presentation.id
          ? `/presentation/${state.presentation.id}/${state.presentation.versionNumber}/preview?print-pdf`
          : '/presentation/new/preview?print-pdf')
    }

    function openGridView (): void {
      state.showGridView = true
      state.showSlides = false
    }

    return {
      ...toRefs(state),
      saveSlideContent,
      deleteSlide,
      switchSlide,
      openPreview,
      download,
      toHomescreen,
      openGridView
    }
  }
})
</script>

<style lang="scss">
</style>
