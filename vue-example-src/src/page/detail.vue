<template>
  <div class="detail" v-if="content">
    <example-button text-color="red" text-align="center" @my-click="href('index.html')">返回列表页</example-button>
    <div class="markdown-body" v-html="content"></div>
  </div>
</template>

<script>
  import 'github-markdown-css'
  import CnodeApi from '../service/cnode-api'
  import ExampleButton from '../component/example-button'

  export default {
    components: {
      ExampleButton
    },
    data () {
      return {
        content: null
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        const loading = weui.loading('正在加载...')
        try {
          const id = ued.query('id')
          const {title, content} = await CnodeApi.getDetail(id)
          ued.title(title)
          this.content = content
        } catch (e) {
          weui.alert(e)
        }
        loading.hide()
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail {
    padding: 10px;

    .markdown-body {
      * {
        max-width: 100%;
      }
    }
  }
</style>
