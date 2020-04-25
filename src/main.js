import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ZeiUI from '@zeit-ui/vue'
import '@zeit-ui/vue/dist/zeit-ui.css'
import echarts from "echarts";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWeibo } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/iconfont'
import IconSvg from '@/components/IconSvg'


library.add(faWeibo)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('icon-svg', IconSvg)
Vue.use(ZeiUI)
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
