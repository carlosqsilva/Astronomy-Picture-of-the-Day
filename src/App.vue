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

                    <svg width="100px" height="100px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M15.7,13.3 L11.89,9.47 C12.59,8.49 13,7.3 13,6 C13,2.69 10.31,0 7,0 C3.69,0 1,2.69 1,6 C1,9.31 3.69,12 7,12 C8.3,12 9.48,11.59 10.47,10.89 L14.3,14.7 C14.49,14.9 14.75,15 15,15 C15.25,15 15.52,14.91 15.7,14.7 C16.09,14.31 16.09,13.68 15.7,13.29 L15.7,13.3 Z M7,10.7 C4.41,10.7 2.3,8.59 2.3,6 C2.3,3.41 4.41,1.3 7,1.3 C9.59,1.3 11.7,3.41 11.7,6 C11.7,8.59 9.59,10.7 7,10.7 L7,10.7 Z" fill="#FFFFFF"></path></svg>

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
.button:hover{
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
  background-image: url('./assets/img/planets.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: contrast(1.3);
}
.bg-custom:hover{
  animation: slideDown 20s linear infinite alternate;
}
</style>
