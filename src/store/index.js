import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login:false,//是否登陆
    userInfo:null,//用户信息
    cartList:[],//加入购物车信息
    showCart:false,
    id:Number,
    car:false
  },
  getters: {
  }, 


  mutations: {
    SHOWCART(state,id){
      state.login=true
      state.id=id 
    },
    derser(state,data){
      state.cartList.push(data)
    },
    carser(state,da){
      state.car=da
    }
  },
  actions: {
  },
  modules: {
  }
})
