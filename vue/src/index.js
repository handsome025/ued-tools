import Vue from 'vue'
import './filter'
import './mixin'
// import store from './store'
import App from './app'

Vue.config.productionTip = false

new Vue({
  // store,
  el: '#app',
  template: '<App />',
  components: {
    App
  }
})
