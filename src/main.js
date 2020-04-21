import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ZeiUI from '@zeit-ui/vue'
import '@zeit-ui/vue/dist/zeit-ui.css'
import echarts from "echarts";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWeibo } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faWeibo)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(ZeiUI)
Vue.prototype.$echarts = echarts;


Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
