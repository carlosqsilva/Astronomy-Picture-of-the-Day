<template>
<div id="app">

  <div class="bg-custom">
    <nav class="navbar">
      <div class="container">
        <!-- <div class="navbar-brand">
          <a class="navbar-item">
            <img src="./assets/img/telescope.svg" alt="Bulma: a modern CSS framework based on Flexbox">
          </a>
        </div> -->

        <div class="navbar-end">
          <div class="navbar-item">
              <p class="control">
                <a class="button is-black" @click="onSearch">
                  <span class="icon">
                    <i class="fa fa-search"></i>
                  </span>
                  <span> Search</span>
                </a>
              </p>
          </div>
        </div>
        </div>
    </nav>

    <section class="hero is-dark">
      <div class="container">
        <div class="hero-body">
          <p class="title is-2">
            Nasa Astronomy Pictures of the Day
          </p>
        </div>
      </div>
    </section>

  </div>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-one-quarter" v-for="date in dates">
            <card :date="date" :key="date"></card>
          </div>        
        </div>
      </div>

      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
    </section>

    <search></search>
    <modal></modal>

  </div>
</template>

<script>
import Card from './components/Card'
import Modal from './components/Modal'
import Search from './Components/Search'
import InfiniteLoading from 'vue-infinite-loading'
import Helper from './helper'

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
    this.dates = Helper.lastNDays(this.number, date)

    Helper.bus.$on('input', (input) => {
      console.log("oi")
      this.dates = Helper.lastNDays(input.number, input.startDate)
    })
  },

  methods: {
    onSearch() {
      Helper.bus.$emit('search', true)
    },

    onInfinite() {
      const lastDate = this.dates[this.dates.length - 1]
      let newDates = Helper.lastNDays(this.number, lastDate)
      this.dates = this.dates.concat(newDates.slice(1))
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
    },
  },

  components: {
    Card,
    Modal,
    Search,
    InfiniteLoading,
  }
}
</script>

<style scoped>
.navbar, .hero, .button{
  background-color: rgba(0, 0, 0, 0);
}
.bg-custom{
  background-image: url('https://apod.nasa.gov/apod/image/1512/EnceladusRingsPIA18343.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
