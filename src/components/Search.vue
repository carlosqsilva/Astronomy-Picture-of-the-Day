<template>
  <transition name="fadeInDown">

    <div class="modal is-active" v-if="activeModal">
      <!-- <div class="modal-background" @click="toggleModal"></div> -->
      <div class="modal-content">

        <div class="card">
          <header class="modal-card-head">
            <p class="modal-card-title">Search by Date</p>
            <button class="delete is-large" @click="toggleModal"></button>
          </header>

          <div class="card-content">

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">From</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input class="input" type="text" placeholder="Start Date YYYY-MM-DD" v-model:value="info.startDate">
                    <span class="icon is-small is-left">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
             <div class="field-label is-normal">
              <label class="label">To</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input" type="number" placeholder="How many days" v-model:value="info.number">
                  <span class="icon is-small is-left">
                    <i class="fa fa-calendar"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <!-- Left empty for spacing -->
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button class="button is-primary" @click="search">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
    <button class="modal-close is-large"></button>
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
