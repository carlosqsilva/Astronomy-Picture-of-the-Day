<template>

  <div class="modal" :class="{'is-active' : activeModal}">
    <div class="modal-background" @click="toggleModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{info.title}}</p>
        <button class="delete is-large" @click="toggleModal"></button>
      </header>
      <section class="modal-card-body">
        <p class="image is-4by3">
          <img :src="info.url" v-if="!isVideo">
          <iframe :src="info.url"  v-if="isVideo"></iframe>
        </p>
        {{info.explanation}}
        <br>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-light" @click="toggleModal">Close</a>
      </footer>
    </div>
  </div>

</template>

<script>
import Helper from '../helper'

export default {
  name: 'modal',
  data () {
    return {
      info: {},
      activeModal: false
    }
  },

  computed: {
    isVideo: function() {
      return this.info.media_type == "video"
    }
  },

  methods: {
    toggleModal() {
      this.activeModal = !this.activeModal
    }
  },

  created() {
    Helper.bus.$on('info', (info) => {
      this.info = info
      this.toggleModal()
    })
  }

}
</script>

<style scoped>

</style>
