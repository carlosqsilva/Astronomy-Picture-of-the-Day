<template>
<div id="app">
  
  <section class="hero is-info is-inverted">
  <!-- Hero header: will stick at the top -->
    <div class="hero-head">
      <header class="nav">
        <div class="container">
          <div class="nav-left">
            <a class="nav-item">
              <img src="https://carlosqsilva.github.io/Astronomy-Picture-of-the-Day/static/img/icons/logo256.png" alt="Nasa APOD">
            </a>
            <!-- <a class="nav-item" >
               by Carlos Silva
            </a> -->
          </div>

          <span class="nav-toggle" :class="{'is-active': navMenu}" @click="navMenu = !navMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div class="nav-right nav-menu" :class="{'is-active': navMenu}">
             <a class="nav-item has-text-white" href="https://github.com/carlosqsilva/Astronomy-Picture-of-the-Day">
              Github
            </a>
            <span class="nav-item">
              <a class="button is-info is-inverted" @click="onSearch">
                Search
              </a>
            </span>
          </div>

        </div>
      </header>
    </div>

 
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title has-text-white">
          Astronomy Picture of the Day
        </h1>
        <h2 class="subtitle has-text-white">
          <span id="typed" style="white-space:pre"></span>
          <span class="typed-cursor">|</span>
        </h2>
      </div>
    </div>

  </section>
 
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
import Search from './components/Search'
import InfiniteLoading from 'vue-infinite-loading'
import Helper from './helper'
import Typed from 'typed.js'


export default {
  name: 'app',

  data() {
    return {
      number: 12,
      dates: [],
      navMenu: false
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
      this.navMenu = false
    },

    onInfinite() {
      const lastDate = this.dates[this.dates.length - 1]
      let newDates = Helper.lastNDays(this.number, lastDate)
      this.dates = this.dates.concat(newDates.slice(1))
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
    },
  },

  mounted(){
    let options ={
      strings: ['by Carlos Silva', 'Images from NASA Apod api'],
      typeSpeed: 120,
      startDealay: 0,
      backSpeed: 80,
      backDelay: 5000,
      showCursor: false,
      loop: true
    }
    let typed = new Typed("#typed", options)
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
.hero{
  background-image: url('./assets/img/bg-hero.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: contrast(1.3);
}
/* .hero .nav-item{
  color: #fff;
}
.hero .nav-item:hover{
  color: #fff;
} */ 
.hero .nav-toggle span{
  background-color: #fff;
}
.hero .nav-toggle:hover span{
  background-color: black;
}
.hero .nav-toggle.is-active{
  background-color: #fff;
}
.hero .nav-toggle.is-active span{
  background-color: black;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.typed-cursor {
  opacity: 1;
  animation: blink 0.7s infinite;
}
</style>
