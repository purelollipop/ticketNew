<template>
    <div sizingMethod="scale" class="main">
        <div class="cover">
            <div id="i1" ref="i1" style="width: 758px;height: 173px;overflow: hidden;position: absolute;top: 22%">
                <img src="../assets/img/bg6.png">
            </div>
        </div>
        <div class="singDiv">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="form">
                <h3 style="text-align: center">用户登录</h3>
                <FormItem prop="user" class="item">
                    <i-Input type="text" v-model="id" placeholder="账号">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </i-Input>
                </FormItem>
                <FormItem prop="password" class="item">
                    <i-Input type="password" v-model="password" placeholder="密码" @keyup.enter="signInFun">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </i-Input>
                </FormItem>
                <FormItem class="item">
                    <Button type="error" long @click.enter="signInFun">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    export default {
        name: "sign_in",
        data(){
            return{
                timer:"",
                value2: 0,
                id:'admin',
                password:'',
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            signInFun(){
                this.$axios({
                    url:'common/member/login',
                    method:'get',
                    params:{
                        // username:this.id,
                        username:'admin',
                        password:this.password,
                    }
                }).then((res)=>{
                    if(res.data.code === 0){
                        window.sessionStorage.setItem('token',res.data.data);
                        window.sessionStorage.setItem('RouteFlag','0');
                        this.$axios.defaults.headers.token = window.sessionStorage.getItem('token');

                        this.$store.commit('modifyuserMutation','bingo');
                        this.$store.commit('modifymainMenuXMutation',0);

                        this.$store.dispatch('addRouterMutation',true)

                        window.clearInterval(this.timer);
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
            //请求路由方法
            getRouterFun(){
                return new Promise((resolve,reject)=>{
                    this.$axios({
                        url:'common/member/menu',
                        method:'get',
                        params:{}
                    }).then(res=>{
                        if(!res.data.code){
                            resolve(res.data.data)
                        }else{
                            reject(res.data.msg)
                        }
                    })
                })
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            move(){
                let _this = this;
                let a=-758;
                _this.timer= setInterval(function () {
                  if(a>=document.body.clientWidth){
                      a=-758;
                  }
                  a+=1;
                  _this.$refs.i1.style.marginLeft=a+"px";
                },10);
            },
        },
        created(){
            console.log('sign')
        },
        mounted(){
            this.move();
        },
    }
</script>

<style scoped lang="stylus">
    .main{
        background-image url("../assets/img/bg-003.jpg");
        background-repeat no-repeat;
        background-size: cover;
        background-attachment: fixed;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .cover{
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
    }
.signClass
    width: 100%
    height: 100%
.title
    position: fixed;
    font-size 24px
    color dodgerblue
    left: 430px;
    top: 222px;
.singDiv
    position: fixed;
    width 300
    height 620
    right: 12.3%;
    top: 10%;
    display: flex;
    flex-direction: column;
    border-radius 5px;
    background-image url("../assets/img/logo.png")
    background-repeat no-repeat
    background-size:100% 100%;
    *
      margin-top 5px
      border none
    .form{
        width 300px;
        height 420px;
        padding-top 165px
    }
    .item{
        display block;
        width 80%;
        margin 10px auto;
        height 45px;
    }
</style>
