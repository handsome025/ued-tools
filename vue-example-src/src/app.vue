<template>
  <page />
</template>

<script>
  export default {
    components: {
      async Page (resolve) {
        resolve(await import(`./page/${document.documentElement.dataset.page}.vue`))
      }
    }
  }
</script>

<style lang="less">
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    outline: 0;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-size: 0.32rem;
  }

  li {
    list-style: none;
  }

  html,
  body {
    height: 100%;
  }
</style>
