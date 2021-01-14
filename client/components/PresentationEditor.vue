<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        open
        position="static"
        :type="showSidebar ? 'is-primary' : 'is-secondary'"
        :fullheight="true"
        :overlay="false"
        :reduce="!showSidebar"
      >
        <div v-if="showSidebar">
          <div class="menu mx-3 pt-2">
            <b-button class="tile is-child" outlined size="is-large" type="is-primary" @click="showSidebar = false">
              <b-icon
                size="is-large"
                icon="chevron-left"
                type="is-blue"
              />
            </b-button>
            <div class="tile">
              <b-button class="is-success width-100" icon-left="content-save-outline" @click="openSavePanel">
                SAVE
              </b-button>
            </div>
            <div class="tile is-ancestor my-0">
              <div class="tile is-parent is-8">
                <b-button class="tile is-child" outlined type="is-secondary" @click="newSlide">
                  <b-icon
                    icon="card-plus-outline"
                    type="is-blue"
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
              <div class="box presentation-slide px-1 py-1" style="cursor: pointer" @click="switchSlide(index)">
                <viewer :initial-value="slide" />
              </div>
            </div>
          </draggable>
        </div>
        <b-button
          v-else
          class="tile is-child"
          size="is-large"
          type="is-secondary"
          @click="showSidebar = true"
        >
          <b-icon
            size="is-large"
            icon="chevron-right"
            type="is-primary"
          />
        </b-button>
      </b-sidebar>

      <div :class="{'pl-6': showSidebar}" class="pr-6 py-6 width-100 has-background-secondary">
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
import { DialogProgrammatic as dialog, ToastProgrammatic as Toast } from 'buefy'
import { PresentationEditable } from '../models/presentation/PresentationEditable'

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
  showSidebar: boolean
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
    const { app, params } = useContext()
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
      showSidebar: true
    })

    function newSlide (): void {
      state.presentation.slides.splice(state.currentSlide + 1, 0, '# Slide\ncontent')
      state.currentSlide++
    }

    function saveSlideContent (): void {
      const content = state.editorRef.invoke('getMarkdown')
      state.presentation.slides[state.currentSlide] = content
    }

    function deleteSlide (): void {
      dialog.confirm({
        title: 'Deleting slide',
        message: 'Are you sure you want to <b>delete</b> this slide? This action cannot be undone.',
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          state.presentation.slides.splice(state.currentSlide, 1)
          state.currentSlide = state.currentSlide >= state.presentation.slides.length ? state.presentation.slides.length - 1 : state.currentSlide
        }
      })
    }

    function openSavePanel (): void {
      state.currentSlide = null
      state.showSavePanel = true
    }

    function switchSlide (index: number): void {
      state.currentSlide = index
      state.showSavePanel = false
    }

    function confirmSave (): void {
      if (state.presentation.versionNumber <= Number(params.value.version)) {
        dialog.confirm({
          title: 'Overwriting changes',
          message: 'This version is already saved. Are you sure you want to <b>overwright</b> it? This action cannot be undone.',
          confirmText: 'Save',
          type: 'is-warning',
          hasIcon: true,
          onConfirm: () => {
            savePresentation()
          }
        })
      } else {
        savePresentation()
      }
    }

    function savePresentation (): void {
      app.$axios.post('/presentation', { presentation: state.presentation })
      Toast.open({ message: 'Successfully saved!', type: 'is-sucess', position: 'is-bottom' })
    }

    return {
      ...toRefs(state),
      newSlide,
      saveSlideContent,
      deleteSlide,
      confirmSave,
      openSavePanel,
      switchSlide
    }
  }
})
</script>

<style lang="scss">
</style>
