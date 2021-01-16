<template>
  <div class="columns is-centered is-vcentered height-100">
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
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>
