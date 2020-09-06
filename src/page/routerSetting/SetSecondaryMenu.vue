<template>
    <div>
        <div id="SetSecondaryMenu">
            <div v-for="(ele,index) in menuObj" :key="ele.id">
                <div class="SetSecondaryMenuP">
                    <span>{{ele.title}}</span>
                    <Icon type="md-add-circle" size="30" class="secondaryIconClass" @click="getNodeDom(0,0,index)"/>
                </div>
                <div class="SetSecondaryMenuClass" @click="getNodes(index)">
                    <Tree :data="ele.children"
                          @on-select-change="getNodeDom"
                    ></Tree>
                </div>
            </div>
        </div>
        <Modal
                v-model="SetSecondaryWindow"
                draggable scrollable
                :title="SecondaryWindowTitle+'单独条目设置'"
                @on-ok="secondaryWindowChangeFun"
                @on-cancel="secondaryWindowCancelFun"
                ok-text="确定修改"
                cancel-text="取消"
                width="350"
        >
            <div class="windowDivClass">
                <!--菜单名称-->
                <div>
                    <i-Input v-model="SetSecondaryWindowObj.title">
                        <span slot="prepend">菜单名称</span>
                    </i-Input>
                </div>
                <!--地址-->
                <div>
                    <i-Input v-model="SetSecondaryWindowObj.url">
                        <span slot="prepend">地址</span>
                    </i-Input>
                </div>
                <!--父级菜单-->
                <div>
                    <span slot="prepend">父级菜单&#12288;&#12288;&#12288;&#12288;</span>
                    <Select v-model="SetSecondaryWindowObj.pid" placeholder="父级菜单" style="width:200px">
                        <Option
                                v-for="(ele,index) in SecondaryWindowChildren"
                                :key="index"
                                :value="ele.pid"
                        >{{ele.title}}</Option>
                    </Select>
                </div>
                <!--排序-->
                <div>
                    <i-Input v-model="SetSecondaryWindowObj.sort">
                        <span slot="prepend">排序</span>
                    </i-Input>
                </div>
                <!--是否启用-->
                <div>
                    <span slot="prepend">是否启用&#12288;&#12288;&#12288;&#12288;</span>
                    <Select v-model="SetSecondaryWindowObj.state" placeholder="状态" style="width:200px">
                        <Option :value=0>禁止</Option>
                        <Option :value=1>启用</Option>
                        <Option :value=2>删除</Option>
                    </Select>
                </div>
                <!--menuBase 的开关设置-->
                <div>
                    <span slot="prepend">menuBase开关&#12288;&#12288;&#12288;</span>
                    <RadioGroup v-model="SetSecondaryWindowObj.menuBase">
                        <Radio label="开启"></Radio>
                        &#12288;&#12288;
                        <Radio label="关闭"></Radio>
                    </RadioGroup>
                </div>
                <!--menuName 设置-->
                <div v-if="SetSecondaryWindowObj.menuBase=='开启'">
                    <i-Input v-model="SetSecondaryWindowObj.menuName">
                        <span slot="prepend">menuName</span>
                    </i-Input>
                </div>
                <!--图标名称-->
                <div>
                    <i-Input v-model="SetSecondaryWindowObj.icon">
                        <span slot="prepend">图标名称</span>
                        <!--<span icon="ios-search" slot="append" >图标链接</span>-->
                        <Button slot="append" icon="ios-search" @click="iconHref"></Button>
                    </i-Input>
                </div>
                <!--说明-->
                <div>
                    <i-Input v-model="SetSecondaryWindowObj.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="说明"></i-Input>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "SetSecondaryMenu",
        data () {
            return {
                //路由表二级菜单公用的对象，此对象用来生成 菜单树
                menuObj: [],
                //设置修改二级菜单弹窗的开关
                SetSecondaryWindow:false,
                //二级菜单弹窗数据对象
                SetSecondaryWindowObj:{},
                //二级菜单弹窗 标题
                SecondaryWindowTitle:undefined,
                //二级菜单内部 下拉框 父级菜单的数据集合
                SecondaryWindowChildren:[],
                //是否触发刷新的开关
                selfUpDataFlag:false,
            }
        },
        props:['upkey',],
        watch:{
            upkey(){
                if(this.selfUpDataFlag){
                    this.getRouterMenu();
                }
            },
        },
        computed:{},
        methods:{
            //获取路由表信息
            getRouterMenu(){
                this.$axios({
                    url:'common/member/menu',
                    method:'get',
                    params:{}
                }).then(res=>{
                    this.menuObj =res.data.data;
                }).catch(err=>{
                    console.log(err)
                });
            },
            //获取二级菜单当前点击对象函数
            getNodeDom(data,event,index){
                //data event 是 iview tree on-select-change函数触发的默认值
                //如果event存在，则是二级菜单中子菜单修改。不存在则是主题加号图标按钮新增，同时触发getNodes
                if(event){
                    this.SetSecondaryWindow = true;
                    if(event.menuBase){
                        event.menuBase = '开启'
                    }else{
                        event.menuBase = '关闭'
                    }
                    this.SetSecondaryWindowObj = event;
                }else{
                    let childrenArr = this.menuObj[index].children;
                    //获取当前主菜单的children 的长度
                    let leng = this.menuObj[index].children.length;
                    //弹窗标题动态展示
                    this.SecondaryWindowTitle = this.menuObj[index].title;
                    //添加一个根菜单节点目录在下拉框数组中
                    this.SecondaryWindowChildren = [{title:this.menuObj[index].title,pid:this.menuObj[index].id}];

                    this.SetSecondaryWindowObj = {
                        //菜单标题名
                        title: '',
                        //菜单地址
                        url:'',
                        //菜单父级
                        pid:null,
                        //菜单层级
                        type:0,
                        //菜单图标
                        icon:'',
                        //菜单排序
                        sort:100,
                        //菜单说明
                        description:'',
                        //菜单是否使用状态
                        state:1,
                        //是否启用基础表格
                        menuBase: '关闭',
                        //基础表格的名字
                        menuName: "abd",
                    };
                    //循环添加父级菜单目录
                    this.selectSecondaryMenu(this.menuObj[index].children);
                    //开启弹窗
                    this.SetSecondaryWindow = true;
                }
            },
            //函数用来在二级子菜单被点击时，生成下拉菜单和标题等
            getNodes(index){
                //弹窗标题动态展示
                this.SecondaryWindowTitle = this.menuObj[index].title;
                //添加一个根菜单节点目录在下拉框数组中
                this.SecondaryWindowChildren = [{title:this.menuObj[index].title,pid:this.menuObj[index].id}];
                //循环添加父级菜单目录
                this.selectSecondaryMenu(this.menuObj[index].children)
            },
            //二级菜单弹窗 确定修改按钮函数
            secondaryWindowChangeFun(){
                let icon = this.SetSecondaryWindowObj.icon;
                if(icon.search('<Icon')!= -1){
                    let m1 = icon.split('"')[1];
                    this.$set(this.SetSecondaryWindowObj,'icon',m1)
                }
                if(this.SetSecondaryWindowObj.menuBase == '开启'){
                    this.SetSecondaryWindowObj.menuBase = 1
                }else{
                    this.SetSecondaryWindowObj.menuBase = 0
                }
                this.$axios({
                    url:'common/member/saveMenu',
                    method:'post',
                    data:this.SetSecondaryWindowObj
                }).then(res=>{
                    this.$Message.success({
                        content: res.data.msg,
                        duration: 10,
                        closable: true
                    })
                }).catch(err=>{this.$Message.error({
                    content: err,
                    duration: 10,
                    closable: true
                });})
            },
            //二级菜单弹窗 取消按钮函数
            secondaryWindowCancelFun(){
                this.SetSecondaryWindow = false;
            },
            iconHref(){
                window.open('https://www.iviewui.com/components/icon');
            },
            //循环添加每一个子菜单或孙菜单的title，用来在弹窗下拉框中业务员选择父级菜单目录
            selectSecondaryMenu(data){
                let leng = data.length;
                for (let i = 0; i < leng; i++) {
                    this.SecondaryWindowChildren.push(
                        {title:data[i].title,pid:data[i].id}
                    );
                    if(data[i].children){
                        this.selectSecondaryMenu.call(this,data[i].children)
                    }
                }
            },
        },
        created(){
            this.selfUpDataFlag = true;
            this.getRouterMenu();
            //导航缓存组件
            // this.$store.commit('keepNavigationMutation',{TemplateName:this.$options.name, flag:true})
        },
        activated(){
            console.log(456)
        },
        beforeDestroy(){
            console.log('beforeDestroy')
        }
    }
</script>

<style scoped>
    #SetSecondaryMenu{
        margin: 10px;
        display: flex;
        /*height: 800px;*/
        width: 800px;

    }
    #SetSecondaryMenu>*{
        margin: 5px;
        display: inline-block;
        /*height: auto;*/
    }
    .SetSecondaryMenuClass{
        display: inline-block;
        height: auto;
        width: 200px;
        padding: 5px;
        border: 1px #eee solid;
    }
    .SetSecondaryMenuP{
        font-size: 18px;
        font-weight: bold;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-top: 1px #eee solid;
        border-right: 1px #eee solid;
        border-left: 1px #eee solid;
    }
    /*弹窗样式*/
    .secondaryIconClass{
        margin-top: 10px;
        float: right;
        color: dodgerblue;
        background-color: white;
        cursor: pointer;
    }
    .secondaryIconClass2{
        margin-top: 1px;
        float: right;
        color: dodgerblue;
        background-color: white;
        cursor: pointer;
    }
</style>