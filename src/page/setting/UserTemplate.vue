<template>
    <div>
        <i-button @click="addUserFun" size="small">新增</i-button>
        <Table :columns="userTablecolumns" :data="userTableArray"  border size="small"></Table>
        <Drawer v-model="userChangeDrawerFlag" title="页面权限编辑" width="300" :mask-closable="false">
            <div class="windowDivClass" v-if="userChangeDrawerFlag">
                <div>
                    <i-Input :value="userDrawerObj.oldData.username">
                        <span slot="prepend">用户名</span>
                    </i-Input>
                </div>
                <div>
                    <span slot="prepend">&#12288;&#12288;&#12288;&#12288;</span>
                    <Select :value="userDrawerObj.oldData.parseStatus" placeholder="状态" style="width:200px">
                        <Option :key="1" :value=1>启用</Option>
                        <Option :key="2" :value=0>禁用</Option>
                    </Select>
                </div>
                <div>
                    <i-Input :value="userDrawerObj.oldData.departmentName">
                        <span slot="prepend">部门</span>
                    </i-Input>
                </div>
                <div>
                    <i-Input :value="userDrawerObj.oldData.mobile">
                        <span slot="prepend">手机号</span>
                    </i-Input>
                </div>
                <div>
                    <i-Input :value="userDrawerObj.oldData.jobNum">
                        <span slot="prepend">工号</span>
                    </i-Input>
                </div>
                <div>
                    <span>角色</span>
                    <CheckboxGroup :value="userDrawerObj.userCheckedBoxGroup">
                        <Checkbox v-for="(ele,index) in userDrawerObj.userBoxGroup" :label="ele.name" :key="index" border></Checkbox>
                    </CheckboxGroup>
                </div>
                <i-button size="small" @click="saveUserFun">保存</i-button>
            </div>
        </Drawer>
    </div>
</template>

<script>
    export default {
        name: "UserTemplate",
        data () {
            return {
                //刷新页面开关
                selfUpDataFlag:true,
                //用户页面 table 数据结构和载体
                userTablecolumns: [
                    {
                        title: '用户名',
                        key: 'username'
                    },
                    {
                        title: '状态',
                        key: 'parseStatus',
                        render: (h, params) => {
                            if(params.row.parseStatus){
                                return h('span', '启用');
                            }else{
                                return h('span', '禁用');
                            }

                        }
                    },
                    {
                        title: '部门',
                        key: 'departmentName'
                    },
                    {
                        title: '手机号',
                        key: 'mobile'
                    },
                    {
                        title: '工号',
                        key: 'jobNum'
                    },
                    {
                        title: '角色',
                        key: 'roleString'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.changeUserFun(params.row)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteUserFun(params.row.id)
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    },
                ],
                userTableArray: [],
                //用户页面侧边窗开关
                userChangeDrawerFlag:false,
               //用户侧边窗对象载体
                userDrawerObj:{
                    //addflag 为true 则触发函数为新增，为false 则为修改
                    addFlag:true,
                    oldData:{},
                    userBoxGroup:[],
                    userCheckedBoxGroup:[],
                },
            }
        },
        props:['upkey',],
        watch:{
            upkey(){
                if(this.selfUpDataFlag){
                    this.userGetDataFun()
                }
            }
        },
        methods:{
            //获取用户表数据初始化方法
            userGetDataFun(){
                this.$axios({
                    url:'/authorization/user/userlist',
                    method:'get',
                }).then(res=>{
                    if(!res.data.code){
                        this.userTableArray = res.data.data;
                        let originData = res.data.data;
                        let leng = originData.length
                        for (let i = 0; i < leng; i++) {
                            //判断是否有所属部门
                            if(originData[i].bgGroup){
                                originData[i].departmentName = originData[i].bgGroup.groupName
                            }else{
                                originData[i].departmentName = '暂无部门'
                            };
                            // 判断是否有所属角色
                            if(originData[i].roles){
                                let leng = originData[i].roles.length;
                                let parseRoles = '';
                                for (let j = 0; j < leng; j++) {
                                    parseRoles += originData[i].roles[j].name+'  ';
                                }
                                originData[i].roleString = parseRoles
                            }else{
                                originData[i].roleString = '暂无角色'
                            };
                            if(originData[i].status){
                                originData[i].parseStatus = 1
                            }else{
                                originData[i].parseStatus = 0
                            }
                        }

                    }else{
                        this.$Message.error({
                            content:res.data.msg,
                            closable:true,
                            duration:10,
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //删除用户方法
            deleteUserFun(id){},
            //修改用户方法和保存用户的方法 两个在前端因为组件原因公用一个按钮和方法
            changeUserFun(data){
                this.$set(this.userDrawerObj,'oldData',{
                    username:'',
                    parseStatus:0,
                    departmentName:'',
                    mobile:'',
                    jobNum:'',
                });


                let parserArr = [];
                this.$set(this.userDrawerObj,'userCheckedBoxGroup',parserArr)
                //获取所有角色
                function roleListAjax() {
                    return this.$axios({
                        url:'/authorization/role/rolelist',
                        method:'get',
                    })
                }
                //获取当前角色拥有哪些角色
                function userRolesAjax() {
                    return this.$axios({
                        url:'/authorization/role/userroles',
                        method:'post',
                        data:{
                            userId:data.id
                        }
                    })
                }
                //合并请求
                this.$axios.all([userRolesAjax.apply(this),roleListAjax.apply(this)]).then(
                    this.$axios.spread((userRoles, roleList)=>{
                        if(!userRoles.data.code){
                            this.$set(this.userDrawerObj,'userBoxGroup',userRoles.data.data);
                            let leng = userRoles.data.data.length;
                            for (let i = 0; i < leng; i++) {
                                parserArr.push(userRoles.data.data[i].name)
                            }
                            this.$set(this.userDrawerObj,'userCheckedBoxGroup',parserArr)
                        }else{
                            this.$Message.error({
                                content:userRoles.data.msg,
                                closable:true,
                                duration:10,
                            })
                        }
                        if(!roleList.data.code){
                            parserArr = roleList.data.data;

                            this.$set(this.userDrawerObj,'userBoxGroup',roleList.data.data);
                        }else{
                            this.$Message.error({
                                content:roleList.data.msg,
                                closable:true,
                                duration:10,
                            })
                        }
                })).catch(err=>{
                    console.log(err)
                })

                /*function f() {
                    return new Promise((resolve,reject)=>{

                    })

                }
                f.call(this,456).then(res=>{
                    this.$axios({
                        url:'/authorization/role/rolelist',
                        method:'get',
                    }).then(res=>{
                        console.log(res)
                        /!*if(!res.data.code){
                            this.$set(this.userDrawerObj,'userBoxGroup',res.data.data);
                            let leng = res.data.data.length;
                            for (let i = 0; i < leng; i++) {
                                parserArr.push(res.data.data[i].name)
                            }
                            this.$set(this.userDrawerObj,'userCheckedBoxGroup',parserArr)

                        }else{
                            this.$Message.error({
                                content:res.data.msg,
                                closable:true,
                                duration:10,
                            })
                        }*!/
                    }).catch(err=>{
                        console.log(err)
                    });
                }).catch();*/
                //设置两个对照组，方便后面保存数据时候对照对象中哪个属性改变了，只把改变的属性提供给后台
                this.$set(this.userDrawerObj,'oldData',data);
                this.$set(this.userDrawerObj,'cloneOld',JSON.parse(JSON.stringify(data)));
                this.$set(this.userDrawerObj,'addFlag',false);

                this.userChangeDrawerFlag = !this.userChangeDrawerFlag;

            },
            //保存用户权限信息最新修改的数据
            saveUserFun(){
                if(this.userDrawerObj.addFlag){
                    let parseObj = this.userDrawerObj.oldData;
                    parseObj.role = this.userDrawerObj.userCheckedBoxGroup
                    this.$axios.post('/authorization/user/add',parseObj)
                }else{
                    let data = this.userDrawerObj.cloneOld;
                    let changeValueObj = {};
                    for (let i in data) {
                        if(data[i] != this.userDrawerObj.oldData[i]&&typeof this.userDrawerObj.oldData[i] != "object"){
                            changeValueObj[i] = this.userDrawerObj.oldData[i]
                        }
                    };
                    changeValueObj.id = this.userDrawerObj.oldData.id;

                    let length = this.userDrawerObj.userCheckedBoxGroup.length;
                    let leng = this.userDrawerObj.userBoxGroup.length;
                    let arr = [];
                    for (let i = 0; i < length; i++) {
                        for (let j = 0; j < leng; j++) {
                            if(this.userDrawerObj.userCheckedBoxGroup[i] == this.userDrawerObj.userBoxGroup[j].name){
                                arr.push(this.userDrawerObj.userBoxGroup[j].id)
                            }
                        }
                    }
                    changeValueObj.role = arr;
                    this.$axios({
                        url:'/authorization/user/update',
                        method:'post',
                        data:changeValueObj
                    }).then(res=>{

                    }).catch(err=>{
                        console.log(err)
                    })
                }
                /*console.log(this.userDrawerObj.oldData.id)
                console.log(changeValueObj)
                console.log(this.userDrawerObj.userCheckedBoxGroup)*/
            },
            //新增用户的开启弹窗方法
            addUserFun(){
                let parserArr = [];
                this.$set(this.userDrawerObj,'addFlag',true);
                this.$set(this.userDrawerObj,'oldData',{});
                this.$axios({
                    url:'/authorization/role/rolelist',
                    method:'get',
                }).then(res=>{
                    this.$set(this.userDrawerObj,'userBoxGroup',res.data.data);
                    let leng = res.data.data.length;
                    for (let i = 0; i < leng; i++) {
                        parserArr.push(userRoles.data.data[i].name)
                    }
                    this.$set(this.userDrawerObj,'userCheckedBoxGroup',parserArr)
                }).catch(err=>{
                    console.log(err)
                })
                this.userChangeDrawerFlag = !this.userChangeDrawerFlag;

            }
        },
        created(){
            this.userGetDataFun()
        },
        activated(){
            this.selfUpDataFlag = true;

        },
        deactivated() {
            this.selfUpDataFlag = false;
        }
    }
</script>

<style scoped>

</style>