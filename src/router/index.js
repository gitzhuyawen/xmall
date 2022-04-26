import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Goods from '@/views/Goods'
import Thanks from '@/views/Thanks'
import GoodsDetail from '@/views/GoodsDetail'
import User from '@/views/User'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect:'/home',
    name: 'home',
    component: Index,
    children:[
      {
        path:"home",
        component:Home
      },{
        path:"goods",
        component:Goods
      },{
        path:"thanks",
        component:Thanks
      },{
        path:'goodsDetail',
        name:'goodsDetail',
        component: GoodsDetail
      }
     
    ]
      
    
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/user',
    name:'user',
    component:User,
    meta:{
      //需要守卫
      auth:true
    }
  }
 
]

const router = new VueRouter({
  routes
})

export default router
