<template>
  <div class="wrap">
    <p class="title">{{title}}</p>
    <p class="random">{{random}}</p>
  </div>
</template>

<script>
  import Api from '../service/api'

  export default {
    data () {
      return {
        title: 'loading...',
        random: Math.random()
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        const loading = weui.loading('正在加载...')
        try {
          this.title = await Api.getHome()
        } catch (e) {
          weui.alert(e)
        }
        loading.hide()
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrap {
    background: #ccc;
  }

  .title {
    text-decoration: underline;
  }

  .random {
    color: #f60;
  }
</style>
