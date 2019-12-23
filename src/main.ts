import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
// import VueSocketIO from 'vue-socket.io'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style/cssreset.css'
import '@/assets/style/base.scss'

import Dialog from '@/components/dialog.vue'
import Table from '@/components/Table.vue'
import Search from '@/components/Search.vue'

Vue.component('Dialog', Dialog)
Vue.component('cmTable', Table)
Vue.component('Search', Search)

Vue.config.productionTip = false


Vue.use(ElementUI);
// Vue.use(new VueSocketIO({
//   connection: 'http://127.0.0.1:3000'
// }))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
