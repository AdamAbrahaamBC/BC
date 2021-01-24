<template>
  <b-collapse v-model="isOpen" :aria-id="presentation.presentationId" class="panel" animation="slide" @open="loadPresentationDetails">
    <template #trigger>
      <div class="panel-heading has-background-primary has-text-white level" role="button" :aria-controls="presentation.presentationId">
        <div class="level mb-0">
          <b-icon :icon="isOpen ? 'chevron-up' : 'chevron-down'" class="mr-3 is-hidden-mobile" />
          <div>
            <strong class="has-text-white">{{ presentation.title }}</strong>
            <b-tag rounded type="is-primary" class="ml-1 has-text-blue border-secondary">
              Latest: v{{ presentation.currentVersion }}
            </b-tag>
            <p class="is-size-7 mt-2 has-text-gray">
              last edited: {{ presentation.lastEdited }}<br>
              click for more...
            </p>
          </div>
        </div>

        <div>
          <b-button
            tag="nuxt-link"
            :to="`/presentation/${presentation.presentationId}/${selectedVersion}`"
            type="is-secondary"
            class="has-text-weight-normal"
            outlined
            icon-right="pencil"
          >
            EDIT
          </b-button>
          <b-button
            tag="nuxt-link"
            :to="`/presentation/${presentation.presentationId}/${selectedVersion}/preview`"
            type="is-secondary"
            class="has-text-weight-normal"
            outlined
            icon-right="eye"
          >
            VIEW
          </b-button>
          <b-button type="is-danger" icon-right="delete" @click.stop="deletePresentation">
            DELETE
          </b-button>
        </div>
      </div>
    </template>
    <div class="panel-block has-background-secondary">
      <SummaryVersionDetails
        v-if="versionDetail"
        :key="versionDetail.number"
        :version-detail="versionDetail"
        :versions="versions"
        @version-changed="selectedVersion = $event"
      />
      <loader v-else />
    </div>
  </b-collapse>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, useContext, computed, ComputedRef } from '@nuxtjs/composition-api'
import { PresentationSummary } from '~/models/presentation/PresentationSummary'
import { PresentationDetail, PresentationVersion } from '~/models/presentation/PresentationDetail'
import { useDialogs } from '~/composable/dialogs'
import SummaryVersionDetails from '~/components/SummaryVersionDetails.vue'

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
    const { app: { $axios } } = useContext()
    const { deletePresentationDialog } = useDialogs()
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
      $axios.get('/presentation', { params: { id: props.presentation.presentationId } })
        .then((response) => {
          state.presentationDetail = response.data
        })
    }

    function deletePresentation (): void {
      deletePresentationDialog(props.presentation.title, props.presentation.presentationId)
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
