<template>
  <div class="columns mx-0 px-0 py-3" style="width: 100%">
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
      <div>
        <strong>Versions:</strong><br>
        <span v-for="version in versions" :key="version" class="mr-2" @click="versionChanged(version)">
          <b-tag
            :type="version === versionDetail.number ? 'is-blue' : 'is-secondary'"
            :class="version === versionDetail.number ? 'has-text-primary' : 'has-text-primary'"
            size="is-medium"
            class="border-primary clickable"
          >
            v{{ version }}
          </b-tag>
        </span>
      </div>
      <br>
      <div>
        <strong>Description:</strong>
        <br>
        {{ versionDetail.description ? versionDetail.description : "This version has no description!" }}
      </div>
    </div>
    <div class="column is-2">
      <b-button
        type="is-danger float-right"
        expanded
        icon-right="delete"
        @click.stop="deletePresentation"
      >
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
      type: Array as () => number[],
      required: true
    }
  },
  emits: ['version-changed'],

  setup (props, { emit }) {
    const currentSlide = ref(0)
    const selectedVersion = ref(props.versionDetail.number)

    const versionChanged = (newValue: number) => {
      if (newValue !== selectedVersion.value) {
        emit('version-changed', newValue)
        currentSlide.value = 0
      }
    }

    return {
      currentSlide,
      selectedVersion,
      versionChanged
    }
  }
})
</script>

<style scoped>
</style>
