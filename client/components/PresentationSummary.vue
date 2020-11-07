<template>
  <b-collapse v-model="isOpen" :aria-id="presentation.presentationId" class="panel" animation="slide">
    <div slot="trigger" class="panel-heading has-background-secondary has-text-white level" role="button" :aria-controls="presentation.presentationId">
      <div class="level mb-0">
        <b-icon :icon="isOpen ? 'chevron-up' : 'chevron-down'" class="mr-3 is-hidden-mobile" />
        <div>
          <strong class="has-text-white">{{ presentation.title }}</strong>
          <p class="is-size-7 mt-1">
            last edited: {{ presentation.lastEdited }}<br>
            more info...
          </p>
        </div>
      </div>
      <div>
        <nuxt-link :to="`/presentation/${presentation.presentationId}`" @click.stop>
          <b-button type="is-success" icon-right="pencil">
            EDIT
          </b-button>
        </nuxt-link>
        <nuxt-link :to="`/presentation/${presentation.presentationId}/preview`" @click.stop>
          <b-button type="is-success" icon-right="eye" @click.stop="">
            VIEW
          </b-button>
        </nuxt-link>
        <b-button type="is-danger" icon-right="delete" @click.stop="">
          DELETE
        </b-button>
      </div>
    </div>
    <div class="panel-block has-background-white">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br>
      Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br>
      Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
    </div>
  </b-collapse>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, useContext } from '@nuxtjs/composition-api'
import { PropType } from 'vue'
import { PresentationSummary } from '../models/presentation/PresentationSummary'

export default defineComponent({
  props: {
    presentation: Object as PropType<PresentationSummary>
  },

  setup (props) {
    const { app } = useContext()
    const state = reactive({
      isOpen: false
    })

    function loadPresentationDetails (): void {
      app.$axios.get('/presentation', {
        params: {
          id: props.presentation.presentationId
        }
      }).then((response) => {

      })
    }

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>
