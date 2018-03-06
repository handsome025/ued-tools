# vue

```
# 安装
npm i

# 开发（开发产生的文件是在内存中的，仅用于调试，请忽略其体积大小，build 之后为准）
npm run dev

# 提交 svn 之前执行
npm run build
```

下面列举了你需要了解的知识：

本项目修改自 https://github.com/vuejs/vue-cli 的 webpack 工程，由单页改成多页，去掉了 vue-router

【必须】Webpack 文档: https://webpack.js.org/

【必须】Vue 文档: https://cn.vuejs.org/

【必须】常用 ES6(7) 语法整理: https://github.com/icatholiccloud/frontend/issues/3

Vue DevTools（Chrome 扩展）: https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

Vuex （状态管理）: https://vuex.vuejs.org/zh-cn/

Vue Router （客户端路由）: https://router.vuejs.org/zh-cn/ （我们产出多页没有使用它，单页才需要，但是你需要自行学习了解）

Nuxt.js （Vue 服务端渲染方案，支持动态渲染和静态化，可以满足 SEO 搜索引擎优化需求）: https://github.com/nuxt/nuxt.js

Vue 大量资源合集 https://github.com/vuejs/awesome-vue

---

请打开 `config/index.js` 中 `build` 字段，根据相关注释来修改路径，默认是生成在 `dist` 目录下的。
为了路径好看建议把本目录命名为 xxx-src，生成的代码放在同级目录的 xxx，
发布到线上时，只需要发布 xxx 目录，不需要发布 xxx-src
（参考 vue-example-src 的做法）

了解 `require`、`import x from 'x'`、`import()` 三者的区别

增加项目依赖 `npm i 库名`， 代码中 `import hello from 'hello'` 即可

`*.vue` 文件中的 `<style>` 私有样式请务必加 `scoped` 属性，保证样式不冲突。
如果是写在 html, body 上的样式，需要单独给一个不带 scoped 的 `<style>`

使用 `async`、`await` 代替 `then` 写异步代码

`src/static` 打包资源

`static` 不打包资源（会自动拷贝到 你配置的dist/static/ 中）

`src/store` 存放 vuex store，这个功能是可选的（如果你懂得怎么使用的话，在 src/index.js 打开注释即可）

---

为了加速打包，`src/template.html` 中直接引入了以下库，可以根据具体项目的情况增减
- weui（js 、css）
- babel-polyfill（对 es2015 的兼容代码，如果你没有使用新的 API，可以删掉）
- ued（包含了 jquery 3.x, jweixin 1.3.0，和 ued.js）
