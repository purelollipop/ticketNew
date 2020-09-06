<template>
    <div>
        <Button size="small" @click="roleWindowFun(0)">新加</Button>
        <Modal
                v-model="roleModalFlag"
                draggable scrollable title="新增"
                width="300"
                @on-ok="roleWindowShureFun"
        >
            <div>
                <i-Input v-model="roleWindowObj.name">
                    <span slot="prepend">角色</span>
                </i-Input>
                <Input v-model="roleWindowObj.state" type="textarea" placeholder="备注" />
            </div>
        </Modal>
        <Drawer v-model="roleAdminDrawerFlag" title="页面权限编辑" width="300" :mask-closable="false">
            <Tree :data="roleAdminDrawerObj.admitTree" show-checkbox multiple
                  ref="roletree"
            ></Tree>
            <i-button size="small" @click="saveTreeFun">保存</i-button>
        </Drawer>
        <Table
                border size="small"
                :columns="roleColumns"
                :data="roleArray"
                ></Table>
    </div>
</template>

<script>
    export default {
        name: "RoleTemplate",
        data () {
            return {
                roleColumns: [
                    {
                        title: '角色',
                        key: 'name',
                        width:150,
                    },
                    {
                        title: '备注',
                        key: 'address',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
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
                                            this.roleWindowFun(1,params)
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
                                            this.roleDeleteFun(params.row.id)
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.roleAdminUpdataFun(params.row.id)
                                        }
                                    }
                                }, '权限编辑')
                            ]);
                        }
                    }
                ],
                roleArray: [],
                //角色弹窗对象载体
                roleWindowObj:{
                    funFlag:undefined,
                },
                //角色modal弹窗开关
                roleModalFlag:false,
                //角色权限弹窗开关
                roleAdminDrawerFlag:false,
                //角色权限数据载体
                roleAdminDrawerObj:{
                    //后台传来的所有树，包括有权限和没有权限的
                    admitTree: [],
                    roleId:undefined,
                },

            }
        },
        methods:{
            //角色页面获取数据初始方法
            roleGetdata(){
                this.$axios({
                    url:'/authorization/role/rolelist',
                    method:'get'
                }).then(res=>{
                    if(!res.data.code){
                        this.roleArray = res.data.data
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
            //角色页面新增方法 弹窗开启方法
            roleWindowFun(val,params){
                //val 为1 是修改按钮 为0 是 新增
                if(val){
                    this.roleWindowObj = params.row;
                    this.roleModalFlag = !this.roleModalFlag
                    this.$set(this.roleWindowObj,'funFlag',val);
                }else{
                    this.roleWindowObj = {
                        funFlag:0,
                    },
                    this.roleModalFlag = !this.roleModalFlag
                }

            },
            //角色删除
            roleDeleteFun(roleId){
                this.$axios({
                    url:'/authorization/role/delete',
                    method:'post',
                    data:{
                        roleId
                    }
                }).then(res=>{
                    if(!res.data.code){
                        this.$Message.success({
                            content:res.data.msg,
                            closable:true,
                            duration:10,
                        });
                        this.roleGetdata()
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
            //角色权限修改
            roleAdminUpdataFun(roleId){
                this.$set(this.roleAdminDrawerObj,'roleId',roleId)
                //开启权限修改侧边栏
                this.roleAdminDrawerFlag = true;
                //定义一个数据接收载体
                let allMenuArr = null;
                //请求后台数据
                this.$axios({
                    url:'/authorization/role/getperm',
                    method:'post',
                    data:{
                        roleId
                    }
                }).then(res=>{
                    if(!res.data.code){
                        allMenuArr = JSON.parse(JSON.stringify(res.data.data));
                        roleParseMenu(allMenuArr);
                        this.$set(this.roleAdminDrawerObj,'admitTree',allMenuArr);
                    }else{
                        this.$Message.error({
                            content:res.data.msg,
                            closable:true,
                            duration:10,
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                });
                //解析菜单 做成符合iview树结构需要的数据
                function roleParseMenu(data) {
                    let leng = data.length;
                    for (let i = 0; i < leng; i++) {
                        if(data[i].flag&&!data[i].children.length){
                            data[i].checked = true;
                        }
                        if(data[i].children.length){
                            roleParseMenu(data[i].children)
                        }
                    }
                }
            },
            //角色新增
            roleAddFun(){
                this.$axios({
                    url:'/authorization/role/add',
                    method:'post',
                    data:this.roleWindowObj
                }).then(res=>{
                    if(!res.data.code){
                        this.$Message.success({
                            content:res.data.msg,
                            closable:true,
                            duration:10,
                        });
                        this.roleGetdata()
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
            //角色更新修改
            roleUpdataFun(){
                this.$axios({
                    url:'/authorization/role/update',
                    method:'post',
                    data:this.roleWindowObj
                }).then(res=>{
                    if(!res.data.code){
                        this.$Message.success({
                            content:res.data.msg,
                            closable:true,
                            duration:10,
                        });
                        this.roleGetdata()
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
            //弹窗确定方法，并在此处调用角色新增或角色修改的方法
            roleWindowShureFun(){
                //为1 是修改按钮 为0 是 新增
                if(this.roleWindowObj.funFlag){
                    this.roleUpdataFun()
                }else{
                    this.roleAddFun()
                }
            },
            //保存被勾选的节点按钮
            saveTreeFun(){
                //获取勾选的节点 iview自带函数
                let checkTree = this.$refs.roletree.getCheckedAndIndeterminateNodes();
                let perms = [];
                function checkTreeFather(data) {
                    let leng = data.length;
                    for (let i = 0; i < leng; i++) {
                        perms.push(data[i].id)
                    };
                    return perms;
                };
                perms = checkTreeFather(checkTree);
                this.$axios({
                    url:'/authorization/role/editperm',
                    method:'post',
                    data:{
                        roleId:this.roleAdminDrawerObj.roleId,
                        perms
                    }
                }).then(res=>{
                    if(!res.data.code){
                        this.$Message.success({
                            content:res.data.msg,
                            closable:true,
                            duration:10,
                        });
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


            }
        },
        created() {
            this.roleGetdata()
        }
    }
</script>

<style scoped>

</style>