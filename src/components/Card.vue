<template>

    <div class="card">
      <div class="card-image" @click="onLearMore" :title="info.title">
        <figure class="image is-4by3">
          <img :src="info.url" v-if="!isVideo" alt="Image">
          <iframe :src="info.url"  v-if="isVideo" type="text/html" ></iframe>
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <!-- <div class="media-left">
            <a href="">Learn More...</a>
          </div> -->
          <div class="media-content">
            <p class="title is-5">{{ info.title }}</p>
            <p class="subtitle is-6">Copyright: {{ info.copyright || "Public Domain"}}</p>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import Helper from '../helper'

export default {
  name: 'card',
  props: ['date'],
  data () {
    return {
      api: "https://api.nasa.gov/planetary/apod?api_key=ah6ryJzZ2uRaCXQcxpk5wzMyDKpxfJ6hltz4DbdY&hd=true&date=",
      isLoading: true,
      isVideo: false,
      info: {},
    }
  },

  methods: {
    onLearMore(){
      Helper.bus.$emit('info', this.info)
    }
  },

  created() {
    let url = this.api + this.date
    let vm = this
    fetch(url)
      .then(response => response.json())
      .then(obj => {
        if(obj.media_type == "video"){
          vm.isVideo = true
        }
        vm.info = obj
      })
  }
}
</script>

<style scoped>
.image.is-4by3 iframe{
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>
