<template>
  <div class="list">
    <!-- 小文件会内联 base64，大文件才会产出文件（自动处理的） -->
    <img class="logo" src="../static/logo.png" alt="">
    <div class="item" v-for="item in list" :key="item.id">
      <example-button :text-color="randomColor" text-align="left" @my-click="href('detail.html', {id: item.id})">
        <span>{{item.create_at | formatCreateAt}}</span>{{item.title}}
      </example-button>
    </div>
  </div>
</template>

<script>
  import CnodeApi from '../service/cnode-api'
  import ExampleButton from '../component/example-button'

  export default {
    components: {
      ExampleButton
    },
    data () {
      return {
        list: [],
        randomColor: `#${(Math.random() * 0xffffff << 0).toString(16)}`
      }
    },
    mounted () {
      ued.title('cnode list')
      this.getData()
    },
    methods: {
      async getData () {
        const loading = weui.loading('正在加载...')
        try {
          this.list = await CnodeApi.getList()
        } catch (e) {
          weui.alert(e)
        }
        loading.hide()
      }
    },
    filters: {
      formatCreateAt (value) {
        return value.substr(0, 10)
      }
    }
  }
</script>

<style lang="less" scoped>
  .list {
    padding: 10px;
    font-size: 0.28rem;
  }

  .logo {
    height: 0.4rem;
  }

  .item {
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 10px;

    span {
      font-size: 0.24rem;
      padding: 5px;
      background: #ccc;
    }
  }
</style>
