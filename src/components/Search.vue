<template>
  <transition name="fadeInDown">

    <div class="modal is-active" v-if="activeModal">
      <div class="modal-background" @click="toggleModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Search By Date</p>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          
          <div class="field">
            <label class="label">From</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: 2016-06-20" v-model="info.startDate">
            </div>
          </div>

          <div class="field">
            <label class="label">How many days</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: 20" v-model="info.number">
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <a class="button is-success" @click="search">Search</a>
          <a class="button" @click="toggleModal">Close</a>
        </footer>
      </div>
    </div>

  </transition>
</template>

<script>
import Helper from '../helper'

export default {
  name: 'search',
  data () {
    return {
      info: {
        startDate: '2016-05-06',
        number: 20,  
      },
      activeModal: false
    }
  },

  methods: {
    search() {
      Helper.bus.$emit('input', this.info)
      this.toggleModal()
    },

    toggleModal() {
      this.activeModal = !this.activeModal
    }
  },

  created() {
    Helper.bus.$on('search', (args) => {
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
