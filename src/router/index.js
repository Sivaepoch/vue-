import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index/index'
import shoplist from '@/page/shoplist/list'
import shopdetail from '@/page/shopdetail/shopdetail'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path:'',
  		redirect:'/index'
  	},
    {
      path: '/index',
      component: index
    },
    {
      path: '/shoplist',
      component: shoplist
    },
    {
      path: '/shopdetail',
      component: shopdetail
    }
  ]
})
