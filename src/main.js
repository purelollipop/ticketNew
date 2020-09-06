import Vue from "vue/dist/vue.esm.js";
// import Vue from "vue";

import iView  from "view-design";
import 'view-design/dist/styles/iview.css';
import store from "./page/store/store";

import App from "./App.vue";
import http from "./utils/request.js";
Vue.prototype.$axios = http;


import router from "./router";


import utilObj from './utils/util.js'
Vue.prototype.$utilObj = utilObj;


import "./registerServiceWorker";
Vue.config.productionTip = false;
Vue.use(iView);


let mainFlag = window.sessionStorage.getItem('RouteFlag')*1;

if(mainFlag) {
    store.dispatch('addRouterMutation','1')
}

//功能完善：浏览器刷新键点击时候，应该做好判断，直接去HeadTemplate页 应该是从 / 到 404；从from to中去解决
router.beforeEach((to,from,next)=>{
    let token = window.sessionStorage.getItem('token');
    if(!token&&to.path!='/sign'){
        next('/sign')
    }else if((to.path!='/HeadTemplate'||to.path=='/sign')&&from.path=='/'){
        if(to.path=='/sign'){
            next()
        }else{
            next('/HeadTemplate')
        }
    }
    else{
        next()
    }
})

new Vue({
    router,
    store,
    render:h=>h(App),
}).$mount("#app")
