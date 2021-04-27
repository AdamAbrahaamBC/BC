<template>
  <div class="has-text-centered">
    <b-tooltip
      label="Home"
      type="is-secondary"
      position="is-bottom"
      class="my-5"
    >
      <b-button
        size="is-large"
        class="is-primary"
        @click="$emit('to-homescreen')"
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
        @click="$emit('toggle-save-panel')"
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
        @click="$emit('open-preview')"
      >
        <b-icon
          size="is-medium"
          icon="eye"
          type="is-primary"
        />
      </b-button>
    </b-tooltip>
    <b-tooltip
      label="Export"
      type="is-secondary"
      position="is-bottom"
      class="my-5"
    >
      <b-button
        size="is-large"
        type="is-blue"
        @click="$emit('download')"
      >
        <b-icon
          size="is-medium"
          icon="download"
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
        @click="$emit('show-slides')"
      >
        <b-icon
          size="is-medium"
          icon="buffer"
        />
      </b-button>
    </b-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  emits: ['to-homescreen', 'toggle-save-panel', 'open-preview', 'show-slides', 'download'],

  setup () {
    return {}
  }
})
</script>

<style scoped>

</style>
