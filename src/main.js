// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
// Vue.use(ElementUI, { locale })
// import VueRouter from 'vue-router'
// import routes from './router/index'

Vue.config.productionTip = false
// Vue.use(VueRouter)
// const router = new VueRouter({
//     routes,
//     strict: process.env.NODE_ENV !== 'production'
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  template: '<App/>',
  components: { App }
})
