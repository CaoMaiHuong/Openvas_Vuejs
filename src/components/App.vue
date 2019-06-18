<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'App',
    data () {
      return {
        section: 'Head'
      }
    },
    created() {
      const token = localStorage.getItem('name')
      if (!token) {
        this.$router.push('/login')
      }
    },
    methods: {
      logout () {
        // this.$store.commit('SET_USER', null)
        // this.$store.commit('SET_TOKEN', null)
        axios({
          method: 'get',
          url: 'http://112.137.129.225:9009/logout'
        }).then(response => {
          this.$router.push('/login')
        })

        // if (window.localStorage) {
        //   window.localStorage.setItem('user', null)
        //   window.localStorage.setItem('token', null)
        // }

        // this.$router.push('/login')
      }
    }
  }
</script>
