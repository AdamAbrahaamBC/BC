<template>
  <b-collapse v-model="isOpen" :aria-id="presentation.presentationId" class="panel" animation="slide" @open="loadPresentationDetails">
    <template #trigger>
      <div class="panel-heading has-background-primary has-text-white level" role="button" :aria-controls="presentation.presentationId">
        <div class="level mb-0">
          <b-icon :icon="isOpen ? 'chevron-up' : 'chevron-down'" class="mr-3 is-hidden-mobile" />
          <div>
            <strong class="has-text-white">{{ presentation.title }}</strong>
            <p class="is-size-7 mt-2 has-text-gray">
              last edited: {{ presentation.lastEdited }}<br>
              <span style="color: #12c9ff">
                click for more...
              </span>
            </p>
          </div>
        </div>

        <div>
          <b-button type="is-danger" icon-right="delete" @click.stop="deletePresentation">
            DELETE
          </b-button>
        </div>
      </div>
    </template>
    <div class="panel-block has-background-secondary">
      <SummaryVersionDetails
        v-if="versionDetail"
        :key="versionDetail.number + versions.length"
        :presentation-id="presentation.presentationId"
        :version-detail="versionDetail"
        :versions="versions"
        @version-changed="selectedVersion = $event"
        @delete-version="deleteVersion"
      />
      <loader v-else />
    </div>
  </b-collapse>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { PresentationSummary } from '~/models/presentation/PresentationSummary'
import { PresentationVersion } from '~/models/presentation/PresentationDetail'
import { useDialogs } from '~/composable/dialogs'
import SummaryVersionDetails from '~/components/SummaryVersionDetails.vue'
import { usePresentationRepository } from '~/composable/presentationRepository'

export default defineComponent({
  components: { SummaryVersionDetails },

  props: {
    presentation: {
      type: Object as () => PresentationSummary,
      required: true
    }
  },

  setup (props: any) {
    const { deletePresentationDialog, deleteVersionDialog } = useDialogs()
    const presentationRepository = usePresentationRepository()

    const isOpen = ref<boolean>(false)
    const selectedVersion = ref<number>(props.presentation.currentVersion)

    const versions = computed<number[]>(() => {
      return presentationRepository.presentationSummaryDetail.value ? presentationRepository.presentationSummaryDetail.value.versions.map((x: PresentationVersion) => x.number) : []
    })

    const versionDetail = computed<PresentationVersion | null | undefined>(() => {
      return presentationRepository.presentationSummaryDetail.value ? presentationRepository.presentationSummaryDetail.value.versions.find((x: PresentationVersion) => x.number === selectedVersion.value) : null
    })

    function loadPresentationDetails (): void {
      presentationRepository.loadPresentationSummaryDetails(props.presentation.presentationId)
    }

    function deletePresentation (): void {
      deletePresentationDialog(props.presentation.title, props.presentation.presentationId)
    }

    function deleteVersion (version: number): void {
      if (versions.value.length === 1) {
        deletePresentation()
        return
      }

      deleteVersionDialog(version, props.presentation.presentationId, presentationRepository)
    }

    return {
      isOpen,
      selectedVersion,
      versions,
      versionDetail,
      loadPresentationDetails,
      deletePresentation,
      deleteVersion
    }
  }
})
</script>

<style scoped>

</style>
