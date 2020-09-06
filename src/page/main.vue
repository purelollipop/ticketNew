<template>
    <div id="wrap">
        <!--左菜单栏包裹层-->
        <div id="a">
            <!--用户/登陆人-->
            <div class="lander">
                <div>{{user}}</div>
                <div>
                    <Icon type="md-build" size="14" @click="changePassword"/>
                    <Icon type="md-power" size="14" @click="refundAccount"/>
                </div>
            </div>
            <!--二级菜单-->
            <div class="menu" v-show="flag">
                <div class="menu_div"  v-for="(ele) in tableObj" :key="ele.id">
                    <!--一级菜单标题-->
                    <div class="menu_title">
                        <Icon :type=ele.icon size="22" style="line-height: 22px;flex-grow:0;margin-right: 6px"/>
                        <div class="menu_titleB" style="flex-grow:1;padding-left:10px;display: inline-block;margin-left: 4px" v-if="ele.children">{{ele.title}}</div>
                        <router-link
                                v-if="!ele.children"
                                tag="div"
                                class="menu_ul_li"
                                style="display: inline-block"
                                :to={path:ele.url,query:ele.query}
                                :data-url="ele.url"
                                @click.native="addPath(ele)"
                        >{{ele.title}}</router-link>
                        <Icon type="ios-arrow-back" class="menu_title_Icon" v-if="ele.children"/>
                    </div>
                    <!--一级菜单子目录 即二级菜单-->
                    <div class="menu_ul" v-if="ele.children">
                        <ul>
                            <li v-for="(elem) in ele.children" :key="elem.id" class="menu_ul_li_css">
                                <!--<Icon class="menu_ul_li_Icon"  &&!(elem.menuBase*1)  :type="elem.icon" size="15"/> &&!(elem.menuBase*1)-->
                                <!--routerlink 能直接点开的二级菜单-->
                                <router-link v-if="!elem.children"
                                        tag="div"
                                        class="menu_ul_li"
                                        style="display: inline-block"
                                        :to={path:elem.url}
                                        :data-url="elem.url"
                                        @click.native="addPath(elem)"
                                >{{elem.title}}</router-link>
                                <!--<div v-else-if="!elem.children&&(elem.menuBase*1)"
                                        class="menu_ul_li"
                                        style="display: inline-block"
                                        :data-url="elem.url"
                                        @click="addPath(elem,true)"
                                >{{elem.title}}</div>-->
                                <!--titleActive不能点开页面，是有子菜单的二级菜单标题 子菜单为三级菜单-->
                                <div class="menu_ul_li titleActive" style="display: inline-block" v-if="elem.children">
                                    <span>{{elem.title}}</span>
                                    <Icon type="ios-arrow-back" v-if="elem.children" class="little_ul_Icon"/>
                                </div>
                                <!--三级菜单 最深处为三-->
                                <div class="menu_little_ul" v-if="elem.children">
                                    <ul>
                                        <li>
                                            <router-link
                                                    tag="div"
                                                    class="menu_little_li"
                                                    :to="eleme.url"
                                                    v-for="(eleme) in elem.children"
                                                    :key="eleme.id"
                                                    :data-url="eleme.url"
                                                    @click.native="addPath(eleme)"
                                            >{{eleme.title}}</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--图标二级菜单-->
            <div class="Telescopic_menu" v-show="!flag">
                <div class="Telescopic_menu_div" v-for="(ele) in tableObj" :key="ele.id">
                    <div class="Telescopic_menu_title">

                        <router-link
                                tag="div"
                                class="menu_ul_li"
                                style="display: inline-block"
                                :to={path:ele.url}
                                :data-url="ele.url"
                                @click.native="addPath(ele)"
                                :title="ele.title"

                        >
                            <!--当有图表的时候使用图标-->
                            <Icon v-if="ele.icon" :type=ele.icon size="20" style="color: white" />
                            <!--当没有图标使用默认图标-->
                            <Icon v-else type='md-play' size="20" style="color: white"/>
                        </router-link>
                        <div class="Telescopic_menu_ul" v-if="ele.children">
                            <ul>
                                <li v-for="(elem) in ele.children" :key="elem.id" class="Telescopic_menu_ul_li_hover">
                                    <router-link @click.native="addPath(elem)" tag="div" class="Telescopic_menu_ul_li" :to="elem.url" v-if="!elem.children">{{elem.title}}</router-link>
                                    <div class="Telescopic_menu_ul_li Telescopic_active" v-if="elem.children">
                                        <span >{{elem.title}}</span>
                                        <Icon type="ios-arrow-forward" class="Telescopic_menu_ul_li_childIcon" />
                                        <div class="Telescopic_menu_little_ul" style="display: none">
                                            <div class="Telescopic_menu_little_li"   v-for="(eleme) in elem.children" :key="eleme.id" >
                                                <router-link tag="div" @click.native="addPath(eleme)" :to="eleme.url">
                                                    {{eleme.title}}
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!--主菜单-->
            <div class="mainMenu" v-show="flag">
                <Button size="small" type="primary" shape="circle" @click="mainMenuChangeFun(0)">售前</Button>
                <Button size="small" type="primary" shape="circle" @click="mainMenuChangeFun(1)">售中</Button>
                <Button size="small" type="primary" shape="circle" @click="mainMenuChangeFun(2)">售后</Button>
                <Button size="small" type="primary" shape="circle" @click="mainMenuChangeFun(3)">财务</Button>
                <Button size="small" type="primary" shape="circle" @click="mainMenuChangeFun(4)">设置</Button>
            </div>
        </div>
        <!--主体内容包裹层-->
        <div id="b">
            <div id="tabPageDom">
                <!--伸缩按钮-->
                <div id="extendButton" @click="stretch">
                    <Icon class="extendButtonIcon" type="md-arrow-dropleft" v-show="flag" style="margin-right: -7px"/>
                    <Icon class="extendButtonIcon" type="md-menu"/>
                    <Icon class="extendButtonIcon" type="md-arrow-dropright" v-show="!flag" style="margin-left: -7px"/>
                </div>
                <div class="leftBtn">
                    <span>
                        <Icon type="md-arrow-dropleft" size="30"/>
                    </span>
                </div>
                <!--导航栏-->
                <div id="tabPage">
                    <div id="alonePage" ref="alonePage">
                        <div class="navigation_menu"
                             v-for="(ele,index) in navigationObj"
                             :data-url="ele.menuBase?ele.menuName:ele.url"
                             :key="ele.menuBase?ele.menuName:ele.url"
                             @click="positionFun(ele)"
                        >
                            <router-link tag="div" :to={path:ele.url} class="navDiv">
                                <span class="navSpan"></span>
                                {{ele.title}}
                            </router-link>
                            <div @click.stop="deleteMenuFun(ele,index)"  class="deletIcon">
                                <Icon class="nav ios-close" type="ios-close"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="upDataBtn">
                    <span @click="routerUpDataFun">
                        <Icon type="ios-refresh-circle-outline" size="22"/>
                    </span>
                </div>
                <div class="rightBtn">
                    <span>
                        <Icon type="md-arrow-dropright" size="30"/>
                    </span>
                </div>
            </div>
            <div id="content">
                <keep-alive :include="keepNavigationObj">
                    <!--<keep-alive include="order">-->
                    <router-view :upkey="upkey"></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                modal10:false,
                //二级菜单数据载体
                tableObj:[],
                //导航栏
                navigationObj:[
                    {url:'/HeadTemplate',title:'首页',menuBase: 0,
                        menuName: ""},
                ],
                // keepNavigationObj:[],
                flag:true,
                //组件刷新钥匙
                upkey:undefined,
            }
        },
        computed: {
            //获取当前登陆人
            user:{
                get(){
                    return this.$store.state.user;
                },
                set(data){
                    this.$store.state.user = data;
                }
            },
//缓存导航栏数组
            keepNavigationObj:{
                get() {
                    return this.$store.state.keepNavigationObjStore;
                }
            }
        },
        methods: {
            //退出当前账号方法
            refundAccount () {
                if(window.confirm('是否退出当前账号')){
                    window.sessionStorage.removeItem('token');
                    window.sessionStorage.setItem('RouteFlag','0');
                    this.$router.push('/sign');
                }
            },
            //修改密码方法
            changePassword () {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('div',{},[
                            h('Input', {
                                props: {
                                    value: this.value,
                                    autofocus: true,
                                    placeholder: '原密码'
                                },
                                on: {
                                    input: (val) => {
                                        this.value = val;
                                    }
                                }
                            }),
                            h('Input', {
                                props: {
                                    value: this.value,
                                    autofocus: true,
                                    placeholder: '新密码'
                                },
                                style:{
                                    marginTop:'5px'
                                },
                                on: {
                                    input: (val) => {
                                        this.value = val;
                                    }
                                }
                            })
                        ])
                    }
                })
            },
            //点击二级菜单增加路由
            addPath(data){
                let url = data.url;
                if(data.menuBase){
                    this.$store.commit('modifytableNameMutation',data.menuName)
                }
                //所有单独项目
                let navigation_menu = document.getElementsByClassName('navigation_menu');
                //整体滚动栏
                let alonePage = document.getElementById('alonePage');
                //滚动栏可视栏
                let tabPage = document.getElementById('tabPage').offsetWidth;
                for(let a=0,leng=this.navigationObj.length;a<leng;a++){
                    if(leng===0){
                        return
                    }
                    //导航栏点击让当前被触发路由dom 尽可能处于导航栏中间或可视范围中
                    else if(this.navigationObj[a].url == url){
                        for(let a=0;a<navigation_menu.length;a++){
                            if(navigation_menu[a].dataset.url == url){

                                if(!alonePage.style.left){
                                    alonePage.style.left = 0+'px';
                                }
                                //该项目的左距
                                let leftSize = navigation_menu[a].offsetLeft + alonePage.offsetLeft;
                                //该项目的右距
                                let rightSize = leftSize + navigation_menu[a].offsetWidth;
                                //此处并不需要判断整体是否超距，直接判断项目超距类型即可
                                //项目左边超 右边不超
                                if( leftSize<0 && rightSize<0 ){
                                    alonePage.style.left = (alonePage.offsetLeft - leftSize +80) + 'px';
                                }
                                // 可视边界左边界中
                                else if(leftSize<0 && rightSize>0){
                                    alonePage.style.left = (alonePage.offsetLeft - leftSize +80) + 'px';
                                }
                                //居中 都没超
                                else if(leftSize>0 && rightSize>0 && rightSize<tabPage){
                                    // console.log('居中')
                                }
                                //可视边界右边界中
                                else if(leftSize<tabPage && rightSize>tabPage){
                                    if(a == (navigation_menu.length-1)){
                                        //当为最后一个选项卡时候，无需溢出过多
                                        alonePage.style.left = (alonePage.offsetLeft - (rightSize - tabPage) - 5) + 'px';
                                    }else{
                                        //当不为最后一个选项卡时候，溢出过多让操作人知道后面还有其他选项卡
                                        alonePage.style.left = (alonePage.offsetLeft - (rightSize - tabPage) - 80) + 'px';
                                    }
                                }
                                //右超
                                else{
                                    if(a == (navigation_menu.length-1)){
                                        //当为最后一个选项卡时候，无需溢出过多
                                        alonePage.style.left = (alonePage.offsetLeft - (rightSize - tabPage) - 5) + 'px';
                                    }else{
                                        //当不为最后一个选项卡时候，溢出过多让操作人知道后面还有其他选项卡
                                        alonePage.style.left = (alonePage.offsetLeft - (rightSize - tabPage) - 80) + 'px';
                                    }
                                }
                            }
                        }
                        return
                    }
                    else{
                        //当为导航栏最后一项的且导航栏没有该路由时候，除了调整位置，还需要在缓存导航栏中保存这条路由数据
                        if(a==leng-1){
                            this.navigationObj.push(data);
                            if(data.menuBase){
                                this.$store.commit('keepNavigationMutation',{
                                    url:'/AllBaseTable',
                                    flag:true,
                                });
                            }else{
                                this.$store.commit('keepNavigationMutation',{
                                    url:data.url,
                                    flag:true,
                                });
                            }
                            this.$nextTick(()=>{
                                let navigation_menu = document.getElementsByClassName('navigation_menu');
                                //整体滚动栏
                                let alonePage = document.getElementById('alonePage');
                                for(let a=0;a<navigation_menu.length;a++){
                                    if(navigation_menu[a].dataset.url == url||navigation_menu[a].dataset.url==data.menuName){
                                        if(!alonePage.style.left){
                                            alonePage.style.left = 0+'px';
                                        }
                                        let childAloneWidth =this.$refs.alonePage.getElementsByClassName('navigation_menu').length;
                                        let aa =this.$refs.alonePage.getElementsByClassName('navigation_menu');
                                        let width = 0;
                                        for(let a=0;a<childAloneWidth;a++){
                                            width += aa[a].offsetWidth+6;
                                        }
                                        this.$refs.alonePage.style.width = width + 'px';
                                        //该项目的左距
                                        let leftSize = navigation_menu[a].offsetLeft + alonePage.offsetLeft;
                                        //该项目的右距
                                        let rightSize = leftSize + navigation_menu[a].offsetWidth;
                                        //此处并不需要判断整体是否超距，直接判断项目超距类型即可
                                        //项目左边超 右边不超
                                        if( leftSize<0 && rightSize<0 ){
                                            alonePage.style.left = (alonePage.offsetLeft - leftSize +80) + 'px';
                                        }
                                        // 可视边界左边界中
                                        else if(leftSize<0 && rightSize>0){
                                            alonePage.style.left = (alonePage.offsetLeft - leftSize +80) + 'px';
                                        }
                                        //居中 都没超
                                        else if(leftSize>0 && rightSize>0 && rightSize<tabPage){
                                            // console.log('居中')
                                        }
                                        //可视边界右边界中
                                        else if(leftSize<tabPage && rightSize>tabPage){
                                            alonePage.style.left = (alonePage.offsetLeft - (rightSize - tabPage) - 5) + 'px';
                                        }
                                        //右超
                                        else{
                                            alonePage.style.left = (alonePage.offsetLeft - (rightSize - tabPage) - 5) + 'px';
                                        }
                                    }
                                }
                            })
                            return
                        }
                        //不是该对应路由继续循环
                        else{
                            continue;
                        }
                    }
                };
            },
            //导航栏删除路由
            deleteMenuFun(data,index){
                let url = data.url;
                let navigation = document.getElementsByClassName('navigation_menu');
                let indClass = undefined;
                let indDelet = undefined;
                for(let a=0;a<this.navigationObj.length;a++){
                    //获取当前激活页面
                    if(navigation[a].firstChild.classList.contains('router-link-exact-active')){
                        indClass = a;
                        if(indDelet||indDelet==0){
                            break
                        }
                    }
                    //获取被删除页面
                    if(this.navigationObj[a].url == url){
                        indDelet = a;
                        if(indClass||indClass==0){
                            break
                        }
                    }
                };
                //首页永不可删除;如果激活的页面同时也是删除页面，那么删除时候，激活删除页的前一个页面
                //如果删除的页面和当前激活页面不是同一个页面，则直接删除
                //此删除逻辑因dom重写，直接删除即可。无需再激活其他页面
                if(indDelet-1>=0){
                    //如果激活页也是删除页
                    if(indClass==indDelet){
                        //当前页是否是基础页
                        if(this.navigationObj[indDelet].menuBase){
                            // this.$store.commit('deletTableNameMutiation',this.navigationObj[indDelet].menuName);
                            this.$store.dispatch('deletTableNameAction',this.navigationObj[indDelet].menuName).then(res=>{
                                if(res){
                                    // this.$store.commit('modifytableNameMutation',undefined);
                                    this.$store.commit('deletTableNameMutiation',undefined);
                                }
                            });
                            //如果当前页是基础页 且是第一页，前面页不是其他页，而是首页的情况下
                            if(index==1){
                                this.$store.commit('modifytableNameMutation',undefined);
                            }
                        }
                        //前一页是否是基础页
                        if(this.navigationObj[indDelet-1].menuBase){
                            this.$store.commit('modifytableNameMutation',this.navigationObj[indDelet-1].menuName);
                        };
                        navigation[indDelet-1].firstChild.click();
                        this.navigationObj.splice([indDelet],1);
                    }
                    else{
                        //当前页是否是基础页
                        if(this.navigationObj[indDelet].menuBase){
                            this.$store.commit('deletTableNameMutiation',this.navigationObj[indDelet].menuName);
                        }
                        this.navigationObj.splice([indDelet],1);
                    }
                    if(data.menuBase){
                        this.$store.commit('keepNavigationMutation',{
                            url:data.menuName,
                            flag:false
                        })
                    }else{
                        this.$store.commit('keepNavigationMutation',{
                            url,
                            flag:false
                        })
                    }
                }
            },
            //重新定位导航项目位置
            positionFun(data){
                let url = data.url
                if(data.menuBase){
                    this.$store.commit('modifytableNameMutation',data.menuName)
                }
                // this.$router.push({url:url});
                //处于重新定位的选项卡总是在视界边界中，
                //整体滚动栏
                let alonePage = document.getElementById('alonePage');
                //滚动栏可视栏
                let tabPage = document.getElementById('tabPage').offsetWidth;
                //该项目的左距
                let leftSize = event.currentTarget.offsetLeft + alonePage.offsetLeft;
                //该项目的右距
                let rightSize = leftSize + event.currentTarget.offsetWidth;
                //该单独项目的在右视界中超出的距离
                let rightSizeOut = rightSize - tabPage;
                if(leftSize<0 && rightSize>0){
                    //除了最后一个和第一个选项卡，其他只要移动80px
                    //由于处于左视界边界中的只可能是第一个或其他，所以只判断是否是第一个
                    if(this.navigationObj[0].url == url){
                        alonePage.style.left = alonePage.offsetLeft - leftSize + 5 + 'px'
                    }else{
                        alonePage.style.left = alonePage.offsetLeft + event.currentTarget.offsetWidth + 'px'
                    }
                }else if(leftSize>0 && rightSize>tabPage){
                    //由于处于右视界边界中的只可能是最后一个或其他，所以只判断是否是最后一个
                    if(this.navigationObj[this.navigationObj.length-1].url == url){
                        alonePage.style.left = alonePage.offsetLeft - rightSizeOut - 5 + 'px'
                    }else{
                        alonePage.style.left = alonePage.offsetLeft - event.currentTarget.offsetWidth + 'px'
                    }
                }
            },
            //伸缩按钮相关样式变换函数
            stretch(){
                if(this.flag){
                    document.getElementById('a').style.width = '50px';
                    this.flag = false;
                }else{
                    document.getElementById('a').style.width = '201px';
                    this.flag = true;
                }
            },
            //导航栏点击刷新
            routerUpDataFun(){
                let b =  (new Date()).valueOf();
                this.upkey = b;
                let a = document.getElementsByClassName('ivu-icon ivu-icon-ios-refresh-circle-outline')[0];
                a.classList.add('rotate360deg_I');
                var rotateFun = setTimeout(function(){
                    a.classList.remove('rotate360deg_I');
                    window.clearTimeout(rotateFun);
                },1000);


                function IconRotate360degFun(){

                }
                /* a.style.transform = 'rotate(360deg)';
                 a.style.transition = 'all 1s';*/

            },
            //主菜单点击按钮
            mainMenuChangeFun(value){
                if(this.$store.state.mainMenuX*1 == value*1){
                    return
                }
                this.$store.commit('modifymainMenuXMutation',value);
                let data = JSON.parse(JSON.stringify(this.$store.state.allSecondaryMenuObj[value]));
                this.addMenuFun(data.children);
                this.tableObj = data.children;
                this.$nextTick(()=>{
                    this.secondaryParseFun();
                })
            },
            //解析路由表数据  用来解析生成二级菜单需要的二级目录结构.
            addMenuFun(data){
                if(data instanceof Array){
                    let dataleng = data.length;
                    for (let i = 0; i < dataleng; i++) {
                        if(data[i].menuBase){
                            data[i].url = '/'+data[i].menuName
                        }else{
                            let lastInde = data[i].url.lastIndexOf('/');
                            let pathlastIndex = data[i].url.lastIndexOf('.');
                            data[i].url = data[i].url.slice(lastInde,pathlastIndex);
                        }
                        if(data[i].children){
                            this.addMenuFun(data[i].children);
                        }
                    }
                }else{
                    this.$Message.info({
                        content:'没有获取到菜单信息',
                        duration: 10,
                        closable:true
                    })
                }
            },
            //二级菜单伸缩与点击逻辑
            secondaryParseFun(){
                //普通二级菜单逻辑
                let title = document.getElementsByClassName('menu_title');
                let titleActive = document.getElementsByClassName('titleActive');
                //二级
                for(let a=0,leng=title.length;a<leng;a++){
                    title[a].addEventListener('click',function () {
                        //获取父节点
                        let thisparent = title[a].parentNode;
                        //通过父节点拿到ul 该ul包裹在一个menul_ul的div下面 且只有一个 所以取0号位
                        let menuul = thisparent.getElementsByClassName('menu_ul')[0];
                        let ul_menu = undefined;
                        if(menuul){
                            //获得一级子节点长度
                            ul_menu = menuul.getElementsByClassName('menu_ul_li').length;
                            //初始化菜单的style
                            if(!menuul.style.height){
                                menuul.style.height = 0+'px';
                            };
                            //获取所有的二级子节点
                            let other_little_li = thisparent.getElementsByClassName('menu_little_ul');
                            //当菜单展开时，点击菜单使其收缩或展开
                            //收缩该项目栏
                            let littleActive = document.getElementsByClassName('little_ul_Icon_active')[0];
                            if(menuul.style.height!='0px'){
                                menuul.style.height = 0+'px';
                                event.currentTarget.getElementsByClassName('menu_title_Icon')[0].classList.remove('menu_title_Icon_active');
                                //关闭其他未关闭三级菜单
                                //关闭三级下拉提示
                                if(littleActive){
                                    littleActive.classList.remove('little_ul_Icon_active');
                                }
                                for(let a=0,leng=other_little_li.length;a<leng;a++){
                                    other_little_li[a].style.height = 0+'px';
                                };
                            }else{
                                //打开项目栏
                                menuul.style.height = (ul_menu*32)+'px';
                                let threeLi = document.getElementsByClassName('activeLi')[0];
                                //关闭其他未关闭三级菜单
                                if(threeLi){
                                    threeLi.style.height = 0+'px'
                                }
                                //关闭其他一级下拉提示icon
                                let acti = document.getElementsByClassName('menu_title_Icon_active')[0];
                                if(acti){
                                    acti.classList.remove('menu_title_Icon_active')
                                }
                                //关闭三级下拉提示
                                if(littleActive){
                                    littleActive.classList.remove('little_ul_Icon_active');
                                }
                                //nextSibling ie全系不支持 请注意！！！(但本项目不考虑兼容IE，2019.11)
                                event.currentTarget.getElementsByClassName('menu_title_Icon')[0].classList.add('menu_title_Icon_active');
                                //同时收缩其他项目栏 另 并在此处收缩三级菜单
                                for(let a=0,leng=title.length;a<leng;a++){
                                    let titleOtherMenuUl = title[a].parentNode.getElementsByClassName('menu_ul')[0];
                                    if(event.target.parentNode!=title[a]){
                                        if(titleOtherMenuUl){
                                            titleOtherMenuUl.style.height = 0+'px';
                                        }
                                    }
                                }
                            }
                        }
                    })
                };
                //三级菜单   titleActive能打开的二级菜单 （最深处为三级菜单）
                for(let b=0,leng=titleActive.length;b<leng;b++){
                    titleActive[b].addEventListener('click',function () {
                        //获取父节点
                        let thatparent = titleActive[b].parentNode;
                        //获取最高ul父节点
                        let bigparent = thatparent.parentNode.parentNode;
                        //获取最高ul父节点所有的一级子
                        let ul_menu = bigparent.getElementsByClassName('menu_ul_li').length;
                        //通过父节点拿到ul
                        let little_ul = thatparent.getElementsByClassName('menu_little_ul')[0];
                        //通过父节点拿到其他ul 用于重置其他ul
                        let other_ul = thatparent.parentNode.parentNode.getElementsByClassName('menu_little_ul');
                        //获取子节点的长度
                        let little_li = little_ul.getElementsByClassName('menu_little_li').length;
                        //初始化高度
                        if(!little_ul.style.height){
                            little_ul.style.height = 0+'px';
                        }
                        if(little_ul.style.height!='0px'){
                            //三级收缩为0
                            little_ul.style.height = 0+'px';
                            little_ul.classList.remove('activeLi');
                            event.currentTarget.getElementsByClassName('little_ul_Icon')[0].classList.remove('little_ul_Icon_active');
                            //二级高度为打开长度
                            bigparent.style.height = (ul_menu*32)+'px';
                        }else if(little_ul.style.height=='0px'){
                            for(let b=0,leng=other_ul.length;b<leng;b++){
                                other_ul[b].style.height = 0+'px';
                            }
                            let littleActive = document.getElementsByClassName('little_ul_Icon_active')[0];
                            if(littleActive){
                                littleActive.classList.remove('little_ul_Icon_active');
                            }
                            //添加该类，纯粹未解决未关闭三级菜单问题
                            little_ul.classList.add('activeLi');
                            //little_ul_Icon
                            event.currentTarget.getElementsByClassName('little_ul_Icon')[0].classList.add('little_ul_Icon_active');
                            little_ul.style.height = (little_li*28)+'px';
                            bigparent.style.height = (ul_menu*32)+(little_li*28)+'px';
                        }
                    })
                };
                //图标二级菜单
                let TelescopicMenu = document.getElementsByClassName('Telescopic_menu_div');
                for(let a=0;a<TelescopicMenu.length;a++){
                    let childLi = TelescopicMenu[a].getElementsByClassName('Telescopic_menu_ul')[0];
                    //子存在 则绑定这两个函数 用于鼠标移入移出 菜单展示
                    if(childLi){
                        TelescopicMenu[a].addEventListener('mouseover',()=>{
                            childLi.style.display = 'block'
                        });
                        TelescopicMenu[a].addEventListener('mouseout',()=>{
                            childLi.style.display = 'none'
                        })
                    }

                }
                //图标三级菜单
                let TelescopicActive = document.getElementsByClassName('Telescopic_active');
                for(let b=0;b<TelescopicActive.length;b++){
                    let childLi = TelescopicActive[b].getElementsByClassName('Telescopic_menu_little_ul')[0];
                    //三级菜单拥有 才绑定
                    if(childLi){
                        TelescopicActive[b].addEventListener('mouseover',()=>{
                            childLi.style.display = 'block'
                            // console.log(window.getComputedStyle(childLi)[52])
                            // TelescopicMenu[a].getElementsByClassName('Telescopic_menu_ul')[0].style.display = 'block'
                        });
                        TelescopicActive[b].addEventListener('mouseout',()=>{
                            childLi.style.display = 'none'
                        })
                    }

                }

                //  圆盘菜单逻辑
                /*let circleMenu = document.getElementsByClassName('c');
                for(let c=0,leng=circleMenu.length;c<leng;c++){
                    circleMenu[c].addEventListener('click',()=>{
                        if(c==0||c==1){
                            this.tableObj = this.circleMenuObjA;
                        }else if(c==2||c==3){
                            this.tableObj = this.circleMenuObjB;
                        }else{
                            this.tableObj = this.circleMenuObjC;
                        }
                    })
                }*/

                // let deletIcon = document.getElementsByClassName('deletIcon');
                // for(let a=0;a<deletIcon.length;a++){
                //     deletIcon[a].addEventListener('mouseover',()=>{
                //         console.log(event.target.nodeName)
                //         console.log(event)
                //         event.target.type = "ios-close-circle-outline"
                //         // event.target.replaceChild('div',)
                //     })
                // }

                //此处使用两者查询类的方法，请注意，只是为了测试
                let tabPageLeft = document.querySelector("#tabPageDom>div:nth-child(2)");
                let tabPageRight= document.getElementsByClassName("rightBtn")[0];
                let alonePage = document.getElementById("alonePage");

                let tabPage = document.getElementById("tabPage");
                //滚动滑动导航栏
                alonePage.addEventListener('wheel',()=>{
                    if(event.wheelDelta*1>0){
                        leftMouveFun()
                    }else{
                        rightMoveFun()
                    }
                });
                //左按钮滚动导航栏
                tabPageLeft.addEventListener('click',()=>{
                    leftMouveFun()
                });
                //右按钮滚动导航栏
                tabPageRight.addEventListener('click',()=>{
                    rightMoveFun()
                });
                //滚动导航栏函数
                function leftMouveFun(){
                    if(alonePage.offsetWidth > tabPage.offsetWidth){
                        alonePage.style.left = (alonePage.offsetLeft - 200)+'px';

                        let z = document.getElementById('alonePage').offsetWidth;
                        let w = tabPage.offsetWidth;
                        let o = z - w;
                        let alonePageA = document.getElementById("alonePage");

                        let le = parseInt(alonePageA.style.left)*(-1);

                        if(le >= (o)){
                            alonePage.style.left = (o*(-1)) + 'px';
                        }
                    }else{
                        alonePage.style.left = 0 + 'px';
                    }

                };
                function rightMoveFun(){

                    if(alonePage.offsetLeft==0){

                    }else{
                        if(alonePage.offsetLeft<0){
                            alonePage.style.left = (alonePage.offsetLeft + 200)+'px';

                            let alonePageA = document.getElementById("alonePage");

                            let le = parseInt(alonePageA.style.left);
                            if(le>0){
                                alonePage.style.left = 0 + 'px'
                            }
                        }
                    }
                };
            }
        },
        created(){},
        beforeMount(){
            let ind = this.$store.state.mainMenuX;
            let data2 = JSON.parse(JSON.stringify(this.$store.state.allSecondaryMenuObj[ind]));
            this.addMenuFun(data2.children);

            this.tableObj = data2.children;

        },
        mounted() {
            this.secondaryParseFun();
            this.$axios({
                url:'common/member/userInfo',
                method:'get',
            }).then((res)=>{
                if(res.data.code === 0){
                    this.$store.commit('modifyuserInfoMutation',res.data.data);
                }else{
                    this.$Message.error({
                        content:res.data.msg,
                        closable:true,
                        duration:15,
                    })
                }
            }).catch(err=>{
                this.$Message.error({
                    content:err,
                    closable:true,
                    duration:15,
                })
            });
        },
    }
</script>
<!--整体布局样式-->
<style scoped type="text/css">
    #wrap{
        height: 100%;
        display: flex;
        /*overflow-x: hidden;*/
    }
    #a{
        width: 201px;
        height: 100%;
        /*background: linear-gradient(white 78%,#2b85e4 );*/
        transition:width 0.5s;
        transform-origin: top left;
        flex-shrink:0;
        display: flex;
        flex-direction:column;
        background-color:#001529;
    }
    #b{
        position: relative;
        /*max-height: 735px;*/
        flex-grow:1;
        /*background-color: gainsboro;*/
        flex-shrink:1;
        /*overflow-y: scroll;*/
        /*overflow-y: hidden;*/
        overflow: hidden;
        /*background-color: silver;*/
    }
</style>
<!--用户信息区域-->
<style scoped>
    .lander{
        padding-left: 10px;
        height: 110px;
        /*background: linear-gradient(to left top,white,#2b85e4);*/
        border-bottom: 1px black solid;
        color: #F0FAFF;
    }
</style>
<!--二级菜单-->
<style type="text/css" scoped>
    /*整个菜单的主体包裹层*/
    .menu{
        height: 550px;
        overflow-y: auto;
        overflow-x: hidden;
        font-size: 14px;
    }
    /*单独ul包裹层*/
    .menu_div{
        position: relative;
        padding: 8px 10px 8px 15px;
    }
    .menu_div:hover{
        /*background-color: #2F4050;*/
        color: white;
        /*background-color: #233646;*/
    }
    /*ul具体dom*/
    /*ul标题*/
    .menu_title{
        height: 30px;
        width: 175px;
        line-height:30px;
        cursor:pointer;
        text-align: left;
        /*background-color:rgb(81,81,81);*/
        color: rgb(199,199,199);
        display: flex;
        /*background-color: #cc0000;*/
    }
    .menu_title:hover{
        color: white;
    }
    .menu_title_Icon{
        margin-top: 8px;
        transform-origin: 50% 35%;
        transition: all 0.2s linear;
    }
    .menu_title_Icon_active{
        transform: rotate(-90deg);
    }
    /*ul下属菜单 二级菜单*/
    .menu_ul{
        position: relative;
        height: 0px;
        top: 8px;
        left: 28px;
        transition: height 0.3s;
        overflow: hidden;
    }
    .menu_ul_li_css{
        padding: 4px;
        /*width:auto;*/
    }
    .menu_ul_li{
        position: relative;
        /*left: 6px;*/
        height: 22px;
        width: 100%;
        margin: 0px 0px 2px 0px;
        border-radius: 2px;
        cursor:pointer;
        font-size: 12px;
        padding-left: 3px;
        text-align: left;
        line-height:22px;
        color: rgb(199,199,199);
        /*background-color: skyblue;*/
    }
    .menu_ul_li:hover{
        color: white;
    }
    .menu_ul_li_Icon{
        color: white;
    }
    /*用于下拉使用的icon*/
    .little_ul_Icon{
        transform-origin: 50% 35%;
        transition: all 0.2s linear;

        position: absolute;
        left: 128px;
        line-height: 22px;
    }
    .little_ul_Icon_active{
        transform: rotate(-90deg);
    }
    /*嵌套菜单 三级菜单*/
    .menu_little_ul{
        height: 0px;
        overflow: hidden;
        transition:height 0.3s;
        position: relative;
        left: 20px;
        top: 3px;
        /*background-color: #cc0000;*/
    }
    .menu_little_li{
        /*height: 22px;*/
        /*margin: 0px 0px 2px 0px;*/
        /*margin: 5px 0px 5px 2px;*/
        /*padding-left: 3px;*/
        color: rgb(199,199,199);
        cursor:pointer;
        font-size: 12px;
        text-align: left;
        padding: 5px 4px;
        /*line-height:22px;*/
    }
    .menu_little_li:hover{
        color: white;
    }
    .deletIconHover:hover{
        color: white;
    }
</style>
<!--图标二级菜单-->
<style scoped type="text/css">
    /*整体图标二级菜单*/
    .Telescopic_menu{
        height: 550px;
        padding-top: 4px;
        /*overflow-y: auto;*/
        /*overflow-x: hidden;*/
    }
    /*一级菜单 外层div*/
    .Telescopic_menu_div{
        position: relative;
        padding: 5px 10px;
        cursor:pointer;
    }
    .Telescopic_menu_title{
        /*width: 45px;*/
        /*height: 30px;*/
        /*background-image:url('../../public/img/icon/fly.png');*/
        /*margin: 1px 0px;*/
        /*border-bottom: 1px silver solid;*/

        /*transform: scale(0.9);*/
    }
    /*二级菜单的包裹div*/
    .Telescopic_menu_ul{
        position: absolute;
        min-width: 180px;
        padding: 4px 0px;
        /*left: 50px;*/
        left: 50px;
        height: auto;
        top:-5px;
        display: none;
        z-index: 3;
        background-color: tan;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
    }
    /*单个二级菜单*/
    .Telescopic_menu_ul_li_hover{
        position: relative;
    }
    .Telescopic_menu_ul_li_hover:hover{
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
    }
    .Telescopic_menu_ul_li{
        /*position: relative;*/
        /*left: 8px;*/
        display: inline-block;
        padding: 6px 6px;
        height: 22px;
        margin: 0px 0px 2px 0px;
        cursor:pointer;
        font-size: 12px;
        /*padding-left: 3px;*/
        text-align: left;
        line-height:22px;
        width: 100%;
        /*background-color: red;*/
    }
    .Telescopic_menu_ul_li_childIcon{
        float: right;
        line-height: 22px;
    }
    /*三级菜单的包裹div*/
    .Telescopic_menu_little_ul{
        position: absolute;
        top: -20px;
        left: 180px;
        padding: 5px;
        min-width: 200px;
        background-color: tan;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
    }
    /*单独的三级菜单li*/
    .Telescopic_menu_little_li{
        height: 22px;
        margin: 0px 0px 2px 0px;
        padding-left: 3px;

        cursor:pointer;
        /*font-size: 12px;*/
        text-align: left;
        line-height:22px;
    }
    .Telescopic_menu_little_li:hover{
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
    }
</style>
<!--圆盘形式main菜单-->
<style scoped>
    .circle_menu{
        position: absolute;
        bottom: -90px;
        left: -85px;
        width: 300px;
        height: 300px;
        /*background-color: #ffb08f;*/
        border-radius: 50%;
        /*margin: 50px;*/
        overflow: hidden;
        transform:scale(0.3)
    }
    .c{
        position: absolute;
        width: 160px;
        height: 160px;
        transform-origin: 100% 100%;
        /*border: 1px black solid;*/
    }
    .circle_menu>#e>.c:nth-of-type(1){
        transform: rotate(0deg)skew(18deg);
        background-color: silver;
        opacity: 0.7;
    }
    .circle_menu>#e>.c:nth-of-type(2){
        transform: rotate(72deg)skew(18deg);
        background-color: #abdcff;
        opacity: 0.7;
    }
    .circle_menu>#e>.c:nth-of-type(3){
        transform: rotate(144deg)skew(18deg);
        background-color: silver;
        opacity: 0.7;
    }
    .circle_menu>#e>.c:nth-of-type(4){
        transform: rotate(216deg)skew(18deg);
        background-color: #b7eb8f;
        opacity: 0.7;
    }
    .circle_menu>#e>.c:nth-of-type(5){
        transform: rotate(288deg)skew(18deg);
        background-color: #abdcff;
        opacity: 0.7;
    }
    #b>#e>.c:nth-of-type(5){
        transform: rotate(288deg)skew(18deg);
        background-color: #abdcff;
        opacity: 0.7;
    }
    #e{
        position: relative;
        left: -10px;
        top: -7px;
    }
    .circle_menu>#e>.c:hover{
        opacity: 1;
    }
</style>
<!--按钮形式main菜单-->
<style scoped>
    .mainMenu{
        flex-grow:1;
        height: 150px;
        /*border-right: 1px #e8e8e8 solid;*/
        border-top: 1px #e8e8e8 solid;
        /*background: linear-gradient(to left top,white,#2b85e4);*/
        /*display: flex;*/
        /*flex-wrap: wrap;*/
    }
    .mainMenu>*{
        margin: 5px;
    }
</style>
<!--b区域 导航栏-->
<style scoped>
    /*导航栏最外层结构*/
    #tabPageDom{
        height: 38px;
        width: 100%;
        border-bottom: 1px #EDEDED solid;
        overflow: hidden;
        /*overflow-x: hidden;*/
        display: flex;
    }
    /*导航按钮*/
    #extendButton{
        flex:0 0 40px;
        /*position: relative;*/
        /*width: 49px;*/
        /*height: 33px;*/
        /*line-height: 33px;*/
        /*display: inline-block;*/

        /*background-color: #FAFAFA;*/
        z-index: 10;
        background-color: white;
    }
    .extendButtonIcon{
        vertical-align: middle;
        font-size: 18px;
        margin-top: 10px;
    }
    .leftBtn{
        border-right: 1px #f0f0f0 solid;
        border-left: 1px #f0f0f0 solid;
        flex:0 0 20px;
        z-index: 1;
        cursor: pointer;
        background-color: white;
    }
    .leftBtn>span{
        vertical-align: middle;
        line-height: 49px;
        /*padding-top: 3px;*/
    }
    #tabPageDom>div:nth-child(2){}
    .upDataBtn{
        border-right: 1px #f0f0f0 solid;
        border-left: 1px #f0f0f0 solid;
        flex:0 0 20px;
        z-index: 1;
        cursor: pointer;
        background-color: white;
    }
    .upDataBtn>span{
        vertical-align: middle;
        line-height: 44px;
    }
    .rightBtn{
        border-right: 1px #f0f0f0 solid;
        border-left: 1px #f0f0f0 solid;
        flex:0 0 20px;
        z-index: 1;
        cursor: pointer;
        background-color: white;
    }
    .rightBtn>span{
        vertical-align: middle;
        line-height: 49px;
        /*padding-top: 3px;*/
    }
    #tabPageDom>div:nth-child(4){}

    #tabPage{
        flex:0 1 100%;
        height: 38px;
        background-color: #EDEDED;
        position: relative;
        overflow-x: hidden;
    }
    .alone_nav{
        width: 100%;
        height: 38px;
    }
    #alonePage{
        position: absolute;
        height: 32px;
        /*width: calc(100% - 150px);*/
        /*width: auto;*/
        white-space:nowrap;
        /*overflow: hidden;*/
        left: 0px;
        /*background-color: #EDEDED;*/
        transition: left 0.5s;
        /*background-color: orange;*/
    }
    #content{
        height: calc(100% - 40px);
        /*height: 800px;*/

        /*overflow-x: hidden;*/
        /*overflow-x: auto;*/
        /*overflow-y: auto;*/
        padding: 2px;
        font-family: 宋体;
        font-size: 12px;
        color: black;
    }
</style>
<!--导航栏内部滚动区域-->
<style scoped lang="stylus">
    /*导航栏内部单独子栏*/
    .navigation_menu{
        margin-top 3px;
        margin-left 5px;
        width auto;
        height 30px;

        float:left;
        /*text-align: center;*/
        /*line-height: 25px;*/
        /*padding: 0px 5px;*/
        display: flex;


        /*height: 32px;*/
        line-height: 30px;
        border: 1px solid #e8eaec;
        background: #fff;
        padding: 0 12px

        font-size 12px


    }
    .navSpan{
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 8px;
        border-radius: 50%;
        background: #e8eaec;
        position: relative;
        top: 1px;
    }
    .navigation_menu>div{
        /*margin-left: 8px;*/
    }
    .navigation_menu>div:hover{
        cursor:pointer;
        /*background-color: black;*/
        /*color: white;*/
        /*background-color: silver;*/
    }
    .navDiv{
        margin-right 12px
    }
    .nav.ios-close{
        font-size 22px
        vertical-align middle
        margin-top -3px
    }
    .router-link-active>.navSpan{
        background-color dodgerblue
    }
    .deletIcon{
        /*display: inline-block;*/
        /*width: 15px;*/
        /*height: 15px;*/
        /*!*vertical-align:middle;*!*/
        /*!*text-align: center;*!*/
        /*margin: 4px 0px 0px 8px;*/
        /*background-repeat: no-repeat;*/
        /*background-size:100% 100%;*/
        /*background-image: url('../../public/img/icon/select.png');*/
    }
    .deletIcon:hover{
        color: red;
    }
    /*.navigation>:last-child{
        color: red;
    }*/

    .router-link-active{

    }
    .router-link-exact-active{
        /*background-color: dodgerblue;*/
        /*color: dodgerblue;*/
    }
</style>
<!--滚动条-->
<style scoped type="text/css">

    ::-webkit-scrollbar{
        width: 6px;
        height: 8px;
    }
    ::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 1px;
        /*background-color: #DCDCDC;*/
        background-color: white;
        /*width: 1px;*/
    }
    ::-webkit-scrollbar-track-piece{
        /*background-color: red;*/
    }
    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        /*border: 1px silver solid;*/
        /*-webkit-box-shadow: inset 0 0 6px cornflowerblue;*/
        /*background-color: whitesmoke;*/
        /*background: linear-gradient(#2b85e4,white,#2b85e4);*/
        background: #2b85e4;
    }
    ::-webkit-resizer{
        /*background-color: red;*/
    }
    ::-webkit-scrollbar-corner{
        /*background-color: #2b85e4;*/
    }
</style>
<!--自适应-->
<style scoped>
    @media screen and (max-width:1200px) {

    }
    @media only screen and (max-width: 780px) {
        /*.menu{display: none;}*/
        /*.Telescopic_menu{display: block}*/
    }
    @media(min-height: 800px) {
        .menu{
            height: 600px;
            /*background-color: red;*/
            overflow-y: auto;
        }
        #content{
            /*height: 95%;*/
            overflow-y: auto;
        }
    }
    @media(max-height: 800px){
        #content{
            /*height: 95%;*/
            /*overflow-y: auto;*/
            overflow-y: auto;
            /*background-color: red;*/
        }
    }
</style>
<!--其他样式且全局适用-->
<style>
    .buttonA{
        padding: 1px 7px;
        margin: 1px 1px;
        background-image: linear-gradient(#Fdfdfd,#F0f0f0);
        border-width: 1px;
        border-top-color: #AAAAAA;
        /*border-bottom-color: #A0A0A0;*/
        border-left-color: #A8A8A8;
        /*border-right-color: #A8A8A8;*/
        border-style:outset;
        user-select:none
    }
    .buttonA:hover{
        border-top-color: #7f7f7f;
        border-left-color: #7c7c7c;
    }
    .buttonA:active{
        background-image: linear-gradient(#F0f0f0,#Fdfdfd);
        border-top-color: #A0A0A0;
        border-left-color: #a4a4a4;
    }
    .buttonA:focus{
        outline: none;
    }

    .button{
        margin: 1px;
    }
</style>
<!--刷新按钮-->
<style scoped>
    .rotate360deg_I{
        transform: rotate(360deg);
        transition: all 0.5s;
    }
</style>
<!--所有弹窗下属div 隔开样式-->
<style>
    .windowDivClass>div{
        margin: 3px 0px;
    }
</style>
<!--基础表格样式-->
<style lang="stylus">
    ul,li{
        padding:0;margin:0;list-style:none
    }
    .baseheaderClass{
        background-image: linear-gradient(white,#CBE3FB);
        width 100%
    }
    .baseHeadDiv{
        display flex
    }
    .baseTable{
        padding-top: 5px;
        position: relative;
    }
    .baseTablesDiv{
        overflow auto
    }
    .baseSearchClass{
        padding 10px
        display flex
        flex-wrap wrap
    }
    .baseSearchClass
        width 1000px
    .baseChangePageClass
        float right
        margin-top 20px
        margin-bottom 10px
</style>