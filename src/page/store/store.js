// import Vue from "vue"
import Vue from "vue/dist/vue.esm.js";

import Vuex from "vuex"

import Router from "vue-router";
import router from "../../router";

import http from "../../utils/request.js";

Vue.use(Vuex)
//手工出票页面模块
const artificialModule = {
    namespaced: true,
    state: {
        name: 'name2',
        //日志内容存储载体
        logar: null,
        //缓冲动画开关
        animaFlag: false,
        //拆分弹窗开关
        splitFlag: false,
        // //拆分数据载体
        // splitObj:null,
        //拆分id
        splitId: undefined,
        //    拆分需要用的总金额
        splitCollection: undefined,
        //    记忆查找功能对象
        remenberObj: {
            aircompany_str: null,
            payTime: [],
            flyTime: null,
            ticketTable: null,
            bigNumber: null,
            smartNumber: null,
            big: null,
            smart: null,
            man: null,
            policyCode: null,
            flight: null,
            id: null,
            platformOrder: null,
            //    还有个判断是否在锁定页面的开关？
        }
    },
    mutations: {
        changNameFun(name) {
            this.name = name
        }
    }
}
let storeObj = {
    strict: process.env.NODE_ENV != "production",
    state: {
        user: undefined,
        //主菜单当前所处下标（定义当前是在售前还是售中等~~~）
        mainMenuX: 0,
        //导航栏缓存组件数据集合
        keepNavigationObjStore: [],
        //    二级菜单结构目录
        secondaryMenuObj: [],
        //主菜单主体结构（secondaryMenuObj 只是他的一个下标集合）
        allSecondaryMenuObj: [],
        //基础页面表格内容
        tableName: undefined,
        deletTableName: undefined,
        //登陆人信息
        userInfo:null,
    },
    getters: {
        getmainMenX(state) {

        }
    },
    mutations: {
        //修改state方法
        //导航栏组件缓存 keepalive
        keepNavigationMutation(state, value) {
            //通过value 中传递的flag，来判断此次触发是删除路由还是添加路由
            if (value.flag) {
                //获取url 拿到组件名
                let templateName = value.url.slice(1);
                //将组件名称存入导航栏缓存
                let leng = state.keepNavigationObjStore.length;
                for (let i = 0; i <= leng; i++) {
                    if (state.keepNavigationObjStore[i] === templateName) {
                        break
                    } else if (i == leng) {
                        state.keepNavigationObjStore.push(templateName);
                    }
                }
            } else {
                let leng = state.keepNavigationObjStore.length;
                let TemplateName = value.url.slice(1)
                for (let i = 0; i < leng; i++) {
                    if (state.keepNavigationObjStore[i] === TemplateName) {
                        state.keepNavigationObjStore.splice(i, 1);
                        break
                    }
                }
            }
        },
        deletTableNameMutiation(state, value) {
            state.deletTableName = value;
        },
    },
    actions: {
        //获取并添加路由
        addRouterMutation(context, value) {
            //原始路由 并保函部分固定路由
            let originalRouter = [
                {
                    path: "/sign",
                    name: "sign",
                    component: () => {
                        return import('../sign_in.vue')
                    }
                },
                {
                    path: "*",
                    name: "404",
                    component: () => {
                        return import('../undefinedPage.vue')
                    }
                },
            ];
            let beforeParsingRouter = [];

            let parsingRouter = [];
            //解析后路由 在全部解析好后 会 addRouter
            let afterParsingRouter = [
                {
                    path: "/main",
                    name: "main",
                    component: () => {
                        return import('../main.vue')
                    },
                    children: [
                        {
                            path: '/HeadTemplate',
                            name: 'HeadTemplate',
                            component: resolve => require(['../HeadTemplate'], resolve)
                        },
                    ]
                }
            ];
            //获取当前用户拥有的路由
            http({
                url: 'common/member/menu',
                method: 'get',
                params: {}
            }).then(res => {
                if (!res.data.code) {
                    beforeParsingRouter = res.data.data;
                    //当某个路由中的chldren数组为空的时候，删除该路由的children，
                    //该作用仅仅是为了配合main.vue文件的二级菜单生成。其中children是否有值很重要
                    let delEmptyChild = function (data) {
                        //主菜单最上层总会有children；
                        let leng = data.length;
                        //children的长度为空 就直接把它的children删掉 当main.vue文件生成二级菜单会根据是否有children来做菜单
                        for (let i = 0; i < leng; i++) {
                            if (!data[i].children.length) {
                                delete data[i].children;
                            } else {
                                delEmptyChild(data[i].children)
                            }
                        }
                    };
                    delEmptyChild(beforeParsingRouter);
                    //主菜单的哪一个下属菜单被触发 由state.mainMenuX来控制,
                    //state.secondaryMenuObj用来给main文件生成菜单用
                    context.commit('modifysecondaryMenuObjMutation', beforeParsingRouter[context.state.mainMenuX])
                    parsingRouter = beforeParsingRouter[context.state.mainMenuX];
                    //添加原始路由
                    router.matcher = new Router({
                        // mode: 'history',
                        routes: originalRouter
                    }).matcher;
                    //解析路由表函数  用来解析生成路由动态表的方法
                    let addRouterFun = function (data) {
                        if (data) {
                            let dataLeng = data.length;
                            for (let j = 0; j < dataLeng; j++) {
                                if (data[j].menuBase) {
                                    let url = data[j].url.slice(3);
                                    let path = '/' + data[j].menuName;
                                    let obj = {
                                        path,
                                        name: data[j].title,
                                        component: () => import(`../${url}`),
                                    };
                                    afterParsingRouter[0].children.push(obj)
                                } else if (data[j].url != '/' && data[j].url != '') {
                                    let pathIndex = data[j].url.lastIndexOf('/');
                                    let pathlastIndex = data[j].url.lastIndexOf('.');
                                    let path = data[j].url.slice(pathIndex, pathlastIndex);
                                    let name = data[j].url.slice(pathIndex + 1, pathlastIndex);
                                    let url = data[j].url.slice(3);
                                    let obj = {
                                        path: path,
                                        name: name,
                                        // component: resolve => require(['../'+url], resolve)
                                        component: () => import(`../${url}`),
                                        /*component:()=>{
                                            console.log(url)
                                            return () => import(`../${url}`)
                                        },*/
                                    };
                                    afterParsingRouter[0].children.push(obj)
                                }
                                ;
                                if (data[j].children) {
                                    addRouterFun(data[j].children)
                                }
                            }
                        }
                    };
                    for (let i = 0; i < beforeParsingRouter.length; i++) {
                        if (beforeParsingRouter[i].children) {
                            addRouterFun(beforeParsingRouter[i].children);
                        }
                    }
                    //所有的菜单集合
                    context.commit('modifyallSecondaryMenuObjMutation', JSON.parse(JSON.stringify(beforeParsingRouter)))
                    // addRouterFun(parsingRouter.children);
                    //添加路由表
                    router.addRoutes(afterParsingRouter);
                    //当为true时 跳转到首页统计页面
                    if (value) {
                        //main.js 刷新保证能去首页的开关
                        window.sessionStorage.setItem('RouteFlag', 1)
                        router.push({path: "/HeadTemplate"}, () => {
                        });
                    }
                } else {
                    this.$Message.error({
                        content:res.data.msg,
                        closable:true,
                        duration:15,
                    })
                }
            }).catch(err => {
                alert(err)
                this.$Message.error({
                    content:err,
                    closable:true,
                    duration:15,
                })
            });
        },

        deletTableNameAction(context, value) {
            context.commit('deletTableNameMutiation', value)
            return value
        }
    },
    modules: {
        artificialModule
    }
}
//自动生成修改state方法
//函数名会统一命名 成 modify + state中的变量名 + Mutation
//例如 state 中变量名 叫  QQQ --->  modifyQQQMutation
let modifyObj = [];
let modifyObjFun = {};
for (let i in storeObj.state) {
    modifyObj.push({
        funName: 'modify' + i + 'Mutation',
        name: i
    });
};
for (let i = 0; i < modifyObj.length; i++) {
    modifyObjFun[modifyObj[i].funName] = function (state, value) {
        state[modifyObj[i].name] = value
    }
};
Object.assign(storeObj.mutations, modifyObjFun);
const store = new Vuex.Store(storeObj);

export default store
