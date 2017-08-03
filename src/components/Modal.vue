<template>
<transition name="fadeInDown">
  <div class="modal is-active" v-if="activeModal">
    <div class="modal-background" @click="toggleModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{info.title}}</p>
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
        <a class="button" @click="toggleModal">Close</a>
      </footer>
    </div>
  </div>
</transition>
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
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
.fadeInDown-enter-active {
  animation: fadeInDown .5s;
}
.fadeInDown-leave-active {
  animation: fadeInDown .5s reverse;
}
</style>
