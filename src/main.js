import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import echarts from 'echarts'
// import './plugins/socket.js'
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false




new Vue({
  render: h => h(App),
}).$mount('#app')
