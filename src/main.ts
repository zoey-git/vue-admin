import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style/cssreset.css'
import '@/assets/style/base.scss'

import Dialog from '@/components/dialog.vue'

Vue.component('Dialog', Dialog)

Vue.config.productionTip = false


Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
