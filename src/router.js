import Vue from "vue/dist/vue.esm.js";

// import Vue from "vue";
import Router from "vue-router";
Vue.use(Router)

let a = [
  {
    path: "/sign",
    name: "sign",
    component: ()=>{
      return import('./page/sign_in.vue')
    },
  },
  {
    path: "*",
    name: "404",
    component: () => {
      return import('./page/undefinedPage.vue')
    }
  },

];

export default new Router({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes: a,

});


//拦截器，响应时若token失效，跳转sign页面
//         // this.$axios.interceptors.request.use(config=>{
//         //     console.log('xiangying')
//         //     //this.router.replace
//         //     return config
//         // },(err)=>{
//         //     console.log(err)
//         // })