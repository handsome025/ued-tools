<template>
  <div class="example-button" :style="{'color': textColor, 'text-align': textAlign}" @click="onClick">
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      textColor: {
        type: String,
        default: '#333'
      },
      textAlign: {
        type: String,
        default: 'center'
      }
    },
    methods: {
      onClick (event) {
        // 发事件可以传参数，也可以不传
        this.$emit('my-click', {
          event, // key 和 value 同名可以省略 vale
          test: Math.random()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .example-button {
    padding: 0.15rem;
    font-size: 0.28rem;
    background: #ccc;
  }
</style>
