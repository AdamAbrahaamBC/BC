<template>
  <b-collapse v-model="isOpen" :aria-id="presentation.presentationId" class="panel" animation="slide" @open="loadPresentationDetails">
    <template #trigger>
      <div class="panel-heading has-background-primary has-text-white level" role="button" :aria-controls="presentation.presentationId">
        <div class="level mb-0">
          <b-icon :icon="isOpen ? 'chevron-up' : 'chevron-down'" class="mr-3 is-hidden-mobile" />
          <div>
            <strong class="has-text-white">{{ presentation.title }}</strong>
            <b-tag rounded outlined type="is-success">
              v{{ presentation.currentVersion }}
            </b-tag>
            <p class="is-size-7 mt-2 has-text-blue">
              last edited: {{ presentation.lastEdited }}<br>
              more info...
            </p>
          </div>
        </div>
        <div>
          <nuxt-link :to="`/presentation/${presentation.presentationId}/${selectedVersion}`" @click.stop>
            <b-button type="is-success" icon-right="pencil">
              EDIT
            </b-button>
          </nuxt-link>
          <nuxt-link :to="`/presentation/${presentation.presentationId}/${selectedVersion}/preview`" @click.stop>
            <b-button type="is-success" icon-right="eye" @click.stop="">
              VIEW
            </b-button>
          </nuxt-link>
          <b-button type="is-danger" icon-right="delete" @click.stop="deletePresentation">
            DELETE
          </b-button>
        </div>
      </div>
    </template>
    <div class="panel-block has-background-secondary">
      <SummaryVersionDetails v-if="versionDetail" :version-detail="versionDetail" :versions="versions" @version-changed="selectedVersion = $event" />
      <loader v-else />
    </div>
  </b-collapse>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, useContext, computed, ComputedRef } from '@nuxtjs/composition-api'
import { DialogProgrammatic as dialog } from 'buefy'
import { PresentationSummary } from '../models/presentation/PresentationSummary'
import { PresentationDetail, PresentationVersion } from '../models/presentation/PresentationDetail'
import SummaryVersionDetails from '../components/SummaryVersionDetails.vue'

interface State {
  isOpen: boolean
  presentationDetail: PresentationDetail | null
  selectedVersion: number
  versionDetail: ComputedRef<PresentationVersion | null>
  versions: ComputedRef<number[]>
}

export default defineComponent({
  components: { SummaryVersionDetails },

  props: {
    presentation: {
      type: Object as () => PresentationSummary,
      required: true
    }
  },

  setup (props: any) {
    const { app } = useContext()
    const state: any = reactive<State>({
      isOpen: false,
      presentationDetail: null,
      selectedVersion: props.presentation.currentVersion,
      versionDetail: computed<PresentationVersion | null>(() => {
        return state.presentationDetail ? state.presentationDetail.versions.find((x: PresentationVersion) => x.number === state.selectedVersion) : null
      }),
      versions: computed<number[]>(() => {
        return state.presentationDetail ? state.presentationDetail.versions.map((x: PresentationVersion) => x.number) : []
      })
    })

    function loadPresentationDetails (): void {
      app.$axios.get('/presentation', { params: { id: props.presentation.presentationId } })
        .then((response) => {
          state.presentationDetail = response.data
        })
    }

    function deletePresentation (): void {
      dialog.prompt({
        title: 'Deleting presentation',
        message: `Are you sure you want to <b>delete</b> this presentation? This action cannot be undone.\nTo delete type <b>${props.presentation.title}</b> below.`,
        inputAttrs: {
          placeholder: props.presentation.title
        },
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        closeOnConfirm: false,
        onConfirm: async (value, { close }) => {
          if (value === props.presentation.title) {
            close()
            await app.$axios.delete('/presentation', { params: { id: props.presentation.presentationId } })
          }
        }
      })
    }

    return {
      ...toRefs(state),
      loadPresentationDetails,
      deletePresentation
    }
  }
})
</script>

<style scoped>

</style>
