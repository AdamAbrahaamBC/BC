<template>
  <div class="columns is-centered is-vcentered height-100">
    <div class="box has-background-primary" style="width: 50vw">
      <b-field label="Presentation title" custom-class="has-text-white">
        <b-input
          v-model="presentationDetails.title"
          maxlength="30"
          required
          data-test="titleInput"
        />
      </b-field>
      <b-field label="Version description" custom-class="has-text-white">
        <b-input
          v-model="presentationDetails.description"
          maxlength="100"
          type="textarea"
          data-test="descriptionInput"
        />
      </b-field>
      <div class="tile is-ancestor my-0">
        <div class="tile is-parent">
          <b-button v-if="presentationDetails.id" data-test="overwriteButton" outlined class="tile is-child is-success has-text-weight-bold " @click="overwriteVersion">
            OVERWRITE THIS VERSION
          </b-button>
        </div>

        <div class="tile is-parent">
          <b-button data-test="saveNewButton" class="tile is-child is-success has-text-weight-bold " @click="saveNewVersion">
            SAVE AS NEW VERSION
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useDialogs } from '~/composable/dialogs'
import { usePresentationRepository } from '~/composable/presentationRepository'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'

export default defineComponent({
  props: {
    presentation: {
      type: Object as () => PresentationEditable,
      required: true
    }
  },

  emits: ['presentation-changed'],

  setup (props: any, { emit }) {
    const { savePresentation } = usePresentationRepository()
    const { overwritePresentationDialog } = useDialogs()

    const presentationDetails = computed({
      get: () => props.presentation,
      set: value => emit('presentation-changed', value)
    })

    function overwriteVersion (): void {
      overwritePresentationDialog(presentationDetails.value)
    }

    function saveNewVersion (): void {
      presentationDetails.value.versionNumber = presentationDetails.value.id ? presentationDetails.value.versionCount + 1 : 1
      savePresentation(presentationDetails.value)
    }

    return {
      presentationDetails,
      overwriteVersion,
      saveNewVersion
    }
  }
})
</script>

<style scoped>

</style>
