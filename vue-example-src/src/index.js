import Vue from 'vue'
import './mixin'
import App from './app'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App />',
  components: {
    App
  }
})
