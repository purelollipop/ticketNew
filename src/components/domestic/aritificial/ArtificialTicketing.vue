<template>
    <div style="margin-top: -6px">
        <div  style="padding:5px;">
            <div>
                <div v-if="searchFlag" class="ticketingChoose">
                    <!--航司-->
                    <i-input class="chooseChild" v-model="chooseObj.fly">
                        <span slot="prepend">航司</span>
                    </i-input>
                    <!--其他参数模糊查询-->
                    <i-input class="chooseChild" v-model="chooseObj.other">
                        <span slot="prepend">其他参数模糊查询</span>
                    </i-input>
                    <!--支付日期-->
                    <div style="margin-top: 14px;margin-left: 7px;">起飞日期:</div>
                    <div style="margin-top: 11px">
                        <Date-picker type="daterange"
                                     v-model="chooseObj.FlyTime"
                                     placement="bottom-end"
                                     placeholder="起飞日期"
                                     @on-change="flyTimeFun"
                                     style="width: 200px;display: block;">
                        </Date-picker>
                    </div>
                    <!--状态-->
                    <div style="color:black;margin-top: 14px;margin-left: 10px">状态:</div>
                    <div style="margin-top: 11px">
                        <select class="chooseChildA selectDom" v-model="chooseObj.status">
                            <option value="0">全部</option>
                            <option value="淘宝9C">淘宝9C</option>
                            <option value="去哪儿">去哪</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="ticketingChoose">
                <!--小PNR-->
                <i-input class="chooseChild" v-model="chooseObj.smartNumber">
                    <span slot="prepend">小PNR</span>
                </i-input>
                <!--票号模糊查询-->
                <i-input class="chooseChild" v-model="chooseObj.ticketNum">
                    <span slot="prepend">票号模糊查询</span>
                </i-input>
                <!--订票账号模糊查询-->
                <i-input class="chooseChild" v-model="chooseObj.account">
                    <span slot="prepend">订票账号模糊查询</span>
                </i-input>
                <!--平台选择-->
                <div style="color:black;margin-top: 15px">平台选择:</div>
                <div>
                    <div style="margin-top: 12px">
                        <select class="chooseChildA selectDom" v-model="chooseObj.ticketTable">
                            <option value="">全部</option>
                            <option value="淘宝9C">淘宝9C</option>
                            <option value="去哪儿">去哪</option>
                        </select>
                    </div>
                </div>
                <!--确认筛选条件-->
                <div style="width: 60px;margin-top: 12px;margin-left: 20px">
                    <div class="buttThree" @click="chooseFun">确认筛选</div>
                </div>
            </div>
            <table class="ariticialTalbe" style="font-size: 12px;width: 100%;">
                <colgroup>
                    <col style="width:7%"><!--操作-->
                    <col style="width:4%"><!--平台-->
                    <col style="width:5%"><!--平台-->
                    <col style="width:auto"><!--订票账号-->
                    <col style="width:200px"><!--航班信息-->
                    <col style="width:4%"> <!--小编码-->
                    <col style="width:auto"><!--订单号-->
                    <col style="width:7%"><!--余位-->
                    <col style="width:8%"><!--进单时长-->
                    <col style="width:5%"><!--收付款	-->
                    <col style="width:6%"><!--状态-->
                    <col style="width:15%"><!--平台状态-->
                </colgroup>
                <thead >
                <tr style="text-align:center;height: 40px" class="headBorder">
                    <th style="padding: 1px">
                        <div>
                            <span>操作</span>
                        </div>
                    </th>
                    <th>
                        <div>
                            <span>平台</span>
                        </div>
                    </th>
                    <!--操作人-->
                    <th>操作人</th>
                    <th style="text-align:center">
                        <div class="search" @click="closeSearch">
                            <span>订票账号</span>
                        </div>

                    </th>
                    <th>航班信息</th>
                    <th>小编码</th>
                    <th style="padding: 1px">订单号</th>
                    <th>余位</th>
                    <th>进单时长(分钟)</th>
                    <th>收付款</th>
                    <th>状态</th>
                    <th>平台状态</th>
                </tr>
                </thead>
                <tbody class="ariticialTalbeChild ticketing" >
                <tr v-for="(ele) in ticketingObj" :key="ele.id" style="height: 60px" >
                    <!--处理按钮-->
                    <td>
                        <button class="butt"  @click="abnormalfun(ele.id)">人工处理</button>
                    </td>
                    <!--平台-->
                    <td>
                        <div>{{ele.ticketTable}}</div>
                    </td>
                    <!--操作人-->
                    <td>
                        <div>{{ele.drawer}}</div>
                    </td>
                    <!--订票账号-->
                    <td>
                        <div>{{ele.yb_num}}</div>
                    </td>
                    <!--航班信息-->
                    <td>
                        <div class="td_message">
                            <div>{{ele.flight}}</div>
                            <div>{{ele.start}}-{{ele.arr}}</div>
                            <div>{{ele.population}}</div>
                            <div>{{ele.flyTime | timeFilter}}</div>
                            <div>{{ele.position}}</div>
                        </div>
                    </td>
                    <!--小编码-->
                    <td>
                        <div>{{ele.smartNumber}}</div>
                    </td>
                    <!--订单号-->
                    <td>
                        <div>{{ele.platformOrder}}</div>
                    </td>
                    <!--余位-->
                    <td>
                        <div :class="ele.isRed?'red':''">{{ele.cabin_and_site}}</div>
                    </td>
                    <!--进单时长-->
                    <td>
                        <div>{{ele.Time_len}}</div>
                    </td>
                    <!--收付款-->
                    <td>
                        <div>{{ele.collection}}</div>
                        <div>{{ele.pay}}</div>
                    </td>
                    <!--状态-->
                    <td>
                        <div>{{ele.status | statusFilter}}</div>
                    </td>
                    <!--平台状态-->
                    <td>
                        <div>{{ele.platformStatus}}</div>
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
        name: "ticketing",
        data(){
            return{
                //搜索框中的显隐开关
                searchFlag:false,
                //搜索框搜索启动开关。当搜索确定按钮按下，该值为true，
                // 默认为false。作用于翻页的时候判断是否带条件翻页
                chooseFlag:false,
                //自动出票中数据承接主体
                ticketingObj:null,
                //    初始num总为1 用与翻页框中的页码数
                num:1,
                //    总页数
                pages:1,

                //    查找内容载体
                chooseObj:{
                    status:undefined,//状态
                    ticketTable:null,//平台
                    FlyTime:null,//起飞时间
                    smartyNumber:null,//小编
                    ticketNum:undefined,//票号
                    fly:null,//航司
                    other:undefined,//其它参数
                    account:undefined,//账号
                }
            }
        },
        filters:{
            statusFilter(data){
                data = data*1
                switch(data){
                    // case 0:return '预定异常';
                    // case 1:return '预定成功';
                    // case 2:return '支付异常';
                    // case 3:return '支付成功';
                    // case 4:return '自动出票';
                    // case 5:return '手工出票';
                    // case 6:return '回帖完成';
                    // case 7:return '回帖异常';
                    // case 0:return '预定成功';
                    case 1:return '预定成功等待支付';
                    // case 2:return '';
                    case 3:return '支付成功等待回帖';
                    case 4:return '自动出票';
                    case 5:return '手工出票';
                    case 6:return '回帖成功';
                    case 9:return '压位订单';
                }
            },
            timeFilter(data){
                if(data){
                    data01 = data.replace(/^[0-9]{1,2}/,'');
                    data02 = data01.replace(/:([0-9]{1,2})$/,'')
                    return data02
                }
            },
        },
        methods:{
            //搜索框内的日期改格式相关函数
            flyTimeFun(data){
                this.chooseObj.FlyTime = [data[0],data[1]]
            },
            //搜索框函数显示隐藏函数
            closeSearch(){
                this.searchFlag = !this.searchFlag;
            },
            //搜索确认按钮的函数
            chooseFun(){
                this.chooseFlag = true;
                this.$store.state.animaFlag = true;
                this.$axios({
                    method:'post',
                    url:'../bingo/processing_order.php?action=search',
                    data:this.chooseObj
                }).then( (res)=>{
                    this.ticketingObj = res.data.list;
                    this.pages = res.data.pages;
                    //初始化请求让条件筛选ajax函数开关为false。
                    // this.choose = false;
                    //关闭动画
                    // console.log(res.data)
                    // console.log(this.ticketingObj)
                    this.$store.state.animaFlag = false;
                }).catch( (error)=> {
                    console.log(error)
                });
            },
            //页面初始请求函数
            tiketing:function(page){
                //开启动画
                this.$store.state.animaFlag = true;
                //关闭搜索按钮触发的值。
                this.chooseFlag = false;
                // this.flag = true;
                // this.num = 1;  //从锁单页面跳转过来，将num,nnum重置，避免因为两个页面使用同一个参数导致错误
                // this.nnum = '';
                this.$axios({
                    method:'post',
                    url:'../bingo/processing_order.php?action=ProcessingOrder',
                    data:{
                        page
                    }
                }).then( (res)=>{
                    this.ticketingObj = res.data.list;
                    this.pages = res.data.pages;
                    //初始化请求让条件筛选ajax函数开关为false。
                    this.choose = false;
                    //关闭动画
                    this.$store.state.animaFlag = false;
                    this.dataChange(res.data.list)
                }).catch( (error)=> {
                    console.log(error)
                });
            },
            dataChange(data){
                let arr = [],arrb=[];
                for(let a=0,leng=data.length;a<leng;a++){
                    if(data[a].status == 0||data[a].status == 2||data[a].status == 5){
                        arr.push(data[a])

                    }
                    if(data[a].status == 4){
                        arrb.push(data[a])
                    }
                }
                console.log(arr)
                console.log(arrb)
            },
            //将单置为人工
            abnormalfun(id){
                // let id = ;
                this.$axios({
                    method:'post',
                    url:'../bingo/processing_order.php?action=manualHandle',
                    data:{
                        id
                    }
                }).then( (res)=>{
                    if(res.data.res==='转人工成功'){
                        this.$store.state.name = 'name2'
                    }else{
                        alert('转人工处理失败')
                    }
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
                //根据不同的值 来做ajax不同请求 当choose为true;则搜索是开启状态，否则是关闭状态
                //若搜索为真，则直接调用搜索函数，把之前保存的搜索条件传过去；请求搜索后的结果;
                //若搜索为假，则直接调用请求函数，直接拿值；
                if(this.chooseFlag){
                    // this.chooselock(this.chooseObj,true,page)
                }else{
                    this.tiketing(page);
                }

            },
        },
        created(){
            
            this.tiketing(1);
        }
    }
</script>

<style scoped>

</style>