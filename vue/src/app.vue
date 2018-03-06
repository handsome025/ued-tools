<template>
  <page />
</template>

<script>
  import User from './service/user'
  import shareLogo from './static/share-logo.png'

  export default {
    components: {
      async Page (resolve) {
        // 判断是否授权
        const userInfo = User.getUserInfo()
        if (ued.isEmpty(userInfo)) {
          User.weixinAuth()
          return
        }

        // 设置微信分享
        ued.weixin.uma()
        // wx.ready(() => wx.hideOptionMenu())
        ued.weixin.share({
          title: '',
          desc: '',
          link: ued.path('index.html'),
          imgUrl: ued.path(shareLogo) // 微信需要完整的图片路径，所以 ued.path() 一下
        })

        // ICC 统计
        ued.track(userInfo.FromUserName)
        ued.trackPage()

        // 异步加载页面
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
