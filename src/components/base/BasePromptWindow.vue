<!--
    基础提示弹窗，并非是业务操作后的成功失败提示弹窗！！！
    该弹窗适用在提示业务员数据异常提醒
-->

<template>
    <div>
        <div id="messageShow">
            <div :class="orr.color" v-for="(orr,index) in obj" :key="index">
                <div :class="orr.icon"></div>
                <div><a @click.stop="togo(orr.hrefa,index)">{{orr.msg}}</a></div>
                <div @click.stop="closeMsg(orr.hrefa,index)"></div>
            </div>
        </div>
        <div class="messageTwo" @click.self="TwoFlagFun" v-if="TwoFlag">
            <div class="messageTwo_ear">
                <div>{{count}}</div>
            </div>
            <div class="messageTwo_window" v-show="TwoWindowFlag">
                <div class="messageTwo_childWin">
                    <ul style="padding-top: 10px;">
                        <li v-for="(ele,index) in mesArr" :key="ele" style="height:30px;">
                            <span>{{index+1}}</span>
                            <span>{{ele}}</span>
                            <button @click.stop="deletFun(index,ele)">删除</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "promptWindow",
        data(){
            return{
                obj:'',
                flag:true,
                count:0,        //数量
                mesArr:null,
                TwoWindowFlag:false,
                permission:1,   //默认为1，请求一次后根据实际权限判断是否进行下次请求
            }
        },
        /*render(h){

        },*/
        methods:{
            closeMsg:function(href,ind){
                this.obj.splice(ind,1)
            },
            togo:function(hrefa,ind){
                var adom = document.getElementsByTagName('a');
                let a  = Array.from(adom);
                for(let b=0;b<adom.length;b++){
                    if(a[b].href.search(/^http:\/\/120.78.91.205:8251\/bingo\//)!=-1){
                        var c = a[b].href.replace(/^http:\/\/120.78.91.205:8251\/bingo\//,'');
                    }else if(a[b].href.search(/^http:\/\/120.78.91.205:8251\/template\//)!=-1){
                        var c = a[b].href.replace(/^http:\/\/120.78.91.205:8251\/template\//,'../template/');
                    }
                    if(c == hrefa){
                        if(hrefa == '../template/lug.html'){
                        }else if(hrefa == 'anrace.php?t=qnracess'){
                            axios({
                                url:'../SMS/error_info.php?action=delerror',
                                method:'get'
                            }).then().catch((error)=>{
                                console.log(error)
                            })
                        }
                        this.obj.splice(ind,1);
                        a[b].click();
                        return
                    }
                }
            },
            TwoFlagFun:function () {
                if(!this.TwoWindowFlag){
                    axios({
                        url:'../SMS/error_info.php?action=noorder_refund',
                        method:'get'
                    }).then(res=>{
                        this.mesArr = res.data;
                        this.count = res.data.length;
                    }).catch(err=>{
                        console.log(err)
                    });
                }
                this.TwoWindowFlag = !this.TwoWindowFlag
            },
            deletFun:function (ind,ord) {
                this.mesArr.splice(ind,1);
                this.count = this.mesArr.length;
                axios({
                    url:'../SMS/error_info.php?action=del_unorder_refund',
                    method:'get',
                    params:{
                        platformOrder:ord
                    }
                }).then(res=>{

                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        mounted(){
        //    aixos websocke 调用获取提示数据
        }
    }
</script>

<style scoped>

</style>