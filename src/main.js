import Vue from 'vue'
import App from './App.vue'  
import './plugins/element.js'
import router from './router'
import store from './store'
import {Button,Input,Breadcrumb,BreadcrumbItem,carousel,CarouselItem} from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import axios from 'axios'
Vue.prototype.$http=axios

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.auth)){
    next({
      path:'/Login',
      query:{
        redirect:to.fullPath
      }
    })
  }else{
    next();
  }
})

Vue.use(Button) //使用elementUI
Vue.use(Input)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(carousel)
Vue.use(CarouselItem)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
