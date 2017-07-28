<template>
<div id="app">

  <div class="bg-custom">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-end">
          <div class="navbar-item">
              <p class="control">
                <a class="button is-black" @click="onSearch">
                  <span class="icon">
                    <!-- <i class="fa fa-search"></i> -->

                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 53.627 53.627" style="enable-background:new 0 0 53.627 53.627;" xml:space="preserve" width="200px" height="200px"> <path d="M53.627,49.385L37.795,33.553C40.423,30.046,42,25.709,42,21C42,9.42,32.58,0,21,0S0,9.42,0,21s9.42,21,21,21  c4.709,0,9.046-1.577,12.553-4.205l15.832,15.832L53.627,49.385z M2,21C2,10.523,10.523,2,21,2s19,8.523,19,19s-8.523,19-19,19  S2,31.477,2,21z M35.567,36.093c0.178-0.172,0.353-0.347,0.525-0.525c0.146-0.151,0.304-0.29,0.445-0.445l14.262,14.262  l-1.415,1.415L35.123,36.537C35.278,36.396,35.416,36.238,35.567,36.093z" fill="#FFFFFF"/> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>

                  </span>
                  <span>Search</span>
                </a>
              </p>
          </div>
        </div>
        </div>
    </nav>

    <section class="hero is-dark">
      <div class="container">
        <div class="hero-body">
          <p class="title is-2">Nasa Astronomy Pictures of the Day</p>
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
      number: 12,
      dates: [],
    }
  },

  created(){
    let d = new Date()
    let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    this.dates = Helper.lastNDays(this.number, date)

    Helper.bus.$on('input', (input) => {
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
.section{
  background-color: rgba(0, 0, 0, 0.05);
}
.navbar, .hero, .button{
  background-color: rgba(0, 0, 0, 0);
}
@keyframes slideDown {
  from {
    background-position: center top;
  }

  to {
    background-position: center bottom;
  }
}
.bg-custom{
  background-image: url('../assets/img/planets.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: contrast(1.3);
}
.bg-custom:hover{
  animation: slideDown 20s linear infinite alternate;
}
</style>
