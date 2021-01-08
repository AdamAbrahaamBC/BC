<template>
  <div class="columns mx-0 px-0" style="width: 100%">
    <div class="column is-4">
      <b-carousel
        v-model="currentSlide"
        class="box carouselSlide px-1 py-1"
        animated="slide"
        :repeat="false"
        :autoplay="false"
        :indicator="false"
        :pause-info="false"
        :progress="true"
      >
        <b-carousel-item v-for="(slide, i) in versionDetail.slides" :key="i">
          <viewer :initial-value="slide" />
        </b-carousel-item>
      </b-carousel>
    </div>
    <div class="column is-6">
      <div class="is-flex">
        <strong>Versions:</strong>
        <b-field>
          <b-radio-button
            v-for="version in versions"
            :key="version"
            v-model="selectedVersion"
            :native-value="version"
            type="is-success"
            size="is-small"
            class="ml-2"
            @input="$emit('version-changed', selectedVersion)"
          >
            <b-icon v-if="version === versionDetail.number" icon="circle-medium" />
            <span>v{{ version }}</span>
          </b-radio-button>
        </b-field>
      </div>
      <br>
      <div>
        <strong>Description:</strong>
        <br>
        {{ versionDetail.description ? versionDetail.description : 'This version has no description!' }}
      </div>
    </div>
    <div class="column is-2">
      <b-button type="is-danger float-right" expanded icon-right="delete" @click.stop="deletePresentation">
        DELETE v{{ selectedVersion }}
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { PresentationVersion } from '../models/presentation/PresentationDetail'

export default defineComponent({
  props: {
    versionDetail: {
      type: Object as () => PresentationVersion,
      required: true
    },
    versions: {
      type: Array as () => string[],
      required: true
    }
  },

  setup (props) {
    const currentSlide = ref(0)
    const selectedVersion = ref(props.versionDetail.number)

    return {
      currentSlide,
      selectedVersion
    }
  }
})
</script>

<style scoped>

</style>
