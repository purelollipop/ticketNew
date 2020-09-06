import search from '../domestic/aritificial/ArtificialSearch.vue'
import memory from '../domestic/aritificial/MemoryChoose.vue'
import Vue from "vue";


const components = {
    search,
    memory
}

const aritificialInstall = function (Vue) {
    for (let key in components) {
        Vue.component(components[key].name, components[key])
    }
}

// if (typeof window !== 'undefined' && window.Vue) {
//     install(Window.vue)
// }

// components.install = install
// install(Vue)
export default  aritificialInstall