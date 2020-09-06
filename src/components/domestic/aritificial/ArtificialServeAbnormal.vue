<template>
    <div>
        <div  style="padding:1px;margin-top: -2px">
            <table class=" server" style="font-size: 12px;width: 100%">
                <colgroup>
                    <col style="width:8%"><!--全选-->
                    <col style="width:auto"><!--平台-->
                    <col style="width:auto"><!--订单号-->
                    <col style="width:auto"><!--进单时长-->
                    <col style="width:auto"><!--平台状态-->
                    <col style="width:auto"><!--备注-->
                </colgroup>
                <thead >
                <tr style="text-align:center;height: 40px" class="headBorder">
                    <th style="padding: 1px">
                        <span>操作</span>
                    </th>
                    <th>
                        <div>
                            <span>平台</span>
                        </div>
                    </th>
                    <th style="text-align:center">订单号</th>
                    <th>进单时长</th>
                    <th>平台状态</th>
                    <th>亏损备注</th>
                </tr>
                </thead>
                <tbody class="ariticialTalbeChild ticketing" >
                <tr v-for="(ord) in serverObj" :key="ord.id" style="height: 60px">
                    <!--处理按钮-->
                    <td>
                        <button v-if="ord.dealpeople==this.person" class="butt"  @click="abnormalServerfun(ord.id)">处理</button>
                        <button v-else-if="ord.dealpeople=='客服异常'" class="butt"  @click="abnormalServerfun(ord.id)">客服异常</button>
                        <div v-else >{{ord.dealpeople}}</div>
                    </td>
                    <!--平台-->
                    <td>
                        <div>{{ord.ticketTable}}</div>
                    </td>
                    <!--订单号-->
                    <td>
                        <div>{{ord.platformOrder}}</div>
                    </td>
                    <!--进单时长-->
                    <td>
                        <div>{{ord.Time_len}}</div>
                    </td>
                    <!--平台状态-->
                    <td>
                        <div>{{ord.platformStatus }}</div>
                    </td>
                    <!--亏损备注-->
                    <td>
                        <div>{{ord.orderMarkes}}</div>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--分页逻辑-->
            <div style="float: right;margin-top: 20px">
                <button type="button"  class=""  @click="firstpage">第一页</button>
                <button type="button"  class=""  @click="uppage">前一页</button>
                共<span>{{pages}}</span>页&nbsp;&nbsp;
                第&nbsp;<input type="text" style="width:40px;height:22px;padding:5px;display: inline;font-size: .9em;" :value="num" ref="num">&nbsp;页&nbsp;&nbsp;
                <button  class=""  @click="gotopage">转到</button>
                <button  class=""  @click="downpage">后一页</button>
                <button  class=""  @click="llastpage">最后一页</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "serve_abnormal",
        data(){
            return{
                //自动出票中数据承接主体
                serverObj:null,
                //    初始num总为1 用与翻页框中的页码数
                num:1,
                //    总页数
                pages:1,
                //    当前客户端的用户人，用于判断处理按钮是否显隐
                person:undefined,
            }
        },
        methods:{
            //初始化函数拿取数据
            serverDateFun(page){
                this.$store.state.animaFlag = true;
                this.$axios({
                    method:'post',
                    url:'../bingo/abnormal_order.php?action=UnexpectOrder',
                    data:{
                        page
                    }
                }).then((res)=>{
                    this.serverObj = res.data.list;
                    this.pages = res.data.pages;
                    // this.person = res.data.preson;
                    this.person = res.data.UserInfo.name;
                    //初始化请求让条件筛选ajax函数开关为false。
                    // this.choose = false;
                    this.$store.state.animaFlag = false;
                }).catch( (error)=> {
                    console.log(error)
                });
            },
            //将单置为异常单,同时调取函数更改锁单人名字
            abnormalServerfun(orderid){
                this.$axios({
                    method:'post',
                    url:'../ticket/manual.php?action=process',
                    data:{
                        orderid
                    }
                }).then( (res)=>{
                    window.location.href='../template/artificialDeal.html?id='+orderid+'&server=true';
                }).catch( (error)=> {
                    console.log(error)
                });
            },
            //分页函数
            //向后转页面 —
            uppage:function(){
                if(this.num>1){
                    this.num -= 1;
                }else if(this.num<1){
                    alert('没有该页码')
                }else{
                    return
                }
                this.axfun(this.num);
            },
            //向前转页面 +
            downpage:function(){
                this.num = Number(this.num); //之前的显示数字其本质为字符串导致无法数字计算
                if(this.num<this.pages){
                    this.num = this.num + 1;
                }else{
                    return
                };
                this.axfun(this.num)
            },
            //直接去某页面
            gotopage:function () {
                let val = this.$refs.num.value;
                if(val > this.pages||val<1){
                    //页数框页码重置
                    this.$refs.num.value = this.num;
                    alert('没有该页码');
                }else{
                    this.num = Math.round(this.num);
                    this.num = val;
                    this.axfun(this.num)
                }
            },
            //直接去首页
            firstpage:function () {
                //如果num已经是第一页了，就不再请求了
                if(this.num == 1){
                    return
                }
                this.num = 1;
                this.axfun(this.num)
            },
            //直接去末尾页
            llastpage:function () {
                //如果已经等于最后已页，就不再请求
                if(this.num == this.pages){
                    return
                }
                this.num = this.pages;
                this.axfun(this.num)
            },
            //跳转后把页面值传入，用来获取要跳转页面的数据，此函数为上面所有跳转函数的通用操作
            axfun:function(page){
                this.serverDateFun(page)
            },
        },
        created(){
            this.serverDateFun(1)
        }
    }
</script>

<style scoped>

</style>