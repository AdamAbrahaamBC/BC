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
        <div v-if="showSlides">
          <div class="menu mx-3 pt-2">
            <b-button class="tile is-child" type="is-primary" @click="showSlides = false">
              <b-icon
                icon="chevron-left"
                type="is-blue"
              />
            </b-button>
            <div class="tile is-ancestor my-0">
              <div class="tile is-parent is-8">
                <b-button class="tile is-child" outlined type="is-blue" @click="newSlide">
                  <b-icon
                    icon="card-plus-outline"
                  />
                </b-button>
              </div>
              <div class="tile is-parent">
                <b-button class="tile is-child" type="is-danger" :disabled="presentation.slides.length === 1" @click="deleteSlide">
                  <b-icon
                    icon="delete"
                    type="is-secondary"
                  />
                </b-button>
              </div>
            </div>
          </div>

          <draggable
            :list="presentation.slides"
            class="slide-list"
            ghost-class="ghost"
          >
            <div v-for="(slide, index) in presentation.slides" :key="slide + index" class="px-5 py-5" :class="{'has-background-secondary': currentSlide !== null && index === currentSlide}">
              <div class="box presentation-slide px-1 py-1 clickable" @click="switchSlide(index)">
                <viewer :initial-value="slide" />
              </div>
            </div>
          </draggable>
        </div>

        <div v-else class="has-text-centered">
          <b-tooltip
            label="Home"
            type="is-secondary"
            position="is-bottom"
            class="my-5"
          >
            <b-button
              size="is-large"
              class="is-primary"
              @click="toHomescreen"
            >
              <b-icon
                size="is-medium"
                icon="home"
                type="is-blue"
              />
            </b-button>
          </b-tooltip>
          <b-tooltip
            label="Save"
            type="is-success"
            position="is-bottom"
            class="my-5"
          >
            <b-button
              size="is-large"
              type="is-success"
              @click="showSavePanel = !showSavePanel"
            >
              <b-icon
                size="is-medium"
                icon="content-save"
                type="is-secondary"
              />
            </b-button>
          </b-tooltip>
          <b-tooltip
            label="Preview"
            type="is-secondary"
            position="is-bottom"
            class="my-5"
          >
            <b-button
              size="is-large"
              type="is-blue"
              @click="openPreview"
            >
              <b-icon
                size="is-medium"
                icon="eye"
                type="is-primary"
              />
            </b-button>
          </b-tooltip>
          <b-tooltip
            label="Slides"
            type="is-secondary"
            position="is-bottom"
            class="my-5"
          >
            <b-button
              size="is-large"
              type="is-blue"
              outlined
              @click="showSlides = true"
            >
              <b-icon
                size="is-medium"
                icon="buffer"
              />
            </b-button>
          </b-tooltip>
        </div>
      </b-sidebar>

      <div class="px-6 py-6 width-100 has-background-secondary">
        <editor
          v-if="currentSlide !== null && presentation.slides.length && !showSavePanel"
          :key="currentSlide"
          ref="editorRef"
          :options="options"
          :initial-value="presentation.slides[currentSlide]"
          height="100%"
          class="box px-2 py-2"
          @blur="saveSlideContent"
        />
        <div v-else-if="showSavePanel" class="columns is-centered is-vcentered height-100">
          <div class="box has-background-primary" style="width: 50vw">
            <b-field label="Presentation title" custom-class="has-text-white">
              <b-input
                v-model="presentation.title"
                maxlength="30"
                required
              />
            </b-field>
            <b-field label="Version" custom-class="has-text-white">
              <b-numberinput v-model="presentation.versionNumber" type="is-white" />
            </b-field>
            <b-field label="Version description" custom-class="has-text-white">
              <b-input
                v-model="presentation.description"
                maxlength="100"
                type="textarea"
              />
            </b-field>
            <b-button class="is-success width-100" icon-left="content-save-outline" @click="confirmSave">
              SAVE PRESENTATION
            </b-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, useContext } from '@nuxtjs/composition-api'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'
import { useDialogs } from '~/composable/dialogs'
import { usePresentationRepository } from '~/composable/presentationRepository'
import { PresentationStore, usePresentationStore } from '~/composable/presentationStore'

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
}

export default defineComponent({
  layout: 'editor',

  props: {
    presentationDetails: {
      type: Object as () => PresentationEditable,
      required: true
    }
  },

  setup (props: any) {
    const { params, app: { router } } = useContext()
    const { deleteSlideDialog, overwritePresentationDialog, toHomescreenDialog } = useDialogs()
    const { savePresentation } = usePresentationRepository()
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
      showSlides: false
    })

    function newSlide (): void {
      state.presentation.slides = [
        ...state.presentation.slides.slice(0, state.currentSlide + 1),
        '# Slide\ncontent',
        ...state.presentation.slides.slice(state.currentSlide + 1)]

      state.currentSlide++
    }

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
      deleteSlideDialog(state.presentation.slides, state.currentSlide)
    }

    function switchSlide (index: number): void {
      state.currentSlide = index
      state.showSavePanel = false
    }

    function confirmSave (): void {
      if (state.presentation.versionNumber <= Number(params.value.version)) {
        overwritePresentationDialog(state.presentation)
      } else {
        savePresentation(state.presentation)
      }
    }

    function openPreview (): void {
      presentationStore.savePresentation({ ...state.presentation })
      router?.push('/presentation/new/preview')
    }

    return {
      ...toRefs(state),
      newSlide,
      saveSlideContent,
      deleteSlide,
      confirmSave,
      switchSlide,
      openPreview,
      toHomescreen
    }
  }
})
</script>

<style lang="scss">
</style>
