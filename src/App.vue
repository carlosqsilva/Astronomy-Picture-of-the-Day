<template>
  <div id="app">
    <section class="hero is-dark" id="hero">
      <div class="hero-body">
        <div class="container">

          <h1 class="title is-1">
          Nasa Astronomy Pictures of the Day
          </h1>

          <!-- <h2 class="subtitle">
            Hero subtitle
          </h2>     --> 

        </div>
      </div>
    </section>

    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-one-quarter" v-for="(date, index) in dates">
            <card :date="date" :key="index"></card>
        </div>        
      </div>

      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
    </section>

    <modal></modal>

  </div>
</template>

<script>
import Card from './components/Card'
import Modal from './components/Modal'
import InfiniteLoading from 'vue-infinite-loading'
import helper from './helper'

export default {
  name: 'app',

  data() {
    return {
      number: 20,
      dates: [],
    }
  },

  created(){
    let d = new Date()
    let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    this.dates = helper.lastNDays(this.number, date)
  },

  methods: {
    onInfinite() {
      const lastDate = this.dates[this.dates.length - 1]
      let newDates = helper.lastNDays(this.number, lastDate)
      this.dates = this.dates.concat(newDates.slice(1))
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
    },
  },

  components: {
    Card,
    Modal,
    InfiniteLoading,
  }
}
</script>

<style scoped>
#hero{
  background-image: url('https://apod.nasa.gov/apod/image/1512/EnceladusRingsPIA18343.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
