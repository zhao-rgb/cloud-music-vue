import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(MuseUI)
Vue.config.productionTip = false

import global_ from '@/utils/Global'
Vue.prototype.GLOBAL = global_

// 路由导航守卫，当路由发生变化的时候，我们想要做的事情，这就是导航守卫的重点
// router.beforeEach((to, from, next) => {
//   if (window.localStorage.getItem('admin')) {
//     store.commit('refreshAdmin', JSON.parse(window.localStorage.getItem('admin')))
//   }

//   if (window.localStorage.getItem('menuList')) {
//     store.commit('refreshMenuList', JSON.parse(window.localStorage.getItem('menuList')))
//   }
//   let token = localStorage.getItem('token')
//   let isLogin
//   if (!token) {
//     isLogin = false
//   } else {
//     isLogin = true
//   }
//   if (!isLogin) {
//     if (to.path !== '/login') {
//       return next({ path: '/login' })
//     } else {
//       next()
//     }
//   } else {
//     if (to.path === '/login') {
//       return next({ path: '/' })
//     }
//     next()
//   }
// })

//全局请求拦截
axios.interceptors.request.use((config) => {
  //请求的接口不是登录和验证码接口
  if (['/sysAdmin/login', '/captcha'].indexOf(config.url) === -1) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
      config.headers.id = 'DE35D7CC05AF96A21D7ADFC8651E6614'
    }
  }
  return config
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
